precision highp float;

uniform mat3 localToWorld;
uniform mat3 worldToView;
uniform mat3 localToWorldNormal;
uniform mat3 worldToViewNormal;
uniform sampler2D colors;

varying vec2 fragUv;

void main () {
  gl_FragColor = texture2D(colors, fragUv);
  //gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); //texture2D(colors, fragUv);
}
