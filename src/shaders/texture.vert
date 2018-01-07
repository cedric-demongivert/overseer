precision highp float;

attribute vec2 position;
attribute vec2 uv;

uniform mat3 localeToWorld;
uniform mat3 worldToCamera;
uniform mat3 localeToWorldNormal;
uniform mat3 worldToViewNormal;
uniform sampler2D colors;

varying vec2 fragUv;

void main () {
  gl_Position = vec4(vec3(position, 1.0) * localeToWorld * worldToCamera, 1.0);
  gl_PointSize = 1.0;
  fragUv = uv;
}
