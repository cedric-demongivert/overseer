import { FaceBuffer, VertexBuffer } from '@overseer/components'
import { GridMeshFormat } from './GridMeshFormat'

export const vertices = VertexBuffer.instanciate()
vertices.instanciateGroupedBufferOf(GridMeshFormat)
vertices.buffer.capacity = 4
vertices.buffer
        .push(4)
        .setPosition(0, -1.0, -1.0)
        .setPosition(1, 1.0, -1.0)
        .setPosition(2, 1.0, 1.0)
        .setPosition(3, -1.0, 1.0)

export const faces = FaceBuffer.instanciate()
faces.capacity = 2
faces.push(0, 1, 2)
faces.push(2, 3, 0)
