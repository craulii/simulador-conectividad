import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Quaternion, Vector3 } from "three";

import { surfaceNormalFromGeo } from "@/domain/geo";
import type { AntennaData, NetworkElement } from "@/domain/networkElement";
import { computeCoverage } from "@/domain/propagation/coverageModel";
import "@/materials/coverage/coverageMaterial";
import type { CoverageMaterial } from "@/materials/coverage/coverageMaterial";
import { PLANET_RADIUS } from "@/utils/constants";

interface CoverageDomeProps {
  element: NetworkElement & { kind: "antenna"; data: AntennaData };
}

const UP = new Vector3(0, 1, 0);
const SURFACE_OFFSET = 0.003;
const CAP_SEGMENTS = 48;

export function CoverageDome({ element }: CoverageDomeProps) {
  const materialRef = useRef<InstanceType<typeof CoverageMaterial>>(null);

  const { quaternion, angularRadius } = useMemo(() => {
    const radiusSceneUnits = computeCoverage(element.data).radiusSceneUnits;
    return {
      quaternion: new Quaternion().setFromUnitVectors(UP, surfaceNormalFromGeo(element.position)),
      // Arc length over radius: how far the coverage radius reaches
      // around the sphere's curvature, in radians from the antenna.
      angularRadius: radiusSceneUnits / PLANET_RADIUS,
    };
  }, [element.position, element.data]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh quaternion={quaternion}>
      <sphereGeometry
        args={[PLANET_RADIUS + SURFACE_OFFSET, CAP_SEGMENTS, CAP_SEGMENTS, 0, Math.PI * 2, 0, angularRadius]}
      />
      <coverageMaterial
        ref={materialRef}
        uAngularRadius={angularRadius}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}
