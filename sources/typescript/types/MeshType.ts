import { Mesh } from '../components/Mesh'
import { OverseerComponentType } from './OverseerComponentType'

export const MeshType : OverseerComponentType<Mesh> = {
  name: 'Mesh',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : Mesh {
    return new Mesh()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : Mesh, target : Mesh) : void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : Mesh) : void {
    instance.clear()
  }
}
