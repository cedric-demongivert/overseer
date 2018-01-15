/* eslint-env jest */

import {
  Manager, Entity, Component,
  DuplicatedComponentError, InvalidComponentEntityError
} from '@overseer/engine/ecs'

describe('overseer.engine.ecs.component.Component', function () {
  describe('#constructor', function () {
    it('allow to create a component into a manager', function () {
      const manager = new Manager()
      const entity = new Entity(manager, 'myEntity')
      const component = new Component(manager, entity, 'myComponent')

      expect([...manager.entities()]).toEqual(['myEntity'])
      expect(component.identifier).toBe('myComponent')
      expect(component.manager).toBe(manager)
      expect(component.entity).toBe('myEntity')
      expect(component.type).toBe(Component.typeof(Component))
      expect(component.clazz).toBe(Component)
      expect(component.serialize()).toEqual({
        identifier: 'myComponent',
        entity: 'myEntity',
        type: 'component',
        version: 0,
        state: { }
      })
      expect([...manager.components()]).toEqual([component])
      expect([...manager.components(Component)]).toEqual([component])
    })

    it('throw a DuplicatedComponentError if the component to add already exists in the current manager', function () {
      const manager = new Manager()
      const entity = new Entity(manager, 'myEntity')
      const base = new Component(manager, entity, 'myComponent')

      expect(
        _ => new Component(manager, entity, 'myComponent')
      ).toThrow(DuplicatedComponentError)
    })

    it('throw a InvalidComponentEntityError if the component is instanciated for an entity that does not exists in the manager', function () {
      const manager = new Manager()

      expect(
        _ => new Component(manager, 'myEntity', 'myComponent')
      ).toThrow(InvalidComponentEntityError)
    })

    // @Todo test already existing that type of component for a given entity
  })

  describe('#update', function () {
    it('set a field of its type', function () {
      const manager = new Manager()
      const entity = new Entity(manager, 'myEntity')
      const base = new Component(manager, entity, 'myComponent')

      expect(base.state.value).toBe(undefined)

      base.update({ value: 5 })
      expect(base.state.value).toBe(5)

      base.update(x => {
        x.value *= 5
      })
      expect(base.state.value).toBe(25)
    })

    it('update the version of the component', function () {
      const manager = new Manager()
      const entity = new Entity(manager, 'myEntity')
      const base = new Component(manager, entity, 'myComponent')

      let prevVersion = base.version

      base.update({ value: 5 })

      expect(prevVersion).not.toBe(base.version)

      prevVersion = base.version
      base.update(x => {
        x.value *= 5
      })

      expect(prevVersion).not.toBe(base.version)
    })
  })
})
