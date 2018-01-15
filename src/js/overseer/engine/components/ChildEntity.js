import { Component, UUIDv4Component } from '@overseer/engine/ecs'

/**
* Allow to create a parent - child dependency between two entities.
*/
@Component.Type('overseer:ecs:child-entity')
export class ChildEntity extends UUIDv4Component {
  /**
  * @see Component#initialize
  */
  initialize () {
    return { parent: null }
  }
}
