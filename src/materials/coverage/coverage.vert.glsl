uniform float uAngularRadius;

varying float vDist;

void main() {
  // The geometry is a spherical cap centered on local +Y (a partial
  // SphereGeometry), so the angle from that pole is the dome's real
  // radial coordinate, unlike a flat disc it never pokes past the
  // planet's silhouette at large coverage radii.
  vec3 dir = normalize(position);
  float theta = acos(clamp(dir.y, -1.0, 1.0));
  vDist = theta / max(uAngularRadius, 0.0001);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
