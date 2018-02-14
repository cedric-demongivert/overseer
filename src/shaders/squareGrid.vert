precision highp float;

attribute vec2 position;
attribute vec2 uv;

uniform vec2 size;
uniform vec2 start;

uniform sampler2D mediumCellTexture;
uniform sampler2D largeCellTexture;

varying vec2 fragUv;
varying float gridLevel;
varying float floorLevel;

void main () {
  gridLevel = log(max(size.x, size.y)) / log(10.0);
  floorLevel = floor(gridLevel);
  float coef = pow(10.0, floorLevel);

  gl_Position = vec4(vec3(position * 2.0, 0.0), 1.0);
  gl_PointSize = 1.0;

  fragUv = ((uv * size) + start) / coef;
}
