import { Shader } from '@cedric-demongivert/gl-tool-shader'
import { OverseerComponentType } from './OverseerComponentType'

export const VertexShaderType : OverseerComponentType<Shader> = {
  name: 'Vertex Shader',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : Shader {
    return Shader.vertex()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : Shader, target : Shader) : void {
    origin.source = target.source
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : Shader) : void {
    instance.source = null
  }
}
