import { ComponentType } from './ComponentType'
import { componentTypes } from './componentTypes'

export function Component ({
  name,
  sameAs = [],
  database = componentTypes
}) {
  return function (Class) {
    let componentType = null

    if (database.hasTypeWithConstructor(Class)) {
      componentType = database.getTypeFromConstructor(Class)
    }  else {
      componentType = new ComponentType(name, Class)
      database.register(componentType)
    }

    for (const similareType of sameAs) {
      if (database.hasTypeWithConstructor(similareType)) {
        database.link(
          componentType,
          database.getTypeFromConstructor(similareType)
        )
      } else {
        throw new Error([
          "Unable to initialize type ", componentType.toString(), " because ",
          "the similar type constructor ", similareType.name, " was not registered ",
          "as a type."
        ].join(''))
      }
    }

    return Class
  }
}
