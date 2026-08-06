import { useCallback, useEffect } from "react";
import { useThree, type ThreeEvent } from "@react-three/fiber";

import { cartesianToGeo } from "@/domain/geo";
import { createId } from "@/domain/ids";
import type { NetworkElement } from "@/domain/networkElement";
import { useNetworkStore } from "@/state/useNetworkStore";
import { useUiStore } from "@/state/useUiStore";
import { PLANET_RADIUS } from "@/utils/constants";

interface ControlsLike {
  enabled: boolean;
}

const DEFAULT_ANTENNA_DATA = { heightMeters: 30, powerDbm: 40, frequencyMhz: 1800 };

// Pointer handlers for the planet mesh: placing a new antenna in
// "place-antenna" mode, and dragging the currently selected antenna
// (tracked via useUiStore.draggingElementId, set by AntennaMesh) across
// the surface.
export function usePlanetInteraction() {
  const interactionMode = useUiStore((state) => state.interactionMode);
  const draggingElementId = useUiStore((state) => state.draggingElementId);
  const setDraggingElementId = useUiStore((state) => state.setDraggingElementId);
  const elements = useNetworkStore((state) => state.elements);
  const addElement = useNetworkStore((state) => state.addElement);
  const updateElement = useNetworkStore((state) => state.updateElement);
  const select = useNetworkStore((state) => state.select);
  // Read via the non-reactive `get()` escape hatch instead of the
  // subscribed `controls` value: this is an imperative toggle on a
  // three.js instance, not a React-owned value a hook returned.
  const getThree = useThree((state) => state.get);

  const stopDragging = useCallback(() => {
    setDraggingElementId(null);
    const controls = getThree().controls as ControlsLike | null;
    if (controls) controls.enabled = true;
  }, [getThree, setDraggingElementId]);

  // Safety net: if the pointer is released past the sphere's silhouette,
  // the planet mesh never receives the pointerup and dragging would
  // otherwise stay stuck with camera controls disabled.
  useEffect(() => {
    if (!draggingElementId) return undefined;
    window.addEventListener("pointerup", stopDragging);
    return () => window.removeEventListener("pointerup", stopDragging);
  }, [draggingElementId, stopDragging]);

  const onClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      if (interactionMode !== "place-antenna") return;
      event.stopPropagation();

      const antennaCount = Object.values(elements).filter(
        (element) => element.kind === "antenna",
      ).length;

      // event.point is in world space; the planet mesh rotates inside
      // PlanetSystem, so it has to be brought back into the planet's
      // own (rotating) local space before it means a fixed lat/lon.
      const localPoint = event.object.worldToLocal(event.point.clone());

      const antenna: NetworkElement = {
        id: createId("antenna"),
        kind: "antenna",
        name: `Antena ${antennaCount + 1}`,
        status: "active",
        layerId: "antennas",
        position: cartesianToGeo(localPoint, PLANET_RADIUS),
        data: { ...DEFAULT_ANTENNA_DATA },
      };

      addElement(antenna);
      select(antenna.id);
    },
    [interactionMode, elements, addElement, select],
  );

  const onPointerMove = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      if (!draggingElementId) return;
      event.stopPropagation();
      const localPoint = event.object.worldToLocal(event.point.clone());
      updateElement(draggingElementId, { position: cartesianToGeo(localPoint, PLANET_RADIUS) });
    },
    [draggingElementId, updateElement],
  );

  return { onClick, onPointerMove, onPointerUp: stopDragging, onPointerLeave: stopDragging };
}
