import { Hierarchy as HierarchyData } from '../data/Hierarchy'

export const Hierarchy = {
  name: 'Hierarchy',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new HierarchyData()
  },

  /**
  * @see gltool-ecs/TypeHandler#reset
  */
  reset (instance) {
    instance.reset()
  }
}
