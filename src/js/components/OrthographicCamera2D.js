import {
  OrthographicCamera2D as OrthographicCamera2DData
} from '../data/OrthographicCamera2D'

export const OrthographicCamera2D = {
  name: 'Orthographic Camera 2D',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new OrthographicCamera2DData()
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
  }
}
