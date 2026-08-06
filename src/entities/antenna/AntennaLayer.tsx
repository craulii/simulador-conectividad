import type { NetworkElement } from "@/domain/networkElement";
import { useLayerStore } from "@/state/useLayerStore";
import { useNetworkStore } from "@/state/useNetworkStore";

import { AntennaMesh } from "./AntennaMesh";

function isAntenna(
  element: NetworkElement,
): element is Extract<NetworkElement, { kind: "antenna" }> {
  return element.kind === "antenna";
}

export function AntennaLayer() {
  const elements = useNetworkStore((state) => state.elements);
  const visible = useLayerStore((state) => state.layers.antennas);

  if (!visible) return null;

  const antennas = Object.values(elements).filter(isAntenna);

  return (
    <>
      {antennas.map((antenna) => (
        <AntennaMesh key={antenna.id} element={antenna} />
      ))}
    </>
  );
}
