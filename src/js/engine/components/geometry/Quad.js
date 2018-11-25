import { Geometry } from './Geometry'
import { VertexBuffer, FaceBuffer } from '@glkit'
import { Component } from '@overseer/engine/ecs'
import { OverseerMeshStructure } from '@overseer/engine/OverseerMeshStructure'

@Component({ type: Component.typeof(Geometry) })
export class Quad extends Geometry {
  /**
  * @see Component#initialize
  */
  initialize () {
    this.state = {
      vertices: new VertexStructureBuffer(OverseerMeshStructure, 4),
      faces: new FaceBuffer(2)
    }

    const vertices = this.state.vertices

    vertices.push(4)

    vertices.setPosition(0, -0.5, -0.5)
    vertices.setColor(0, 1, 1, 1, 1)
    vertices.setUv(0, 0, 0)
    vertices.setPosition(1, -0.5, +0.5)
    vertices.setColor(1, 1, 1, 1, 1)
    vertices.setUv(1, 0, 1)
    vertices.setPosition(2, +0.5, +0.5)
    vertices.setColor(2, 1, 1, 1, 1)
    vertices.setUv(2, 1, 1)
    vertices.setPosition(3, +0.5, -0.5)
    vertices.setColor(3, 1, 1, 1, 1)
    vertices.setUv(3, 1, 0)

    this.state.faces.push(0, 1, 2)
    this.state.faces.push(3, 2, 0)
  }

  /**
  * @see Geometry#get buffers
  */
  get buffers () {
    return this.state
  }

  /**
  * @see Geometry#get usage
  */
  get usage () {
    return Geometry.STATIC_DRAW
  }
}
