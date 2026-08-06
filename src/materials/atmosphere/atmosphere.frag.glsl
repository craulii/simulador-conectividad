uniform vec3 uColor;
uniform float uPower;
uniform float uIntensity;

varying vec3 vNormal;
varying vec3 vViewDir;

#include ../glow/fresnelChunk.glsl

void main() {
  float rim = fresnelTerm(vViewDir, vNormal, uPower);
  gl_FragColor = vec4(uColor, rim * uIntensity);
}
