import { Component } from '@overseer/engine/ecs'

/**
* Allow to create a parent - child dependency between two entities.
*/
@Component({ type: 'overseer:ecs:child-entity' })
export class ChildEntity {
  /**
  * @see Component#initialize
  */
  initialize () {
    this.state = { parent: null }
  }
}
