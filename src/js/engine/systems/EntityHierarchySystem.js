import { System } from '@overseer/engine/ecs'
import { ChildEntity } from '@overseer/engine/components'

/**
* A system that manage entity parent - children dependencies via the
* ChildEntity component.
*/
export class EntityHierarchySystem extends System {
  /**
  * @see System#managerWillDeleteEntity
  */
  managerWillDeleteEntity (entity) {
    if (this._manager.hasComponent(entity, ChildEntity)) {
      const parent = this._manager.getComponent(entity, ChildEntity)
                                  .get('parent')

      if (parent) this._manager.deleteEntity(parent)
    }
  }
}
