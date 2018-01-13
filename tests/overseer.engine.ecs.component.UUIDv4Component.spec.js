/* eslint-env jest */

import {
  Manager, Entity, Component, UUIDv4Component
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

describe('overseer.engine.ecs.entity.UUIDv4Component', function () {
  describe('#constructor', function () {
    it('allow to create a component into a manager', function () {
      const manager = new Manager()
      const entity = new Entity(manager, 'myEntity')
      const component = new UUIDv4Component(manager, entity, MyType)

      expect([...manager.entities()]).toEqual([entity.identifier])
      expect([...manager.components()]).toEqual([component])
      expect([...manager.components(MyType)]).toEqual([component])
    })
  })
})
