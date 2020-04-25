import { Shader } from '@cedric-demongivert/gl-tool-shader'
import { OverseerComponentType } from './OverseerComponentType'

export const FragmentShaderType : OverseerComponentType<Shader> = {
  name: 'Fragment Shader',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instantiate () : Shader {
    return Shader.fragment()
  },

  /**
  * @see gltool-ecs/TypeHandler#copy
  */
  copy (origin : Shader, target : Shader) : void {
    target.source = origin.source
  },

  /**
  * @see gltool-ecs/TypeHandler#reset
  */
  clear (instance : Shader) : void {
    instance.source = null
  }
}
