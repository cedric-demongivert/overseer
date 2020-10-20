import { Component } from '@cedric-demongivert/gl-tool-ecs'
import { Geometry } from '@cedric-demongivert/gl-tool-buffer'

import { Material } from './Material'

export class Mesh {
  public material : Component<Material>
  public geometry : Component<Geometry>
  
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
