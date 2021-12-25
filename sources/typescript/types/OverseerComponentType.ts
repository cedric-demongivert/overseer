//import { EditableComponentType } from '../editor/EditableComponentType'
import { ComponentType } from '@cedric-demongivert/gl-tool-ecs'

export interface OverseerComponentType<Type> extends ComponentType<Type> /*extends EditableComponentType<Type>*/ {
  /**
   * @see OverseerComponentType.name
   */
  readonly name: string

  /**
  * Truthy if component of this type must be hidden in the editor.
  */
  readonly hidden?: boolean
}
