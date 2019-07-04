import { Shader as GLToolShader } from '@cedric-demongivert/gl-tool-shader'

export const FragmentShader = {
  name: 'Fragment Shader',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new GLToolShader.Fragment()
  },

  /**
  * @see gltool-ecs/TypeHandler#copy
  */
  copy (origin, target) {
    target.source = origin.source
    target.commit()
  },

  /**
  * @see gltool-ecs/TypeHandler#reset
  */
  reset (instance) {
    instance.source = null
    instance.commit()
    return instance
  }
}
