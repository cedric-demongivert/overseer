import { Texture2D } from '@cedric-demongivert/gl-tool-texture'

import { OverseerComponentType } from './OverseerComponentType'

export const Texture2DType : OverseerComponentType<Texture2D> = {
  name: '2D Texture',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : Texture2D {
    return new Texture2D()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : Texture2D, target : Texture2D) : void {
    for (const level of target.levels()) target.deleteImage(level)

    for (const level of origin.levels()) {
      target.setImage(origin.getImage(level), level)
    }
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : Texture2D) : void {
    for (const level of instance.levels()) instance.deleteImage(level)
  }
}
