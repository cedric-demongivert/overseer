import { VertexBuffer } from '../components/VertexBuffer'
import { OverseerComponentType } from './OverseerComponentType'

export const VertexBufferType : OverseerComponentType<VertexBuffer> = {
  name: 'Vertex Buffer',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : VertexBuffer {
    return new VertexBuffer()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : VertexBuffer, target : VertexBuffer) : void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : VertexBuffer) : void {
    instance.clear()
  }
}
