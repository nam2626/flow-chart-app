import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ChartStateSnapshot,
  FlowNode,
  FlowchartState,
  PresentationSession,
  ShapeType
} from '@features/flowchart/models/flowchart-types';
import { FLOW_MESSAGES } from '@features/flowchart/models/ux-copy';
import { computeVerticalFlexLayout } from '@features/flowchart/services/arrow-geometry-service';
import { ContractMap } from '@features/flowchart/services/contract-map';
import { sanitizeShapeColors } from '@features/flowchart/services/color-validation-service';
import { hasAllNodeLabels, WIDTH_MAX, WIDTH_MIN } from '@features/flowchart/services/flowchart-validation';
import {
  measureLayoutApplyMs,
  PRESENTATION_ENTRY_P95_BUDGET_MS
} from '@features/flowchart/services/performance-budget-service';
import { deleteShapeStyle, getShapeStyle, saveShapeStyle } from '@features/flowchart/services/shape-style-storage-service';
import { openPresentationTab, renderPresentationTab } from '@features/flowchart/services/presentation-tab-service';
import { getNextProgressState, getPrevProgressState, getValidCurrentStep } from '@features/flowchart/services/progression-service';
import { nowIso, newId } from '@shared/utils/id-utils';

interface FlowchartStore extends FlowchartState {
  addNode: (shapeType: ShapeType) => void;
  updateStepOrder: (nodeId: string, stepOrder: number) => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
  updateNodeColors: (nodeId: string, fillColor: string, borderColor: string) => void;
  removeNode: (nodeId: string) => void;
  resetAll: () => void;
  setActiveNode: (nodeId: string | null) => void;
  setCanvasWidth: (width: number) => void;
  setProgressMessage: (message: string) => void;
  startPresentation: () => void;
  nextPresentationStep: () => void;
  prevPresentationStep: () => void;
  stopPresentation: () => void;
}

const DEFAULT_CANVAS_WIDTH = 320;

const initialDiagramId = newId();
let presentationWindowRef: Window | null = null;

function createInitialPresentation(): PresentationSession {
  return {
    isRunning: false,
    currentOrder: null,
    startedAt: null,
    endedAt: null,
    openedInNewTab: false,
    blockedReason: null
  };
}

const initialState: FlowchartState = {
  diagram: {
    diagramId: initialDiagramId,
    title: '기본 다이어그램',
    canvasWidthPx: DEFAULT_CANVAS_WIDTH,
    isTransparentBackground: true,
    activeNodeId: null,
    createdAt: nowIso(),
    updatedAt: nowIso()
  },
  nodes: [],
  progress: {
    diagramId: initialDiagramId,
    currentStepOrder: 1,
    isAtLastStep: false,
    message: FLOW_MESSAGES.idle
  },
  presentation: createInitialPresentation(),
  lastSnapshot: null,
  shortcut: {
    diagramId: initialDiagramId,
    nextStepKey: 'N',
    updatedAt: nowIso()
  }
};

function normalizeNodes(nodes: FlowNode[]): FlowNode[] {
  const sorted = [...nodes].sort((a, b) => a.stepOrder - b.stepOrder);
  return sorted.map((node, index) => ({ ...node, stepOrder: index + 1 }));
}

function createDefaultNodeGeometry(): Pick<FlowNode, 'x' | 'y' | 'width' | 'height'> {
  return {
    x: 40,
    y: 24,
    width: 240,
    height: 90
  };
}

function applyAutoVerticalLayout(nodes: FlowNode[], canvasWidthPx: number): FlowNode[] {
  const normalized = normalizeNodes(nodes);
  return computeVerticalFlexLayout(normalized, canvasWidthPx).nodes;
}

function clearActive(nodes: FlowNode[]): FlowNode[] {
  return nodes.map((node) => ({ ...node, isActive: false }));
}

function getActiveNodeIdByOrder(nodes: FlowNode[], order: number | null): string | null {
  if (order === null) {
    return null;
  }
  return nodes.find((node) => node.stepOrder === order)?.nodeId ?? null;
}

function createSnapshot(state: FlowchartState): ChartStateSnapshot {
  return {
    snapshotId: newId(),
    steps: state.nodes.map((node) => ({ ...node })),
    canvasSettings: {
      widthPx: state.diagram.canvasWidthPx,
      backgroundMode: 'transparent'
    },
    capturedAt: nowIso()
  };
}

