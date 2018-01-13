uniform sampler2D grid;
uniform float unit;
uniform float strength;
uniform vec3 color;

varying vec2 fragUv;

vec4 main () {
  vec4 result =  texture2D(grid, fragUv);
  result.r = ((color.r * strength) + (1.0 - strength)) * result.a;
  result.g = ((color.g * strength) + (1.0 - strength)) * result.a;
  result.b = ((color.b * strength) + (1.0 - strength)) * result.a;
  return result;
}
