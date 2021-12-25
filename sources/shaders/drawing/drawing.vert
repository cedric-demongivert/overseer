precision highp float;

attribute vec2 anchor;
attribute vec2 position;

uniform mat4 localToWorld;
uniform mat4 worldToView;

varying vec4 fragmentColor;
varying vec2 fragmentUv;

void main () {
  gl_Position = worldToView * localToWorld * vec4(position + anchor, 0.0, 1.0);
  fragmentColor = color;
  fragmentUv = uv;
}
