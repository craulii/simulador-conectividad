import { create } from "zustand";

import { LAYER_DEFINITIONS, type LayerId } from "@/domain/layer";

type LayerVisibility = Record<LayerId, boolean>;

interface LayerState {
  layers: LayerVisibility;
  toggleLayer: (id: LayerId) => void;
  setLayer: (id: LayerId, visible: boolean) => void;
}

const initialLayers = Object.fromEntries(
  LAYER_DEFINITIONS.map((layer) => [layer.id, layer.defaultVisible]),
) as LayerVisibility;

export const useLayerStore = create<LayerState>((set) => ({
  layers: initialLayers,

  toggleLayer: (id) =>
    set((state) => ({ layers: { ...state.layers, [id]: !state.layers[id] } })),

  setLayer: (id, visible) => set((state) => ({ layers: { ...state.layers, [id]: visible } })),
}));
