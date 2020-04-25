import { Program } from '@cedric-demongivert/gl-tool-shader'

import { OverseerComponentType } from './OverseerComponentType'

export const ProgramType : OverseerComponentType<Program> = {
  name: 'Program',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : Program {
    return new Program()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : Program, target : Program) : void {
    target.vertex = origin.vertex
    target.fragment = origin.fragment
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : Program) : void {
    instance.vertex = null
    instance.fragment = null
  }
}
