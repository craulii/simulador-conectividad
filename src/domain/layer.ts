export type LayerId = "antennas" | "satellites" | "coverage" | "connections" | "traffic" | "heatmap";

export interface LayerDefinition {
  id: LayerId;
  label: string;
  defaultVisible: boolean;
}

// Single source of truth for the layers panel and for conditionally
// rendering each entity layer. A future layer (obstacles, weather) is
// one more entry here, nothing else has to change.
export const LAYER_DEFINITIONS: LayerDefinition[] = [
  { id: "antennas", label: "Antenas", defaultVisible: true },
  { id: "satellites", label: "Satelites", defaultVisible: true },
  { id: "coverage", label: "Cobertura", defaultVisible: true },
  { id: "connections", label: "Conexiones", defaultVisible: true },
  { id: "traffic", label: "Trafico", defaultVisible: true },
  { id: "heatmap", label: "Mapa de calor", defaultVisible: false },
];
