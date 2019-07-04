import { Program as GLToolProgram } from '@cedric-demongivert/gl-tool-shader'

export const Program = {
  name: 'Program',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new GLToolProgram()
  },

  /**
  * @see gltool-ecs/TypeHandler#copy
  */
  copy (origin, target) {
    target.vertex = origin.vertex
    target.fragment = origin.fragment
    target.commit()
  },

  /**
  * @see gltool-ecs/TypeHandler#reset
  */
  reset (instance) {
    instance.vertex = null
    instance.fragment = null
    instance.commit()
  }
}
