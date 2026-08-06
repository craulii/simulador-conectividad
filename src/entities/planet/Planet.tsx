import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

import "@/materials/planet/planetSurfaceMaterial";
import type { PlanetSurfaceMaterial } from "@/materials/planet/planetSurfaceMaterial";
import { PLANET_RADIUS } from "@/utils/constants";

const IDLE_ROTATION_SPEED = 0.015;

export function Planet() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<InstanceType<typeof PlanetSurfaceMaterial>>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += IDLE_ROTATION_SPEED * delta;
    }
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[PLANET_RADIUS, 128, 128]} />
      <planetSurfaceMaterial ref={materialRef} />
    </mesh>
  );
}
