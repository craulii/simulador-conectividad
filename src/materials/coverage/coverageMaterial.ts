import { shaderMaterial } from "@react-three/drei";
import { extend, type ThreeElement } from "@react-three/fiber";
import { Color } from "three";

import fragmentShader from "./coverage.frag.glsl";
import vertexShader from "./coverage.vert.glsl";

export const CoverageMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorCore: new Color("#eaf2ff"),
    uColorRim: new Color("#38bdf8"),
    uIntensity: 1,
    uAngularRadius: 0.1,
  },
  vertexShader,
  fragmentShader,
);

extend({ CoverageMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    coverageMaterial: ThreeElement<typeof CoverageMaterial>;
  }
}
