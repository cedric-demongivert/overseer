import { OverseerComponentType } from './OverseerComponentType'

export const LabelType : OverseerComponentType<string> = {
  name: 'Label',

  hidden: true,

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : string {
    return ''
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : string, target : string) : string {
    return target
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : string) : string {
    return ''
  }
}
