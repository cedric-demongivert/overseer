precision highp float;

attribute vec2 position;
attribute vec4 color;
attribute vec2 uv;

uniform mat4 localToWorld;
uniform mat4 worldToView;
uniform mat4 worldToViewUnit;

varying vec4 fragmentColor;
varying vec2 fragmentUv;

void main () {
  gl_Position = worldToView * worldToViewUnit * localToWorld * vec4(position, 0.0, 1.0);
  fragmentColor = color;
  fragmentUv = uv;
}
