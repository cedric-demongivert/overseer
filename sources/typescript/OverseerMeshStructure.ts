import { VertexStructure, VertexFieldType } from '@cedric-demongivert/gl-tool-buffer'

export const OverseerMeshStructure : VertexStructure = new VertexStructure(
  [
    'position',
    'color',
    'uv'
  ],
  [
    VertexFieldType.FLOAT_VEC2,
    VertexFieldType.FLOAT_VEC4,
    VertexFieldType.FLOAT_VEC2
  ]
)
