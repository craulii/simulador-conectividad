import { useMemo } from "react";
import { useThree, type ThreeEvent } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";

import { geoToCartesian, surfaceNormalFromGeo } from "@/domain/geo";
import type { AntennaData, NetworkElement } from "@/domain/networkElement";
import { useNetworkStore } from "@/state/useNetworkStore";
import { useUiStore } from "@/state/useUiStore";
import { PLANET_RADIUS } from "@/utils/constants";

interface AntennaMeshProps {
  element: NetworkElement & { kind: "antenna"; data: AntennaData };
}

interface ControlsLike {
  enabled: boolean;
}

const UP = new Vector3(0, 1, 0);
const MAST_RADIUS = 0.007;
const RING_THICKNESS = 0.005;

// heightMeters is a real-world-flavored property for the inspector,
// not a literal scale: a physically accurate mast next to a planet a
// couple of units wide would be invisible, so it maps onto a small,
// clearly readable visual range instead.
function mastHeightFor(data: AntennaData): number {
  return 0.09 + (data.heightMeters / 200) * 0.06;
}

export function AntennaMesh({ element }: AntennaMeshProps) {
  const isSelected = useNetworkStore((state) => state.selectedId === element.id);
  const select = useNetworkStore((state) => state.select);
  const setDraggingElementId = useUiStore((state) => state.setDraggingElementId);
  // Non-reactive read: toggling `.enabled` is an imperative side effect
  // on a three.js instance, not a mutation of a React-owned hook value.
  const getThree = useThree((state) => state.get);

  const { position, quaternion } = useMemo(() => {
    return {
      position: geoToCartesian(element.position, PLANET_RADIUS),
      quaternion: new Quaternion().setFromUnitVectors(UP, surfaceNormalFromGeo(element.position)),
    };
  }, [element.position]);

  const mastHeight = mastHeightFor(element.data);
  const ringRadii = [mastHeight * 0.55, mastHeight * 0.4, mastHeight * 0.25];
  const ringGap = mastHeight * 0.16;

  const accentColor = isSelected ? "#eaf2ff" : "#67e8f9";
  const emissiveIntensity = isSelected ? 1.6 : 0.9;

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    select(element.id);
    setDraggingElementId(element.id);
    const controls = getThree().controls as ControlsLike | null;
    if (controls) controls.enabled = false;
  };

  const stopClickPropagation = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <group
      position={position}
      quaternion={quaternion}
      onPointerDown={handlePointerDown}
      onClick={stopClickPropagation}
    >
      <mesh position={[0, mastHeight / 2, 0]}>
        <cylinderGeometry args={[MAST_RADIUS, MAST_RADIUS * 1.4, mastHeight, 8]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {ringRadii.map((radius, index) => (
        <mesh
          key={radius}
          position={[0, mastHeight + ringGap * (index + 1), 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[radius, RING_THICKNESS, 8, 24]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
      ))}
    </group>
  );
}
