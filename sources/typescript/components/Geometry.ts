import { FaceBuffer } from '@cedric-demongivert/gl-tool-buffer'
import { VertexStructureBuffer } from '@cedric-demongivert/gl-tool-buffer'

export class Geometry {
  public vertices : VertexStructureBuffer
  public faces : FaceBuffer

  /**
  * Create a new empty geometry.
  */
  public constructor () {
    this.vertices = null
    this.faces = null
  }

  public copy (other : Geometry) : void {
    this.vertices = other.vertices
    this.faces = other.faces
  }

  public clear () : void {
    this.vertices = null
    this.faces = null
  }
}
