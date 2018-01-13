/* eslint-env jest */

import {
  Manager, Component, InvalidComponentManagerError, DuplicatedEntityError
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

@Component.Type('my-type-2')
class MyType2 extends MyType { }

@Component.Type('my-type-3')
class MyType3 extends MyType { }

describe('overseer.engine.ecs.Manager', function () {
  describe('#constructor', function () {
    it('allow to create an empty manager', function () {
      const manager = new Manager()

      expect([...manager.entities()]).toEqual([])
      expect([...manager.systems()]).toEqual([])
      expect([...manager.components()]).toEqual([])
    })
  })

  describe('#addEntity', function () {
    it('add an entity to the manager', function () {
      const manager = new Manager()

      expect([...manager.entities()]).toEqual([])

      manager.addEntity('myEntity')

      expect([...manager.entities()]).toEqual(['myEntity'])

      for (const entity of ['1', '2', '3', '4', '5']) {
        expect(manager.hasEntity(entity)).toBeFalsy()
        manager.addEntity(entity)
        expect(manager.hasEntity(entity)).toBeTruthy()
      }

      const entities = new Set([...manager.entities()])

      for (const entity of ['1', '2', '3', '4', '5']) {
        expect(entities.has(entity)).toBeTruthy()
      }
    })

    it('throw a DuplicatedEntityError if the entity to add already exists in the current manager', function () {
      const manager = new Manager()

      manager.addEntity('myEntity')

      expect(_ => manager.addEntity('myEntity')).toThrow(DuplicatedEntityError)
    })
  })

  describe('#addComponent', function () {
    it('will throw an error if the given component is not instanciated for the current manager', function () {
      const firstManager = new Manager()
      const secondManager = new Manager()
      firstManager.addEntity('myEntity')
      secondManager.addEntity('myEntity')

      const component = new Component(
        firstManager, 'myEntity', 'myComponent', MyType
      )

      expect(_ => secondManager.addComponent(component)).toThrow(
        InvalidComponentManagerError
      )
    })
  })

  describe('#deleteComponent', function () {
    it('delete a component of the manager if exists', function () {
      const manager = new Manager()
      manager.addEntity('myEntity')
      const component = new Component(
        manager, 'myEntity', 'myComponent', MyType
      )

      expect(manager.hasComponent('myComponent')).toBeTruthy()
      expect([...manager.components()]).toEqual([component])
      expect([...manager.components(MyType)]).toEqual([component])

      manager.deleteComponent(component)

      expect(manager.hasComponent('myComponent')).toBeFalsy()
      expect([...manager.components()]).toEqual([])
      expect([...manager.components(MyType)]).toEqual([])

      manager.deleteComponent(component)

      expect(manager.hasComponent('myComponent')).toBeFalsy()
      expect([...manager.components()]).toEqual([])
      expect([...manager.components(MyType)]).toEqual([])
    })
  })

  describe('#deleteEntity', function () {
    it('delete an entity of the manager and all of its components', function () {
      const manager = new Manager()
      manager.addEntity('myEntity')
      Reflect.construct(Component, [manager, 'myEntity', 'myComponent', MyType])
      Reflect.construct(Component, [
        manager, 'myEntity', 'myComponent2', MyType2
      ])
      Reflect.construct(Component, [
        manager, 'myEntity', 'myComponent3', MyType3
      ])

      expect([...manager.entities()]).toEqual(['myEntity'])
      expect([...manager.components()]).toHaveLength(3)

      manager.deleteEntity('myEntity')

      expect([...manager.entities()]).toEqual([])
      expect([...manager.components()]).toHaveLength(0)

      manager.deleteEntity('myEntity')

      expect([...manager.entities()]).toEqual([])
      expect([...manager.components()]).toHaveLength(0)
    })
  })
})
