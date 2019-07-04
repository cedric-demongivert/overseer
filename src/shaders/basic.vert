precision highp float;

attribute vec2 position;
attribute vec4 color;
attribute vec2 uv;

uniform mat4 localToWorld;
uniform mat4 worldToView;
uniform mat4 localToWorldNormal;
uniform mat4 worldToViewNormal;

varying vec4 fragColor;
varying vec2 fragUv;

void main () {
  gl_Position = worldToView * localToWorld * vec4(position, 0.0, 1.0);
  gl_PointSize = 1.0;
  fragColor = color;
  fragUv = uv;
}
