precision highp float;

uniform vec2 offset;
uniform vec2 dimension;

attribute vec2 position;
attribute vec2 uv;

varying vec2 fragment;

void main () {
  gl_Position = vec4(position, 0.0, 1.0);
  fragment = uv;
}
