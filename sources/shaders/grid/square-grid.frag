precision highp float;

/**
* Transformation matrix that allows to transform view coordinates into world coordinates.
*/
uniform mat4 viewToWorld;

/**
* Zoom of the grid.
*/
uniform float zoom;

/**
* Unit of the grid, eg. the width and height of a cell of the grid in unit space.
*/
uniform vec2 unit;

/**
* Resolution of the viewport in pixels.
*/
uniform vec2 resolution;

/**
* Dimension of a pixel in world space.
*/
uniform vec2 pixelSize;

/**
* RGBA color of the grid.
*/
uniform vec4 color;

/**
* Thickness of the grid in pixels.
*/
uniform float thickness;

/**
* Base of the grid, eg. the number of units required to form a new unit of a grid of higher order.
*/
uniform float base;

/**
* Position of this pixel in world space.
*/
varying vec2 worldPosition;

float area (const vec2 size) {
  return size.x * size.y;
}

float getColoredAreaOfOrder (vec2 cellSize) {
  vec2 borderSize = thickness * pixelSize;

  vec2 start = mod(worldPosition, cellSize);
  vec2 end = start + pixelSize;

  vec2 left = max(min(end, borderSize) - start, 0.0);
  vec2 right = max(min(end, cellSize + borderSize) - cellSize, 0.0);

  return 1.0 - area(pixelSize - right - left) / area(pixelSize);
}

/**
* @return The percentage of space of the current pixel that is filled with a portion of the grid.
*/
float getColoredArea () {
  float result = 0.0;
  float scaling = 1.0;

  vec2 borderSize = thickness * pixelSize;

  for (float index = 0.0; index < 5.0; index += 1.0) {
    float order = zoom - index;
    vec2 cellSize = order < 0.0 ? unit / pow(base, -order) : unit * pow(base, order);

    result = max(result, getColoredAreaOfOrder(cellSize) * scaling);

    scaling /= 2.0;

    if (min(cellSize.x, cellSize.y) / min(borderSize.x, borderSize.y) < 20.0) {
      break;
    }
  }

  return result;
}

void main () {
  gl_FragColor = vec4(color.rgb, color.a * getColoredArea());
}
