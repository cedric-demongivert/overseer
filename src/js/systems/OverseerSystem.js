import { System } from '@cedric-demongivert/gl-tool-ecs'

export class OverseerSystem extends System {
  /**
  * Require another system from the parent manager.
  *
  * @param {function} type - The type of system to require.
  */
  require (type) {
    const systems = this.manager.systems

    for (let index = 0, size = systems.size; index < size; ++index) {
      const system = systems.get(index)

      if (system instanceof type) return system
    }

    throw new Error([
      'Requirement not fullfiled : unable to find a ', type.name,
      ' system into this entity-component-system.'
    ].join(''))
  }
}
