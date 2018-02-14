precision highp float;

uniform vec2 size;
uniform vec2 start;

uniform sampler2D mediumCellTexture;
uniform sampler2D largeCellTexture;

varying vec2 fragUv;
varying float gridLevel;
varying float floorLevel;

void main () {
  vec2 muv = vec2(mod(fragUv.x * 10.0, 1.0), mod(fragUv.y * 10.0, 1.0));
  vec2 luv = vec2(mod(fragUv.x, 1.0), mod(fragUv.y, 1.0));
  float t1 = pow(min(1.0, (gridLevel - floorLevel + 0.2)) / 1.0, 2.0);
  float t2 = pow(max((gridLevel - floorLevel - 0.7), 0.0) / 0.3, 2.0);

  gl_FragColor = (1.0 - t1) * texture2D(mediumCellTexture, muv) + t1 * vec4(0.0);
  gl_FragColor = (1.0 - t2) * texture2D(mediumCellTexture, luv) + t2 * gl_FragColor;
}
