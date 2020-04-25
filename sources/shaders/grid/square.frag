precision mediump float;

uniform mat4 viewToGrid;

uniform vec2 offset;
uniform vec2 dimension;
uniform vec2 unit;

uniform vec2 resolution;

uniform vec4 color;
uniform float thickness;

float log10 (float x) {
  return log(x) / log(10.0);
}

/**
* @return The size of a pixel in grid space.
*/
vec2 getPixelDimensionInGridSpace () {
  vec2 pixelDimensionInScreenSpace = 2.0 / resolution;
  return (viewToGrid * vec4(pixelDimensionInScreenSpace, 0.0, 0.0)).xy;
}

float getGridOrder () {
  vec2 dimension = (getPixelDimensionInGridSpace() * resolution) / unit;
  return log10(max(dimension.x, dimension.y) / 50.0);
}

/**
* @return The current fragment pixel coordinates.
*/
vec2 getCurrentPixel () {
  return floor(gl_FragCoord.xy);
}

/**
* Transform a coordinate in pixel space into grid space.
*
* @param pixel A pixel to transform.
*
* @return A point in grid space equivalent to the given pixel.
*/
vec2 toGridSpaceLocation (vec2 pixel) {
  vec2 fragment = 2.0 * pixel / resolution - 1.0;
  return (viewToGrid * vec4(fragment, 0.0, 1.0)).xy + thickness * getPixelDimensionInGridSpace() / 2.0;
}

/**
* @return The percentage of space of the given pixel that is filled with a portion of the grid.
*/
float filling (const vec2 pixel, float order) {
  vec2 scaledUnit = unit * order;
  vec2 radius = thickness * getPixelDimensionInGridSpace();
  vec2 grid = toGridSpaceLocation(pixel);

  vec2 left = mod(grid, scaledUnit);
  vec2 right = scaledUnit - left;
  vec2 filled = max(radius - left, 0.0) + max(radius - right, 0.0);

  filled /= radius;

  return 1.0 - (1.0 - filled.x) * (1.0 - filled.y);
}

float infiniteFilling (const vec2 pixel) {
  float order = getGridOrder();
  float lower = floor(order);
  float upper = lower + 1.0;

  float lowerFilling = filling(pixel, pow(10.0, lower));
  float upperFilling = filling(pixel, pow(10.0, upper));

  return mix(lowerFilling, upperFilling, fract(order));
}

void main () {
  gl_FragColor = vec4(color.rgb, infiniteFilling(getCurrentPixel()));
}
