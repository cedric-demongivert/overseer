import { Geometry } from '../components/Geometry'
import { OverseerComponentType } from './OverseerComponentType'

/**
* Define a geometry.
*/
export const GeometryType : OverseerComponentType<Geometry> = {
  name: 'Geometry',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : Geometry {
    return new Geometry()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : Geometry, target : Geometry) : void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : Geometry) : void {
    instance.clear()
  }
}
