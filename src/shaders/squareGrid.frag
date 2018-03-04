precision highp float;

// Size of a cell in pixels.
uniform float cellSize;

// Width of a line of the grid in pixels.
uniform float lineWidth;

// Progress between two grid levels.
uniform float progress;

// Fragment cell location.
varying vec2 cell;

// varying float gridLevel;
// varying float floorLevel;

float maxv2f (vec2 v) {
  return max(v.x, v.y);
}

void main () {
  float upCellBorder = maxv2f(abs(mod(cell, 1.0) - vec2(0.5)) * 2.0);
  float downCellBorder = maxv2f(abs(mod(cell * 10.0, 1.0) - vec2(0.5)) * 2.0);

  float upCoef = lineWidth / cellSize;
  float downCoef = upCoef * 10.0;

  float upt = max((upCellBorder + upCoef - 1.0) / upCoef, 0.0);
  float downt = max((downCellBorder + downCoef - 1.0) / downCoef, 0.0);

  gl_FragColor = vec4(0.0, 0.0, 0.0, progress) * upt +
                 vec4(0.0, 0.0, 0.0, 1.0 - progress) * downt;
}
