uniform sampler2D grid;
uniform float unit;

varying vec2 fragUv;

vec4 main () {
  return texture2D(grid, fragUv);
}
