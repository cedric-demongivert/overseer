/* eslint-env jest */

import { Manager, Entity, DuplicatedEntityError } from '@overseer/engine/ecs'

describe('overseer.engine.ecs.entity.Entity', function () {
  describe('#constructor', function () {
    it('allow to create an entity into a manager', function () {
      const manager = new Manager()
      const entity = new Entity(manager, 'myEntity')

      expect([...manager.entities()]).toEqual(['myEntity'])
      expect(entity.identifier).toBe('myEntity')
      expect(entity.manager).toBe(manager)
    })

    it('throw a DuplicatedEntityError if the entity to add already exists in the current manager', function () {
      const manager = new Manager()
      manager.addEntity('myEntity')

      expect(_ => new Entity(manager, 'myEntity')).toThrow(DuplicatedEntityError)
    })
  })
})
