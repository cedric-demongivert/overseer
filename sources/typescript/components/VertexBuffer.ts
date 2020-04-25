import { InterleavedVertexStructureBuffer } from '@cedric-demongivert/gl-tool-buffer'
import { GroupedVertexStructureBuffer } from '@cedric-demongivert/gl-tool-buffer'
import { VertexStructureBuffer } from '@cedric-demongivert/gl-tool-buffer'
import { VertexStructure } from '@cedric-demongivert/gl-tool-buffer'

export class VertexBuffer {
  public buffer : VertexStructureBuffer

  /**
  * Create a new empty vertex buffer.
  */
  public constructor () {
    this.buffer = null
  }

  /**
  * Copy another component.
  *
  * @param other - Vertex buffer to copy.
  */
  public copy (toCopy : VertexBuffer) : void {
    this.buffer = null

    if (toCopy.buffer) {
      if (toCopy.buffer instanceof InterleavedVertexStructureBuffer) {
        this.buffer = InterleavedVertexStructureBuffer.clone(toCopy.buffer)
      } else if (toCopy.buffer instanceof GroupedVertexStructureBuffer){
        this.buffer = GroupedVertexStructureBuffer.clone(toCopy.buffer)
      }
    }
  }

  /**
  * Does instantiate a buffer of the given structure with its data grouped by vertex.
  *
  * @param structure - The vertex structure that the instantiated buffer must use.
  */
  public instantiateInterleavedBufferOf (structure : VertexStructure) : void {
    this.buffer = new InterleavedVertexStructureBuffer(structure)
  }


  /**
  * Does instantiate a buffer of the given structure with its data grouped by field.
  *
  * @param structure - The vertex structure that the instantiated buffer must use.
  */
  public instantiateGroupedBufferOf (structure : VertexStructure) : void {
    this.buffer = new GroupedVertexStructureBuffer(structure)
  }

  /**
  * @return True if this buffer was instantiated.
  */
  public isInstantiated () : boolean {
    return this.buffer != null
  }

  /**
  * @return True if the vertice data of this buffer is grouped by vertice.
  */
  public isInterleaved () : boolean {
    return this.buffer &&
           this.buffer instanceof InterleavedVertexStructureBuffer
  }

  /**
  * @return True if the vertice data of this buffer is grouped by field.
  */
  public isGrouped () : boolean {
    return this.buffer &&
           this.buffer instanceof GroupedVertexStructureBuffer
  }

  /**
  * Reset this component to its initial state.
  */
  public clear () : void {
    this.buffer = null
  }
}
