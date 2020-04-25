import { FaceBuffer } from '@cedric-demongivert/gl-tool-buffer'
import { OverseerComponentType } from './OverseerComponentType'

export const FaceBufferType : OverseerComponentType<FaceBuffer> = {
  name: 'Face Buffer',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : FaceBuffer {
    return new FaceBuffer(new Uint16Array(3 * 16))
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : FaceBuffer, target : FaceBuffer) : void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : FaceBuffer) : void {
    instance.clear()
  }
}
