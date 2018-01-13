/* eslint-env jest */

import { Manager, UUIDv4Entity } from '@overseer/engine/ecs'

describe('overseer.engine.ecs.entity.UUIDv4Entity', function () {
  describe('#constructor', function () {
    it('allow to create an entity into a manager', function () {
      const manager = new Manager()
      const entity = new UUIDv4Entity(manager)

      expect([...manager.entities()]).toEqual([entity.identifier])
      expect(entity.identifier).not.toBeNull()
      expect(entity.manager).toBe(manager)
    })

    it('allow to create a bunch of entities', function () {
      const manager = new Manager()
      const constructionArguments = [manager]

      for (let i = 0; i < 1000; ++i) {
        Reflect.construct(UUIDv4Entity, constructionArguments)
      }

      expect([...manager.entities()]).toHaveLength(1000)
    })
  })

  describe('#static create', function () {
    it('allow to create an entity into a manager without instanciating a new UUIDv4Entity object', function () {
      const manager = new Manager()
      const entity = UUIDv4Entity.create(manager)

      expect([...manager.entities()]).toEqual([entity])
    })

    it('allow to create a bunch of entities', function () {
      const manager = new Manager()

      for (let i = 0; i < 1000; ++i) {
        UUIDv4Entity.create(manager)
      }

      expect([...manager.entities()]).toHaveLength(1000)
    })
  })
})
