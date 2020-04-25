import { EditableComponentType } from '../editor/EditableComponentType'

export interface OverseerComponentType<Type> extends EditableComponentType<Type> {
  /**
  * Truthy if component of this type must be hidden in the editor.
  */
  readonly hidden? : boolean
}