function persistNodeStyle(node: FlowNode): void {
  saveShapeStyle({
    shapeId: node.nodeId,
    fillColor: node.fillColor ?? ContractMap.colors.defaultFill,
    borderColor: node.borderColor ?? ContractMap.colors.defaultBorder,
    shadowBlur: 16,
    shadowSpread: 4,
    shadowOpacity: 0.4,
    updatedAt: nowIso()
  });
}

export const useFlowchartStore = create<FlowchartStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      addNode: (shapeType) => {
        const state = get();
        const pos = createDefaultNodeGeometry();
        const nodeId = newId();
        const restored = getShapeStyle(nodeId);
        const next: FlowNode = {
          nodeId,
          diagramId: state.diagram.diagramId,
          shapeType,
          label: '',
          stepOrder: state.nodes.length + 1,
          x: pos.x,
          y: pos.y,
          width: pos.width,
          height: pos.height,
          isActive: false,
          fillColor: restored?.fillColor ?? ContractMap.colors.defaultFill,
          borderColor: restored?.borderColor ?? ContractMap.colors.defaultBorder
        };

        set((prev) => {
          let relaidOut = prev.nodes;
          measureLayoutApplyMs(() => {
            relaidOut = applyAutoVerticalLayout([...prev.nodes, next], prev.diagram.canvasWidthPx);
          });
          return {
            nodes: relaidOut,
            diagram: { ...prev.diagram, updatedAt: nowIso() }
          };
        });
      },
      updateStepOrder: (nodeId, stepOrder) => {
        set((state) => {
          let normalized = state.nodes;
          measureLayoutApplyMs(() => {
            const nextNodes = state.nodes.map((node) =>
              node.nodeId === nodeId ? { ...node, stepOrder: Math.max(1, Math.floor(stepOrder || 1)) } : node
            );
            normalized = applyAutoVerticalLayout(nextNodes, state.diagram.canvasWidthPx);
          });
          return {
            nodes: normalized,
            diagram: { ...state.diagram, updatedAt: nowIso() }
          };
        });
      },
      updateNodeLabel: (nodeId, label) => {
        set((state) => {
          let relaidOut = state.nodes;
          measureLayoutApplyMs(() => {
            const updated = state.nodes.map((node) => (node.nodeId === nodeId ? { ...node, label } : node));
            relaidOut = applyAutoVerticalLayout(updated, state.diagram.canvasWidthPx);
          });
          return {
            nodes: relaidOut,
            diagram: { ...state.diagram, updatedAt: nowIso() }
          };
        });
      },
      updateNodeColors: (nodeId, fillColor, borderColor) => {
        const nextColors = sanitizeShapeColors({ fillColor, borderColor });
        const target = get().nodes.find((node) => node.nodeId === nodeId);
        if (target) {
          persistNodeStyle({ ...target, ...nextColors });
        }
        set((state) => ({
          nodes: state.nodes.map((node) => (node.nodeId === nodeId ? { ...node, ...nextColors } : node)),
          diagram: { ...state.diagram, updatedAt: nowIso() }
        }));
      },
      removeNode: (nodeId) => {
        set((state) => {
          const filtered = state.nodes.filter((node) => node.nodeId !== nodeId);
          if (filtered.length === state.nodes.length) {
            return {
              progress: { ...state.progress, message: FLOW_MESSAGES.nothingToDelete }
            };
          }
          deleteShapeStyle(nodeId);

          let normalized = filtered;
          measureLayoutApplyMs(() => {
            normalized = applyAutoVerticalLayout(filtered, state.diagram.canvasWidthPx);
          });
          const nextCurrentOrder = state.presentation.isRunning
            ? getValidCurrentStep(
                normalized.map((node) => node.stepOrder),
                state.presentation.currentOrder
              )
            : null;
          const activeNodeId = state.presentation.isRunning
            ? getActiveNodeIdByOrder(normalized, nextCurrentOrder)
            : state.diagram.activeNodeId === nodeId
              ? null
              : state.diagram.activeNodeId;
          const withActive = normalized.map((node) => ({
            ...node,
            isActive: activeNodeId !== null && node.nodeId === activeNodeId
          }));

          return {
            nodes: withActive,
            diagram: {
              ...state.diagram,
              activeNodeId,
              updatedAt: nowIso()
            },
            presentation: state.presentation.isRunning
              ? { ...state.presentation, currentOrder: nextCurrentOrder }
              : state.presentation,
            progress: {
              ...state.progress,
              currentStepOrder: nextCurrentOrder ?? state.progress.currentStepOrder,
              isAtLastStep: nextCurrentOrder === null || withActive.length <= 1,
              message: FLOW_MESSAGES.idle
            }
          };
        });
      },
      resetAll: () => {
        set((state) => ({
          nodes: [],
          diagram: {
            ...state.diagram,
            canvasWidthPx: DEFAULT_CANVAS_WIDTH,
            activeNodeId: null,
            updatedAt: nowIso()
          },
          progress: {
            ...state.progress,
            currentStepOrder: 1,
            isAtLastStep: false,
            message: FLOW_MESSAGES.resetDone
          },
          presentation: createInitialPresentation(),
          lastSnapshot: null
        }));
      },
      setActiveNode: (nodeId) => {
        set((state) => ({
          diagram: {
            ...state.diagram,
            activeNodeId: nodeId,
            updatedAt: nowIso()
          },
          nodes: state.nodes.map((node) => ({ ...node, isActive: node.nodeId === nodeId }))
        }));
      },
      setCanvasWidth: (width) => {
        if (!Number.isFinite(width)) {
          return;
        }
        const normalized = Math.floor(width);
        if (normalized < WIDTH_MIN || normalized > WIDTH_MAX) {
          return;
        }
        set((state) => {
          let relaidOutNodes = state.nodes;
          measureLayoutApplyMs(() => {
            relaidOutNodes = applyAutoVerticalLayout(state.nodes, normalized);
          });
          return {
            nodes: relaidOutNodes,
            diagram: { ...state.diagram, canvasWidthPx: normalized, updatedAt: nowIso() }
          };
        });
      },
      setProgressMessage: (message) => {
        set((state) => ({
          progress: { ...state.progress, message }
        }));
      },
      startPresentation: () => {
        set((state) => {
          let rePos = state.nodes;
          const durationMs = measureLayoutApplyMs(() => {
            rePos = applyAutoVerticalLayout(state.nodes, state.diagram.canvasWidthPx);
          });
          if (rePos.length === 0 || !hasAllNodeLabels(rePos)) {
            return {
              progress: { ...state.progress, message: FLOW_MESSAGES.presentationUnavailable }
            };
          }
          const openResult = openPresentationTab();
          if (!openResult.ok || !openResult.tab) {
            return {
              progress: { ...state.progress, message: FLOW_MESSAGES.presentationTabBlocked },
              presentation: {
                ...createInitialPresentation(),
                blockedReason: ContractMap.presentation.newTabBlockedCode
              }
            };
          }
          presentationWindowRef = openResult.tab;

          const firstOrder = rePos[0].stepOrder;
          const activeNodeId = rePos[0].nodeId;
          const withActive = rePos.map((node) => ({ ...node, isActive: node.nodeId === activeNodeId }));
          renderPresentationTab(openResult.tab, withActive, firstOrder);
          if (durationMs > PRESENTATION_ENTRY_P95_BUDGET_MS) {
            console.warn(`레이아웃 재배치 지연 감지: ${Math.round(durationMs)}ms`);
          }

          return {
            nodes: withActive,
            diagram: { ...state.diagram, activeNodeId, updatedAt: nowIso() },
            presentation: {
              isRunning: true,
              currentOrder: firstOrder,
              startedAt: nowIso(),
              endedAt: null,
              openedInNewTab: false,
              blockedReason: null
            },
            lastSnapshot: createSnapshot(state),
            progress: {
              ...state.progress,
              currentStepOrder: firstOrder,
              isAtLastStep: withActive.length === 1,
              message: FLOW_MESSAGES.presentationStarted
            }
          };
        });
      },
      nextPresentationStep: () => {
        set((state) => {
          if (!state.presentation.isRunning) {
            return state;
          }

          const orders = state.nodes.map((node) => node.stepOrder);
          const current = state.presentation.currentOrder ?? state.progress.currentStepOrder;
          const next = getNextProgressState(orders, current);
          const activeNodeId = getActiveNodeIdByOrder(state.nodes, next.currentStepOrder);
          if (presentationWindowRef && !presentationWindowRef.closed) {
            renderPresentationTab(
              presentationWindowRef,
              state.nodes.map((node) => ({ ...node, isActive: node.nodeId === activeNodeId })),
              next.currentStepOrder
            );
          }

          return {
            nodes: state.nodes.map((node) => ({ ...node, isActive: node.nodeId === activeNodeId })),
            diagram: { ...state.diagram, activeNodeId, updatedAt: nowIso() },
            presentation: { ...state.presentation, currentOrder: next.currentStepOrder },
            progress: { ...state.progress, ...next }
          };
        });
      },
      prevPresentationStep: () => {
        set((state) => {
          if (!state.presentation.isRunning) {
            return state;
          }

          const orders = state.nodes.map((node) => node.stepOrder);
          const current = state.presentation.currentOrder ?? state.progress.currentStepOrder;
          const prev = getPrevProgressState(orders, current);
          const activeNodeId = getActiveNodeIdByOrder(state.nodes, prev.currentStepOrder);
          if (presentationWindowRef && !presentationWindowRef.closed) {
            renderPresentationTab(
              presentationWindowRef,
              state.nodes.map((node) => ({ ...node, isActive: node.nodeId === activeNodeId })),
              prev.currentStepOrder
            );
          }

          return {
            nodes: state.nodes.map((node) => ({ ...node, isActive: node.nodeId === activeNodeId })),
            diagram: { ...state.diagram, activeNodeId, updatedAt: nowIso() },
            presentation: { ...state.presentation, currentOrder: prev.currentStepOrder },
            progress: { ...state.progress, ...prev }
          };
        });
      },
      stopPresentation: () => {
        if (presentationWindowRef && presentationWindowRef !== window && !presentationWindowRef.closed) {
          presentationWindowRef.close();
        }
        presentationWindowRef = null;
        set((state) => ({
          nodes: clearActive(state.nodes),
          diagram: { ...state.diagram, activeNodeId: null, updatedAt: nowIso() },
          presentation: {
            ...state.presentation,
            isRunning: false,
            currentOrder: null,
            endedAt: nowIso(),
            openedInNewTab: false
          },
          progress: { ...state.progress, message: FLOW_MESSAGES.presentationStopped }
        }));
      }
    }),
    {
      name: 'flowchart-storage',
      version: 4,
      migrate: (persistedState) => {
        const state = persistedState as Partial<FlowchartState>;
        const safeDiagram = state.diagram ?? initialState.diagram;
        const safeNodes = Array.isArray(state.nodes) ? state.nodes : [];
        const width = Number.isFinite(safeDiagram.canvasWidthPx) ? safeDiagram.canvasWidthPx : DEFAULT_CANVAS_WIDTH;
        const clamped = Math.max(WIDTH_MIN, Math.min(WIDTH_MAX, Math.floor(width)));
        const normalizedNodes = normalizeNodes(safeNodes).map((node) => {
          const stored = getShapeStyle(node.nodeId);
          return {
            ...node,
            label: typeof node.label === 'string' ? node.label : '',
            ...sanitizeShapeColors({
              fillColor: stored?.fillColor ?? node.fillColor,
              borderColor: stored?.borderColor ?? node.borderColor
            }),
            isActive: Boolean(node.isActive)
          };
        });
        const autoLayoutNodes = applyAutoVerticalLayout(normalizedNodes, clamped);
        const safeShortcut = state.shortcut ?? initialState.shortcut;

        return {
          diagram: {
            ...initialState.diagram,
            ...safeDiagram,
            canvasWidthPx: clamped,
            isTransparentBackground: true
          },
          nodes: autoLayoutNodes,
          progress: {
            ...initialState.progress,
            ...(state.progress ?? {})
          },
          presentation: {
            ...createInitialPresentation(),
            ...(state.presentation ?? {})
          },
          lastSnapshot: state.lastSnapshot ?? null,
          shortcut: {
            ...initialState.shortcut,
            ...safeShortcut
          }
        };
      }
    }
  )
);

