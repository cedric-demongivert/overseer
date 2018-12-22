import { Entity } from './Entity'

/**
* A factory that can create entities for a given entity component system
*/
export class EntityFactory {
  constructor (manager) {
    this._manager = manager
    this._nextEntity = 0
  }

  create () {
    while (this._manager.hasEntity(this._nextEntity)) {
      this._nextEntity += 1
    }

    return new Entity(this._manager, this._nextEntity)
  }
}
