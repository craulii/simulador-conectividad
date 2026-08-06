// View-dependent rim term, brighter where the surface faces away from
// the camera. Shared by the atmosphere shell and, later, selection and
// coverage glow effects.
float fresnelTerm(vec3 viewDir, vec3 normal, float power) {
  return pow(1.0 - clamp(dot(viewDir, normal), 0.0, 1.0), power);
}
