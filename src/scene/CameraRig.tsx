import { useRef } from "react";
import { CameraControls, CameraControlsImpl } from "@react-three/drei";

import { CAMERA_MAX_DISTANCE, CAMERA_MIN_DISTANCE } from "@/utils/constants";

const { ACTION } = CameraControlsImpl;

// Orbit and zoom only, the planet stays centered so it never gets lost
// off screen on a show-floor touch display.
export function CameraRig() {
  const controlsRef = useRef<CameraControlsImpl>(null);

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      minDistance={CAMERA_MIN_DISTANCE}
      maxDistance={CAMERA_MAX_DISTANCE}
      dollySpeed={0.6}
      azimuthRotateSpeed={0.6}
      polarRotateSpeed={0.6}
      mouseButtons={{
        left: ACTION.ROTATE,
        right: ACTION.NONE,
        middle: ACTION.NONE,
        wheel: ACTION.DOLLY,
      }}
      touches={{
        one: ACTION.TOUCH_ROTATE,
        two: ACTION.TOUCH_DOLLY_ROTATE,
        three: ACTION.NONE,
      }}
    />
  );
}
