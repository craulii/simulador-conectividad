import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";

import { CAMERA_MAX_DISTANCE, PLANET_RADIUS } from "@/utils/constants";

interface CanvasRootProps {
  children: ReactNode;
}

export function CanvasRoot({ children }: CanvasRootProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
        outputColorSpace: SRGBColorSpace,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: CAMERA_MAX_DISTANCE * 3,
        position: [0, PLANET_RADIUS * 1.4, PLANET_RADIUS * 4.5],
      }}
    >
      {children}
    </Canvas>
  );
}
