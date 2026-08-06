import { shaderMaterial } from "@react-three/drei";
import { extend, type ThreeElement } from "@react-three/fiber";
import { Color } from "three";

import fragmentShader from "./atmosphere.frag.glsl";
import vertexShader from "./atmosphere.vert.glsl";

export const AtmosphereMaterial = shaderMaterial(
  {
    uColor: new Color("#2563eb"),
    uPower: 2.2,
    uIntensity: 1.1,
  },
  vertexShader,
  fragmentShader,
);

extend({ AtmosphereMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    atmosphereMaterial: ThreeElement<typeof AtmosphereMaterial>;
  }
}
