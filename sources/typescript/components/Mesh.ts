import { Material } from './Material'
import { Geometry } from './Geometry'

export class Mesh {
  public material : Material
  public geometry : Geometry
  public visible : boolean

  public constructor () {
    this.material = null
    this.geometry = null
    this.visible = true
  }

  public clear () {
    this.material = null
    this.geometry = null
    this.visible = true
  }

  public copy (other : Mesh) {
    this.material = other.material
    this.geometry = other.geometry
    this.visible = other.visible
  }
}
