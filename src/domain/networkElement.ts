import type { GeoPosition } from "./geo";
import type { LayerId } from "./layer";

export type ElementStatus = "active" | "inactive" | "fault";

export interface AntennaData {
  heightMeters: number;
  powerDbm: number;
  frequencyMhz: number;
}

export interface SatelliteData {
  altitudeKm: number;
  inclinationDeg: number;
  planeRotationDeg: number;
  angularSpeedDegPerSec: number;
  phaseDeg: number;
}

export interface GroundStationData {
  heightMeters: number;
}

interface NetworkElementBase {
  id: string;
  name: string;
  status: ElementStatus;
  layerId: LayerId;
  position: GeoPosition;
}

// Discriminated union: a future element kind (wifiAp, cellTower, ...)
// is one more union member, existing renderers keep exhaustive
// switches on `kind` and the compiler flags anything left unhandled.
export type NetworkElement =
  | (NetworkElementBase & { kind: "antenna"; data: AntennaData })
  | (NetworkElementBase & { kind: "satellite"; data: SatelliteData })
  | (NetworkElementBase & { kind: "groundStation"; data: GroundStationData });

export type ElementKind = NetworkElement["kind"];
