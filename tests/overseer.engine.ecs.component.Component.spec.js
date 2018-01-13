/* eslint-env jest */

import {
  Manager, Entity, Component,
  DuplicatedComponentError, InvalidComponentEntityError
} from '@overseer/engine/ecs'

@Component.Type('my-type')
class MyType {
  constructor () {
    this.state = {
      value: 5
    }
  }

  get value () {
    return this.state.value
  }

  set value (x) {
    this.state.value = x * 10
  }
}

describe('overseer.engine.ecs.component.Component', function () {
  describe('#constructor', function () {
    it('allow to create a component into a manager', function () {
      const manager = new Manager()
      const entity = new Entity(manager, 'myEntity')
      const component = new Component(manager, entity, 'myComponent', MyType)

      expect([...manager.entities()]).toEqual(['myEntity'])
      expect([...manager.components()]).toEqual([component])
      expect([...manager.components(MyType)]).toEqual([component])
      expect(component.identifier).toBe('myComponent')
      expect(component.manager).toBe(manager)
      expect(component.entity).toBe('myEntity')
      expect(component.type).toBe(Component.typeof(MyType))
      expect(component.clazz).toBe(MyType)
      expect(component.data).toEqual({
        identifier: 'myComponent',
        entity: 'myEntity',
        type: 'my-type',
        version: 0,
        state: {
          value: 5
        }
      })
    })

    it('throw a DuplicatedComponentError if the component to add already exists in the current manager', function () {
      const manager = new Manager()
      const entity = new Entity(manager, 'myEntity')
      const base = new Component(manager, entity, 'myComponent', MyType)

      expect(
        _ => new Component(manager, entity, 'myComponent', MyType)
      ).toThrow(DuplicatedComponentError)
    })

    it('throw a InvalidComponentEntityError if the component is instanciated for an entity that does not exists in the manager', function () {
      const manager = new Manager()

      expect(
        _ => new Component(manager, 'myEntity', 'myComponent', MyType)
      ).toThrow(InvalidComponentEntityError)
    })

    // @Todo test already existing that type of component for a given entity
  })

  describe('#set', function () {
    it('set a field of its type', function () {
      const manager = new Manager()
      const entity = new Entity(manager, 'myEntity')
      const base = new Component(manager, entity, 'myComponent', MyType)

      expect(base.get('value')).toBe(5)
      expect(base.data.state).toEqual({
        value: 5
      })
      base.set('value', 3)
      expect(base.get('value')).toBe(30)
      expect(base.data.state).toEqual({
        value: 30
      })

      expect(base.get('blobl')).toBeUndefined()

      base.set('blobl', 'any')

      expect(base.get('blobl')).toBe('any')
      expect(base.data.state).toEqual({
        value: 30,
        blobl: 'any'
      })
    })

    it('set multiple fields at once', function () {
      const manager = new Manager()
      const entity = new Entity(manager, 'myEntity')
      const base = new Component(manager, entity, 'myComponent', MyType)

      expect(base.get('value')).toBe(5)
      expect(base.get('blobl')).toBeUndefined()
      expect(base.data.state).toEqual({
        value: 5
      })

      base.set({
        value: 3,
        blobl: 'any'
      })

      expect(base.get('value')).toBe(30)
      expect(base.get('blobl')).toBe('any')
      expect(base.data.state).toEqual({
        value: 30,
        blobl: 'any'
      })
    })

    it('update the version of the component', function () {
      const manager = new Manager()
      const entity = new Entity(manager, 'myEntity')
      const base = new Component(manager, entity, 'myComponent', MyType)

      let prevVersion = base.version

      base.set('value', 5)

      expect(prevVersion).not.toBe(base.version)

      prevVersion = base.version
      base.set({ value: 32 })

      expect(prevVersion).not.toBe(base.version)
    })
  })
})
