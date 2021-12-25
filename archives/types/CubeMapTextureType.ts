import { CubeMapTexture } from '@cedric-demongivert/gl-tool-texture'

import { OverseerComponentType } from './OverseerComponentType'

export const CubeMapTextureType: OverseerComponentType<CubeMapTexture> = {
  /**
   * @see OverseerComponentType.name
   */
  name: 'Cube Map Texture',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate(): CubeMapTexture {
    return new CubeMapTexture()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy(origin: CubeMapTexture, target: CubeMapTexture): void {
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
  * @see OverseerComponentType.clear
  */
  clear(instance: CubeMapTexture): void {
    instance.clear()
  }
}
