import {
  InterleavedVertexStructureBuffer,
  GroupedVertexStructureBuffer,
  Structure
} from '@cedric-demongivert/gl-tool-buffer'

export class VertexBuffer {
  /**
  * Create a new empty vertex buffer.
  */
  constructor () {
    this._buffer = null
  }

  /**
  * Reset this component to its initial state.
  */
  reset () {
    this._buffer = null
  }

  /**
  * Copy another component.
  *
  * @param {VertexBuffer} other - Vertex buffer to copy.
  */
  copy (other) {
    this._buffer = null

    if (other.isInstanciated()) {
      if (other.isInterleaved()) {
        this._buffer = InterleavedVertexStructureBuffer.clone(other.buffer)
      } else {
        this._buffer = GroupedVertexStructureBuffer.clone(other.buffer)
      }
    }
  }

  /**
  * Return the underlying vertex buffer.
  *
  * @return {VertexStructureBuffer} The underlying vertex buffer.
  */
  get buffer () {
    return this._buffer
  }

  /**
  * Does instanciate a buffer of the given structure with its data grouped by vertex.
  *
  * @param {VertexStructureBuffer} structure - The vertex structure that the instanciated buffer must use.
  */
  instanciateInterleavedBufferOf (structure) {
    this._buffer = new InterleavedVertexStructureBuffer(structure)
  }


  /**
  * Does instanciate a buffer of the given structure with its data grouped by field.
  *
  * @param {VertexStructureBuffer} structure - The vertex structure that the instanciated buffer must use.
  */
  instanciateGroupedBufferOf (structure) {
    this._buffer = new GroupedVertexStructureBuffer(structure)
  }

  /**
  * @return {boolean} True if this buffer was instanciated.
  */
  isInstanciated () {
    return this._buffer != null
  }

  /**
  * @return {boolean} True if the vertice data of this buffer is grouped by vertice.
  */
  isInterleaved () {
    return this._buffer &&
           this._buffer instanceof InterleavedVertexStructureBuffer
  }

  /**
  * @return {boolean} True if the vertice data of this buffer is grouped by field.
  */
  isGrouped () {
    return this._buffer &&
           this._buffer instanceof GroupedVertexStructureBuffer
  }
}
