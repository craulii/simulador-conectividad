import { Atmosphere } from "@/entities/planet/Atmosphere";
import { Planet } from "@/entities/planet/Planet";

import { CameraRig } from "./CameraRig";
import { SceneLighting } from "./SceneLighting";
import { Starfield } from "./Starfield";

export function SceneRoot() {
  return (
    <>
      <color attach="background" args={["#030509"]} />
      <CameraRig />
      <SceneLighting />
      <Starfield />
      <Planet />
      <Atmosphere />
    </>
  );
}
