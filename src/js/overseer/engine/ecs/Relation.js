import { InvalidParameterError } from '@errors'
import { Component } from './Component'

const _wrapped = Symbol('Relation#_wrapped')

export class Relation {
  static _oneWrapGetter (Type, target, key, descriptor) {
    const getter = descriptor.get

    descriptor.get = function () {
      const identifier = getter.call(this)
      return (identifier) ? this.manager.getComponent(identifier) : null
    }

    descriptor.get[_wrapped] = true
  }

  static _oneWrapSetter (Type, target, key, descriptor) {
    const setter = descriptor.set

    descriptor.set = function (value) {
      const identifier = (value) ? Component.identifier(value) : null

      if (identifier != null && Type != null) {
        const component = this.manager.getComponent(identifier)

        if (component.type !== Component.typeof(Type)) {
          throw new InvalidParameterError('value', value, [
            `Incompatible component type : ${component.type} instead of `,
            `${Component.typeof(Type)}.`
          ].join(''))
        }
      }

      setter.call(this, identifier)
    }

    descriptor.set[_wrapped] = true
  }

  static one (Type) {
    return function (target, key, descriptor) {
      if (descriptor.get && !descriptor.get[_wrapped]) {
        Relation._oneWrapGetter(Type, target, key, descriptor)
      }

      if (descriptor.set && !descriptor.set[_wrapped]) {
        Relation._oneWrapSetter(Type, target, key, descriptor)
      }

      return descriptor
    }
  }
}
