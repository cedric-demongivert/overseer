import {
  Texture2D as GLToolTexture2D
} from '@cedric-demongivert/gl-tool-texture'

export const Texture2D = {
  name: '2D Texture',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new GLToolTexture2D()
  },

  /**
  * @see gltool-ecs/TypeHandler#copy
  */
  copy (origin, target) {
    for (const level of target.levels()) target.deleteImage(level)

    for (const level of origin.levels()) {
      target.setImage(origin.getImage(level), level)
    }
  },

  /**
  * @see gltool-ecs/TypeHandler#reset
  */
  reset (instance) {
    for (const level of instance.levels()) instance.deleteImage(level)
  }
}
