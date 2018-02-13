import { NotImplementedError } from '@errors'
import { GLEnum } from '@glkit/gl/GLEnum'
import { Component } from '@overseer/engine/ecs'

/**
* Define a geometry.
*/
@Component({ type: 'overseer:engine:geometry' })
export class Geometry {
  /**
  * @return {{ vertices: VertexBuffer, faces: FaceBuffer }}
  */
  get buffers () {
    throw new NotImplementedError(Geometry, 'get buffers')
  }

  /**
  * @return {GLEnum} The usage policy of this geometry.
  */
  get usage () {
    throw new NotImplementedError(Geometry, 'get usage')
  }

  get format () {
    return this.buffers.vertices.format
  }

  get faces () {
    return this.buffers.faces.size
  }
}

// Usage constants
Geometry.STATIC_DRAW = GLEnum.STATIC_DRAW
