/* eslint-env jest */

import { Manager, Entity, Identifier } from '@overseer/engine/ecs'

describe('overseer.engine.ecs.entity.Entity', function () {
  describe('#constructor', function () {
    it('allow to create an entity into a manager', function () {
      const manager = new Manager()
      const identifier = Identifier.create()
      const entity = new Entity(manager, identifier)

/*
      expect([...manager.entities()]).toEqual([identifier])
      expect(entity.identifier).toBe(identifier)
      expect(entity.manager).toBe(manager)*/
    })

    it('throws if the entity to add already exists in the current manager', function () {
      /*const manager = new Manager()
      const identifier = Identifier.create()
      manager.addEntity(identifier)

      expect(_ => new Entity(manager, identifier)).toThrow()*/
    })
  })
})
