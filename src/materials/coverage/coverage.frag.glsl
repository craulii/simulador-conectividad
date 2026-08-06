uniform float uTime;
uniform vec3 uColorCore;
uniform vec3 uColorRim;
uniform float uIntensity;

varying float vDist;

void main() {
  float d = clamp(vDist, 0.0, 1.0);

  vec3 color = mix(uColorCore, uColorRim, d);

  float edgeFade = 1.0 - smoothstep(0.7, 1.0, d);
  float coreGlow = 1.0 - smoothstep(0.0, 0.4, d);

  // A soft ring travels from the antenna outward to the edge on a
  // loop, fading out as it approaches the rim, reading as a live
  // signal rather than a static painted circle.
  float ringPos = fract(uTime * 0.18);
  float ring = smoothstep(0.05, 0.0, abs(d - ringPos)) * (1.0 - ringPos);

  float alpha = (edgeFade * 0.45 + coreGlow * 0.3 + ring * 0.5) * uIntensity;

  gl_FragColor = vec4(color, alpha);
}
