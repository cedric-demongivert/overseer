uniform sampler2D grid;
uniform float unit;
uniform float strength;
uniform vec3 color;

varying vec2 fragUv;

vec3 main () {
  fragUv = vec2(left + uv.x * (right - left), bottom + uv.y * (top - bottom));
  fragUv /= unit;
  return vec3(position.x * 2.0, position.y * 2.0, 1);
}
