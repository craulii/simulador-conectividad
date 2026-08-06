import { Vector3 } from "three";

export interface GeoPosition {
  latitude: number;
  longitude: number;
  altitude: number;
}

export function geoToCartesian(position: GeoPosition, baseRadius: number): Vector3 {
  const latRad = (position.latitude * Math.PI) / 180;
  const lonRad = (position.longitude * Math.PI) / 180;
  const radius = baseRadius + position.altitude;

  return new Vector3(
    radius * Math.cos(latRad) * Math.sin(lonRad),
    radius * Math.sin(latRad),
    radius * Math.cos(latRad) * Math.cos(lonRad),
  );
}

export function surfaceNormalFromGeo(
  position: Pick<GeoPosition, "latitude" | "longitude">,
): Vector3 {
  return geoToCartesian({ ...position, altitude: 0 }, 1).normalize();
}

export function cartesianToGeo(point: Vector3, baseRadius: number): GeoPosition {
  const radius = point.length();
  const latitude = (Math.asin(point.y / radius) * 180) / Math.PI;
  const longitude = (Math.atan2(point.x, point.z) * 180) / Math.PI;
  return { latitude, longitude, altitude: radius - baseRadius };
}
