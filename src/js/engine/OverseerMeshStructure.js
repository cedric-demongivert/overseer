import { VertexStructure, VertexFieldType } from '@cedric-demongivert/gl-tool-buffer'

export const OverseerMeshStructure = new VertexStructure([
  ['position', VertexFieldType.FLOAT_VEC2],
  ['color', VertexFieldType.FLOAT_VEC4],
  ['uv', VertexFieldType.FLOAT_VEC2]
])
