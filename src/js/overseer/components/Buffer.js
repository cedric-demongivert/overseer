import { Component } from '@overseer/ecs'
import {
  FaceBuffer as GLToolFaceBuffer,
  VertexBuffer as GLToolVertexBuffer,
  VertexStructureBuffer as GLToolVertexStructureBuffer
} from '@cedric-demongivert/gl-tool-buffer'

@Component({ name: 'gl-tool:face-buffer' })
export class Face extends GLToolFaceBuffer { }

@Component({ name: 'gl-tool:vertex-buffer' })
export class Vertex extends GLToolVertexBuffer { }

@Component({ name: 'gl-tool:vertex-structure'})
export class Structure {}

@Component({
  name: 'gl-tool:vertex-structure:grouped',
  sameAs: [Structure]
})
class Grouped extends GLToolVertexStructureBuffer.Grouped {}

@Component({
  name: 'gl-tool:vertex-structure:interleaved',
  sameAs: [Structure]
})
class Interleaved extends GLToolVertexStructureBuffer.Interleaved {}

Structure.Grouped = Grouped
Structure.Interleaved = Interleaved
