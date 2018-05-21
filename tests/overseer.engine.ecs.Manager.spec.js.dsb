/* eslint-env jest */

import { Manager, Component, Identifier } from '@overseer/engine/ecs'

function debug (Class) {
  const entries = []

  while (Class) {
    entries.push(Class.name || Class)
    Class = Object.getPrototypeOf(Class)
  }

  return entries.join(' extends ')
}

@Component({ type: 'my-type' })
class MyType { }

//console.log(debug(MyType))

class MyTmpType extends MyType { }

@Component({ type: 'my-type-2' })
class MyType2 extends MyTmpType { }

//console.log(debug(MyTmpType))
//console.log(debug(MyType2))

@Component({ type: 'my-type-3' })
class MyType3 extends MyType2 { }

//console.log(debug(MyType3))

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
      const identifier = Identifier.create()

      expect([...manager.entities()]).toEqual([])

      manager.addEntity(identifier)

      expect([...manager.entities()]).toEqual([identifier])

      const identifiers = [
        Identifier.create(), Identifier.create(), Identifier.create(),
        Identifier.create(), Identifier.create()
      ]

      for (const entity of identifiers) {
        expect(manager.hasEntity(entity)).toBeFalsy()
        manager.addEntity(entity)
        expect(manager.hasEntity(entity)).toBeTruthy()
      }

      const entities = new Set([...manager.entities()])

      for (const entity of identifiers) {
        expect(entities.has(entity)).toBeTruthy()
      }
    })

    it('throws if the entity to add already exists in the current manager', function () {
      const manager = new Manager()
      const identifier = Identifier.create()

      manager.addEntity(identifier)

      expect(_ => manager.addEntity(identifier)).toThrow()
    })
  })

  describe('#addComponent', function () {
    it('throws an error if the given component is not instanciated for the current manager', function () {
      const firstManager = new Manager()
      const secondManager = new Manager()
      const identifier = Identifier.create()

      firstManager.addEntity(identifier)
      secondManager.addEntity(identifier)

      const component = new MyType(firstManager, identifier)

      expect(_ => secondManager.addComponent(component)).toThrow()
    })
  })

  describe('#deleteComponent', function () {
    it('delete a component of the manager if exists', function () {
      const manager = new Manager()
      const identifier = Identifier.create()
      const componentIdentifier = Identifier.create()
      manager.addEntity(identifier)
      const component = new MyType(manager, identifier, componentIdentifier)

      expect(manager.hasComponent(componentIdentifier)).toBeTruthy()
      expect([...manager.components()]).toEqual([component])
      expect([...manager.components(MyType)]).toEqual([component])

      manager.deleteComponent(componentIdentifier)

      expect(manager.hasComponent(componentIdentifier)).toBeFalsy()
      expect([...manager.components()]).toEqual([])
      expect([...manager.components(MyType)]).toEqual([])

      manager.deleteComponent(componentIdentifier)

      expect(manager.hasComponent(componentIdentifier)).toBeFalsy()
      expect([...manager.components()]).toEqual([])
      expect([...manager.components(MyType)]).toEqual([])
    })
  })

  describe('#deleteEntity', function () {
    it('delete an entity of the manager and all of its components', function () {
      const manager = new Manager()
      const identifier = Identifier.create()
      const componentIdentifier = Identifier.create()
      manager.addEntity(identifier)
      Reflect.construct(MyType, [manager, identifier])
      Reflect.construct(MyType2, [manager, identifier])
      Reflect.construct(MyType3, [manager, identifier])

      expect([...manager.entities()]).toEqual([identifier])
      expect([...manager.components()]).toHaveLength(3)

      manager.deleteEntity(identifier)

      expect([...manager.entities()]).toEqual([])
      expect([...manager.components()]).toHaveLength(0)

      manager.deleteEntity(identifier)

      expect([...manager.entities()]).toEqual([])
      expect([...manager.components()]).toHaveLength(0)
    })
  })
})
