import { Shader as GLToolShader } from '@cedric-demongivert/gl-tool-shader'

export const VertexShader = {
  name: 'Vertex Shader',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new GLToolShader.Vertex()
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
  }
}
