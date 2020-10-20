precision highp float;

attribute vec2 position;

uniform mat4 viewToWorld;

varying vec2 fragmentUv;

void main () {
  gl_Position = vec4(position, 0.0, 1.0);
  fragmentUv = (viewToWorld * vec4(position, 0.0, 1.0)).xy;
}
