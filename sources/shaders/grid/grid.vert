precision highp float;

attribute vec2 viewPosition;

uniform mat4 viewToWorld;

varying vec2 worldPosition;

void main () {
  gl_Position = vec4(viewPosition, 0.0, 1.0);
  worldPosition = (viewToWorld * vec4(viewPosition, 0.0, 1.0)).xy;
}
