import { OverseerComponentType } from './OverseerComponentType'

export const LayerType : OverseerComponentType<number> = {
  name: 'Layer',

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : number {
    return 0
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : number, target : number) : number {
    return target
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : number) : number {
    return 0
  }
}
