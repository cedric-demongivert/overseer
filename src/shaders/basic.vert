precision highp float;

attribute vec3 position;
attribute vec4 color;

uniform mat3 localToWorld;
uniform mat3 worldToView;
uniform mat3 localToWorldNormal;
uniform mat3 worldToViewNormal;

varying vec4 fragColor;

void main () {
  gl_Position = vec4(worldToView * localToWorld * position, 1.0);
  gl_PointSize = 1.0;
  fragColor = color;
}
