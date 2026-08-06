import { shaderMaterial } from "@react-three/drei";
import { extend, type ThreeElement } from "@react-three/fiber";
import { Color } from "three";

import fragmentShader from "./planetSurface.frag.glsl";
import vertexShader from "./planetSurface.vert.glsl";

export const PlanetSurfaceMaterial = shaderMaterial(
  {
    uTime: 0,
    uBaseColor: new Color("#0a1428"),
    uLineColorA: new Color("#38bdf8"),
    uLineColorB: new Color("#67e8f9"),
    uAccentColor: new Color("#eaf2ff"),
    uHexScale: 14,
    uCircuitScale: 26,
  },
  vertexShader,
  fragmentShader,
);

extend({ PlanetSurfaceMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    planetSurfaceMaterial: ThreeElement<typeof PlanetSurfaceMaterial>;
  }
}
