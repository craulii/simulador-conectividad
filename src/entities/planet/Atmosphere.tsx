import { AdditiveBlending } from "three";

import "@/materials/atmosphere/atmosphereMaterial";
import { ATMOSPHERE_RADIUS } from "@/utils/constants";

export function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[ATMOSPHERE_RADIUS, 64, 64]} />
      <atmosphereMaterial transparent depthWrite={false} blending={AdditiveBlending} />
    </mesh>
  );
}
