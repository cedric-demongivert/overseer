precision highp float;

attribute vec2 position;
attribute vec2 uv;

uniform mat3 localToWorld;
uniform mat3 worldToView;
uniform mat3 localeToWorldNormal;
uniform mat3 worldToViewNormal;
uniform sampler2D colors;

varying vec2 fragUv;

void main () {
  gl_Position = vec4(vec3(position, 1.0) * localToWorld * worldToView, 1.0);
  gl_PointSize = 1.0;
  fragUv = uv;
}
