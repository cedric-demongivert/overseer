import { Geometry as GeometryData } from '../data/Geometry'
/**
* Define a geometry.
*/
export const Geometry = {
  name: 'Geometry',
  
  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new GeometryData()
  },

  /**
  * @see gltool-ecs/TypeHandler#copy
  */
  copy (origin, target) {
    target.copy(origin)
  },

  /**
  * @see gltool-ecs/TypeHandler#reset
  */
  reset (instance) {
    instance.reset()
    return instance
  }
}
