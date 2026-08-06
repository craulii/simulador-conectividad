import type { NetworkElement } from "@/domain/networkElement";
import { useLayerStore } from "@/state/useLayerStore";
import { useNetworkStore } from "@/state/useNetworkStore";

import { CoverageDome } from "./CoverageDome";

function isAntenna(
  element: NetworkElement,
): element is Extract<NetworkElement, { kind: "antenna" }> {
  return element.kind === "antenna";
}

export function CoverageLayer() {
  const elements = useNetworkStore((state) => state.elements);
  const visible = useLayerStore((state) => state.layers.coverage);

  if (!visible) return null;

  const antennas = Object.values(elements).filter(isAntenna);

  return (
    <>
      {antennas.map((antenna) => (
        <CoverageDome key={antenna.id} element={antenna} />
      ))}
    </>
  );
}
