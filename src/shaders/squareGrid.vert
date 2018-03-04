precision highp float;

// position of the current vertex in world unit.
attribute vec2 position;

// texture location of the current vertex in texture unit.
attribute vec2 uv;

// Size of the grid in cells.
uniform vec2 gridSize;

// Start of the grid in cells.
uniform vec2 gridStart;

// Interpolated cell location.
varying vec2 cell;

// varying float gridLevel;
// varying float floorLevel;

void main () {
  //gridLevel = log(max(size.x, size.y)) / log(10.0);
  //floorLevel = floor(gridLevel);
  //float coef = pow(10.0, floorLevel);

  gl_Position = vec4(vec3(position * 2.0, 0.0), 1.0);
  gl_PointSize = 1.0;

  cell = (uv * gridSize) + gridStart;
}
