import { FaceBuffer } from '@cedric-demongivert/gl-tool-buffer'
import { VertexStructureBuffer } from '@cedric-demongivert/gl-tool-buffer'
import { VertexStructure } from '@cedric-demongivert/gl-tool-buffer'
import { VertexFieldType } from '@cedric-demongivert/gl-tool-buffer'

export namespace DrawingGeometry {
  export const FORMAT = new VertexStructure(
    ['position'],
    [VertexFieldType.FLOAT_VEC2]
  )

  export const WORLD : VertexStructureBuffer = VertexStructureBuffer.grouped(FORMAT, 4)
  WORLD.size = 4
  WORLD.setPosition(0, -1.0, -1.0)
  WORLD.setPosition(1, 1.0, -1.0)
  WORLD.setPosition(2, 1.0, 1.0)
  WORLD.setPosition(3, -1.0, 1.0)

  export const FACES : FaceBuffer = FaceBuffer.empty(6)
  FACES.push(0, 1, 2)
  FACES.push(2, 3, 0)
}
