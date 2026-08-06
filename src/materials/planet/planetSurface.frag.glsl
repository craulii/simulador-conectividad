uniform float uTime;
uniform vec3 uBaseColor;
uniform vec3 uLineColorA;
uniform vec3 uLineColorB;
uniform vec3 uAccentColor;
uniform float uHexScale;
uniform float uCircuitScale;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;

#include ../chunks/patterns.glsl

void main() {
  // Gentle shading so the sphere reads as a volume. The glowing lines
  // below are treated as self illuminated and skip this term.
  vec3 lightDir = normalize(vec3(0.4, 0.6, 0.8));
  float diffuse = 0.55 + 0.45 * clamp(dot(vNormal, lightDir), 0.0, 1.0);
  vec3 color = uBaseColor * diffuse;

  // Coarse hexagonal lattice: a faint, always on structural grid.
  vec2 hexUv = vUv * uHexScale;
  vec4 hex = hexGrid(hexUv);
  float hexEdge = hexEdgeDistance(hex.xy);
  float hexLine = smoothstep(0.025, 0.0, hexEdge);
  float hexCellId = hash21(hex.zw);
  vec3 hexColor = mix(uLineColorA, uLineColorB, hexCellId);
  color = mix(color, hexColor, hexLine * 0.35);

  // Circuit traces: sparser, thresholded noise lines with a slow signal
  // animation riding along them.
  vec2 circuitUv = vUv * uCircuitScale;
  float trace = fbm(circuitUv + vec2(uTime * 0.015, 0.0));
  float traceLine = smoothstep(0.52, 0.55, trace) - smoothstep(0.55, 0.6, trace);
  float signal = 0.5 + 0.5 * sin(trace * 40.0 - uTime * 1.5);
  vec3 circuitColor = mix(uLineColorA, uAccentColor, signal * 0.5);
  color = mix(color, circuitColor, traceLine * 0.8);

  // A handful of hex cell centers read as small lit points, pulsing gently.
  float isLit = step(0.93, hexCellId);
  float pulse = 0.5 + 0.5 * sin(uTime * 2.0 + hexCellId * 40.0);
  float centerDist = length(hex.xy);
  float dotShape = 1.0 - smoothstep(0.0, 0.12, centerDist);
  color += uAccentColor * isLit * dotShape * (0.4 + 0.6 * pulse);

  gl_FragColor = vec4(color, 1.0);
}
