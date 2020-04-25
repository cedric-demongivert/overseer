precision highp float;

uniform mat4 localeToWorld;
uniform mat4 worldToView;
uniform mat4 localeToWorldNormal;
uniform mat4 worldToViewNormal;

varying vec4 fragColor;
varying vec2 fragUv;

void main () {
  gl_FragColor = fragColor;
}
