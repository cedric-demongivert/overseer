import { GSEditor } from './GSEditor'
import { NumberEditor } from './NumberEditor'
import { Vector2fEditor } from './Vector2fEditor'
import { Vector3fEditor } from './Vector3fEditor'
import { Matrix4fEditor } from './Matrix4fEditor'

const EMPTY_PROPERTIES = {}

export function decorator (handler) {
  const editor = new GSEditor()

  const properties = handler.properties || EMPTY_PROPERTIES

  for (const property of Object.getOwnPropertyNames(properties)) {
    const descriptor = properties[property]
    const identifier = editor.define(property)

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

decorator.number = function () {
  return NumberEditor
}

decorator.vector2f = function () {
  return Vector2fEditor
}

decorator.vector3f = function () {
  return Vector3fEditor
}

decorator.color = function () {
  return Vector3fEditor
}

decorator.matrix4f = function () {
  return Matrix4fEditor
}
