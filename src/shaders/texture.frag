precision highp float;

uniform mat3 localeToWorld;
uniform mat3 worldToCamera;
uniform mat3 localeToWorldNormal;
uniform mat3 worldToViewNormal;
uniform sampler2D colors;

varying vec2 fragUv;

void main () {
  gl_FragColor = texture2D(colors, fragUv);
}
