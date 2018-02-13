import { Geometry } from './Geometry'
import { VertexBuffer, FaceBuffer } from '@glkit'
import { Component } from '@overseer/engine/ecs'
import { OverseerMeshFormat } from '@overseer/engine/OverseerMeshFormat'

@Component({ type: Component.typeof(Geometry) })
export class Quad extends Geometry {
  /**
  * @see Component#initialize
  */
  initialize () {
    this.state = {
      vertices: new VertexBuffer(OverseerMeshFormat, 4),
      faces: new FaceBuffer(2)
    }

    this.state.vertices.push(
      {
        position: [-0.5, -0.5, 0],
        color: [1, 1, 1, 1],
        uv: [0, 0]
      },
      {
        position: [-0.5, +0.5, 0],
        color: [1, 1, 1, 1],
        uv: [0, 1]
      },
      {
        position: [+0.5, +0.5, 0],
        color: [1, 1, 1, 1],
        uv: [1, 1]
      },
      {
        position: [+0.5, -0.5, 0],
        color: [1, 1, 1, 1],
        uv: [1, 0]
      }
    )

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
