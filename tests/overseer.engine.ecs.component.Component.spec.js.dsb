/* eslint-env jest */

import {
  Manager, Entity, Component
} from '@overseer/engine/ecs'

describe('@overseer.engine.ecs.component.Component', function () {
  @Component({ type: 'component' })
  class MyComponent { }

  it('is a mixin that add component utilities to any class', function () {
    class Test {}
    expect(Component.is(Test)).toBeFalsy()
    expect(Component.typeof(Test)).toBeUndefined()
    expect(Component.constructorIdentifier(Test)).toBeUndefined()

    const TestComponent = Component({
      type: 'component', constructorIdentifier: 'id'
    })(Test)
    expect(Component.is(TestComponent)).toBeTruthy()
    expect(Component.typeof(TestComponent)).toBe('component')
    expect(Component.constructorIdentifier(TestComponent)).toBe('id')

    const manager = new Manager()
    const entity = new Entity(manager)
    const instance = new TestComponent(manager, entity)

    expect(instance).toBeInstanceOf(Test)
    expect(Component.is(instance)).toBeTruthy()
  })

  it('revoke the access of the component when the component is destroyed', function () {
    const manager = new Manager()
    const entity = new Entity(manager)
    const instance = new MyComponent(manager, entity)

    expect(_ => instance.version).not.toThrow()

    manager.deleteComponent(instance)

    expect(_ => instance.version).toThrow()
  })
})
