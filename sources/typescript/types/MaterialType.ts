import { Material } from '../components/Material'
import { OverseerComponentType } from './OverseerComponentType'

export const MaterialType : OverseerComponentType<Material> = {
  name: 'Material',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : Material {
    return new Material()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : Material, target : Material) : void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : Material) : void {
    instance.clear()
  }
}
