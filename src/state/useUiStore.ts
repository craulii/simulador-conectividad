import { create } from "zustand";

export type InteractionMode = "idle" | "place-antenna" | "place-satellite";

interface UiState {
  interactionMode: InteractionMode;
  setInteractionMode: (mode: InteractionMode) => void;

  layersPanelOpen: boolean;
  toggleLayersPanel: () => void;

  draggingElementId: string | null;
  setDraggingElementId: (id: string | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  interactionMode: "idle",
  setInteractionMode: (mode) => set({ interactionMode: mode }),

  layersPanelOpen: false,
  toggleLayersPanel: () => set((state) => ({ layersPanelOpen: !state.layersPanelOpen })),

  draggingElementId: null,
  setDraggingElementId: (id) => set({ draggingElementId: id }),
}));
