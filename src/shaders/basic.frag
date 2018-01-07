precision highp float;

uniform mat3 localeToWorld;
uniform mat3 worldToView;
uniform mat3 localeToWorldNormal;
uniform mat3 worldToViewNormal;

varying vec4 fragColor;

void main () {
  gl_FragColor = fragColor;
}
