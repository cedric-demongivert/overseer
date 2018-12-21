precision highp float;

attribute vec2 position;
attribute vec4 color;
attribute vec2 uv;

uniform mat3 localToWorld;
uniform mat3 worldToView;
uniform mat3 localToWorldNormal;
uniform mat3 worldToViewNormal;

varying vec4 fragColor;
varying vec2 fragUv;

void main () {
  vec3 worldPosition = worldToView * localToWorld * vec3(position, 1.0);
  gl_Position = vec4(worldPosition.xy, 0.0, 1.0);
  gl_PointSize = 1.0;
  fragColor = color;
  fragUv = uv;
}
