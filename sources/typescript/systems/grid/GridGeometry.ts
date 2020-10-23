import { FaceBuffer } from '@cedric-demongivert/gl-tool-buffer'
import { VertexStructureBuffer } from '@cedric-demongivert/gl-tool-buffer'
import { VertexStructure } from '@cedric-demongivert/gl-tool-buffer'
import { VertexFieldType } from '@cedric-demongivert/gl-tool-buffer'

export namespace GridGeometry {
  export const FORMAT = new VertexStructure(
    ['viewPosition'],
    [VertexFieldType.FLOAT_VEC2]
  )

  export const VERTICES : VertexStructureBuffer = VertexStructureBuffer.grouped(FORMAT, 4)
  VERTICES.size = 4
  VERTICES.setViewPosition(0, -1.0, -1.0)
  VERTICES.setViewPosition(1, 1.0, -1.0)
  VERTICES.setViewPosition(2, 1.0, 1.0)
  VERTICES.setViewPosition(3, -1.0, 1.0)

  export const FACES : FaceBuffer = FaceBuffer.empty(6)
  FACES.push(0, 1, 2)
  FACES.push(2, 3, 0)
}
