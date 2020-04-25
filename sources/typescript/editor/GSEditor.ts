import { ComponentEditor } from './ui/component/ComponentEditor'
import { NumberEditor } from './ui/component/NumberEditor'
import { Vector2fEditor } from './ui/component/Vector2fEditor'
import { Vector3fEditor } from './ui/component/Vector3fEditor'
import { Matrix4fEditor } from './ui/component/Matrix4fEditor'

import { EditableComponentType } from './EditableComponentType'

const EMPTY_PROPERTIES : EditableComponentType.Properties<any> = {}

export function GSEditor <T> (handler : EditableComponentType<T>) : EditableComponentType<T> {
  const editor : ComponentEditor<T> = new ComponentEditor<T>()
  const properties : EditableComponentType.Properties<T> = handler.properties || EMPTY_PROPERTIES

  for (const property of Object.getOwnPropertyNames(properties)) {
    const descriptor : EditableComponentType.Property<T, any> = properties[property]
    const identifier : number = editor.define(property)

    if (descriptor.label) {
      editor.defineLabel(identifier, descriptor.label)
    }

    if (descriptor.getter) {
      descriptor.getter = descriptor.getter.bind(descriptor)
      editor.defineAccessor(identifier, descriptor.getter)
    }

    if (descriptor.setter) {
      descriptor.setter = descriptor.setter.bind(descriptor)
      editor.defineMutator(identifier, descriptor.setter)
    }

    if (descriptor.editor) {
      editor.defineEditor(identifier, descriptor.editor)
    }
  }

  handler.editor = editor
  handler.render = editor.render.bind(editor)

  return handler
}

export namespace GSEditor {
  export function number () {
    return NumberEditor
  }

  export function vector2f () {
    return Vector2fEditor
  }

  export function vector3f () {
    return Vector3fEditor
  }

  export function color () {
    return Vector3fEditor
  }

  export function matrix4f () {
    return Matrix4fEditor
  }
}
