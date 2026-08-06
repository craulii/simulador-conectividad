import { useRef } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import type { Mesh } from "three";

import "@/materials/planet/planetSurfaceMaterial";
import type { PlanetSurfaceMaterial } from "@/materials/planet/planetSurfaceMaterial";
import { PLANET_RADIUS } from "@/utils/constants";

type PlanetProps = Pick<
  ThreeElements["mesh"],
  "onClick" | "onPointerMove" | "onPointerUp" | "onPointerLeave"
>;

// Rotation lives on the parent group in PlanetSystem, not here, so that
// surface-anchored entities (antennas, coverage, ...) rendered as
// siblings inside that same group stay visually pinned to the surface
// as it spins instead of drifting under it.
export function Planet(props: PlanetProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<InstanceType<typeof PlanetSurfaceMaterial>>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} {...props}>
      <sphereGeometry args={[PLANET_RADIUS, 128, 128]} />
      <planetSurfaceMaterial ref={materialRef} />
    </mesh>
  );
}
