import { Component } from '@overseer/engine/ecs'

/**
* Allow to create a parent - child dependency between two entities.
*/
@Component.Type('overseer:ecs:child-entity')
export class ChildEntity {
  /**
  * Create a new empty child entity component.
  */
  constructor () {
    this.state = { parent: null }
  }
}
