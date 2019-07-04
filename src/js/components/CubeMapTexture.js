import {
  CubeMapTexture as GLToolCubeMapTexture
} from '@cedric-demongivert/gl-tool-texture'

export const CubeMapTexture = {
  name: 'Cube Map Texture',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new GLToolCubeMapTexture()
  },

  /**
  * @see gltool-ecs/TypeHandler#copy
  */
  copy (origin, target) {
    CubeMapTexture.reset(target)

    for (let index = 0; index < 6; ++index) {
      for (const level of origin.levels(index)) {
        target.setImage(
          origin.getImage(index, level),
          index, level
        )
      }
    }
  },

  /**
  * @see gltool-ecs/TypeHandler#reset
  */
  reset (instance) {
    for (let index = 0; index < 6; ++index) {
      for (const level of target.levels(index)) target.deleteImage(index, level)
    }
  }
}
