import { Label as LabelData } from '../data/Label'

export const Label = {
  name: 'Label',

  hidden: true,

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new LabelData()
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
