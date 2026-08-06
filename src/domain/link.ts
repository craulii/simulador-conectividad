// Closed union for the demo's known transmission mediums. A new medium
// (a real WiFi/4G/5G/LoRa simulation, submarine cables, ...) is one
// more case here plus one entry in the medium-to-visual config that
// consumes it, never a rendering rewrite.
export type LinkMedium = "mesh-radio" | "wifi" | "4g" | "5g" | "lora" | "fiber" | "submarine-cable";

export interface LinkMetrics {
  latencyMs?: number;
  packetLossPct?: number;
  bandwidthMbps?: number;
}

export interface Link {
  id: string;
  sourceId: string;
  targetId: string;
  medium: LinkMedium;
  active: boolean;
  // Unused today, reserved for a future latency/loss/bandwidth simulation.
  metrics?: LinkMetrics;
}
