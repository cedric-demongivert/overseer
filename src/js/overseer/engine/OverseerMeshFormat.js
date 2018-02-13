import { GLType, VertexFormat } from '@glkit'

export const OverseerMeshFormat = new VertexFormat(
  ['position', 'color', 'uv'],
  [GLType.FLOAT_VEC2, GLType.FLOAT_VEC4, GLType.FLOAT_VEC2]
)
