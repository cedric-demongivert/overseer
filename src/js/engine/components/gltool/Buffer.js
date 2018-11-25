import { Component } from '@overseer/engine/ecs'
import {
  FaceBuffer as GLToolFaceBuffer,
  VertexBuffer as GLToolVertexBuffer,
  VertexStructureBuffer as GLToolVertexStructureBuffer
} from '@cedric-demongivert/gl-tool-buffer'

@Component({ type: 'gl-tool:face-buffer' })
export class Face extends GLToolFaceBuffer { }

@Component({ type: 'gl-tool:vertex-buffer' })
export class Vertex extends GLToolVertexBuffer { }

@Component({ type: 'gl-tool:vertex-structure:grouped' })
class Grouped extends GLToolVertexStructureBuffer.Grouped {}

@Component({ type: 'gl-tool:vertex-structure:interleaved' })
class Interleaved extends GLToolVertexStructureBuffer.Interleaved {}

export const Structure = {
  Grouped,
  Interleaved
}
