/* eslint-env jest */

import {
  Manager, Entity, Component, UUIDv4Component
} from '@overseer/engine/ecs'


describe('overseer.engine.ecs.entity.UUIDv4Component', function () {
  describe('#constructor', function () {
    it('allow to create a component into a manager', function () {
      const manager = new Manager()
      const entity = new Entity(manager, 'myEntity')
      const component = new UUIDv4Component(manager, entity)

      expect([...manager.entities()]).toEqual([entity.identifier])
      expect([...manager.components()]).toEqual([component])
      expect([...manager.components(UUIDv4Component)]).toEqual([component])
    })
  })
})
