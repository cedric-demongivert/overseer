precision highp float;

attribute vec2 position;
attribute vec4 color;
attribute vec2 uv;

uniform mat4 localToWorld;
uniform mat4 worldToView;
uniform mat4 localToWorldNormal;
uniform mat4 worldToViewNormal;

varying vec4 fragmentColor;
varying vec2 fragmentUv;

void main () {
  gl_Position = worldToView * localToWorld * vec4(position, 0.0, 1.0);
  fragmentColor = color;
  fragmentUv = uv;
}
