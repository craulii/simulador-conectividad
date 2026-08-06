import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

import { AntennaLayer } from "@/entities/antenna/AntennaLayer";
import { CoverageLayer } from "@/entities/coverage/CoverageLayer";
import { usePlanetInteraction } from "@/hooks/usePlanetInteraction";

import { Planet } from "./Planet";

const IDLE_ROTATION_SPEED = 0.015;

// The rotating parent for the planet and everything anchored to its
// surface, so antennas, coverage domes and (later) mesh links spin
// together with the hex grid instead of drifting relative to it.
export function PlanetSystem() {
  const groupRef = useRef<Group>(null);
  const planetHandlers = usePlanetInteraction();

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += IDLE_ROTATION_SPEED * delta;
    }
  });

  return (
    <group ref={groupRef}>
      <Planet {...planetHandlers} />
      <CoverageLayer />
      <AntennaLayer />
    </group>
  );
}
