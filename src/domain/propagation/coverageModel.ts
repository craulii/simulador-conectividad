import type { AntennaData } from "@/domain/networkElement";
import { PLANET_RADIUS } from "@/utils/constants";

// Free Space Path Loss, the standard textbook model for signal loss
// over distance with no obstacles or terrain: FSPL(dB) = 20log10(d_km)
// + 20log10(f_MHz) + 32.44. Height does not factor into this
// simplified model (a two-ray or Okumura-Hata model would use it for
// horizon/ground-reflection effects); that is a documented upgrade
// path, not something this function needs today.
const RECEIVER_SENSITIVITY_DBM = -100;
const FSPL_CONSTANT_DB = 32.44;

// The scene is a stylized globe, not Earth at real scale, so the real
// (often very large) FSPL distance is mapped into scene units by a
// tuned constant rather than a literal km-to-planet-radius ratio, the
// same stylization used for antenna mast height.
const KM_TO_SCENE_UNITS = 0.0026;
const MIN_COVERAGE_RADIUS = 0.05;
const MAX_COVERAGE_RADIUS = PLANET_RADIUS * 0.9;

export interface CoverageResult {
  radiusKm: number;
  radiusSceneUnits: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function computeCoverage(data: AntennaData): CoverageResult {
  const maxPathLossDb = data.powerDbm - RECEIVER_SENSITIVITY_DBM;
  const frequencyTermDb = 20 * Math.log10(data.frequencyMhz);
  const exponent = (maxPathLossDb - frequencyTermDb - FSPL_CONSTANT_DB) / 20;
  const radiusKm = Math.max(0, 10 ** exponent);

  const radiusSceneUnits = clamp(
    radiusKm * KM_TO_SCENE_UNITS,
    MIN_COVERAGE_RADIUS,
    MAX_COVERAGE_RADIUS,
  );

  return { radiusKm, radiusSceneUnits };
}
