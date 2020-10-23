import { Entity } from '@cedric-demongivert/gl-tool-ecs'

import { Hierarchy } from '../components/Hierarchy'
import { HierarchyType } from '../types/HierarchyType'

import { OverseerSystem } from './OverseerSystem'

const EMPTY_CHILDREN : Set<Entity> = new Set<Entity>()

/**
* A system that allows to manipulate entities hierarchies.
*/
export class HierarchyManagementSystem extends OverseerSystem {
  /**
  * Return the parent entity of a given entity, if any.
  *
  * @param entity - An entity from wich returning the parent.
  *
  * @return The parent entity of the given entity, or undefined if the given entity does not have a parent.
  */
  public getParent (entity : Entity) : Entity {
    if (this.manager.hasComponent(entity, HierarchyType)) {
      return this.manager.getComponent(entity, HierarchyType).data.parent
    } else {
      return undefined
    }
  }

  /**
  * Update the parent entity of a given entity.
  *
  * @param child - Entity to mutate.
  * @param parent - New parent of the entity to mutate.
  */
  public setParent (child : Entity, parent : Entity) : void {
    let childHierarchy : Hierarchy

    if (this.manager.hasComponent(child, HierarchyType)) {
      childHierarchy = this.manager.getComponent(child, HierarchyType).data
    } else {
      childHierarchy = this.manager.createComponent(child, HierarchyType).data
    }

    if (childHierarchy.parent != undefined) {
      this.manager.getComponent(childHierarchy.parent, HierarchyType)
          .data.children.delete(childHierarchy.parent)
    }

    childHierarchy.parent = parent

    if (parent != null) {
      let parentHierarchy : Hierarchy

      if (this.manager.hasComponent(parent, HierarchyType)) {
        parentHierarchy = this.manager.getComponent(parent, HierarchyType).data
      } else {
        parentHierarchy = this.manager.createComponent(parent, HierarchyType).data
      }

      parentHierarchy.children.add(child)
    }
  }

  /**
  * Update the given entity by attaching to it a new child entity.
  *
  * @param parent - Entity to mutate.
  * @param child  - New child to add to the entity to mutate.
  */
  public addChild (parent : Entity, child : Entity) : void {
    this.setParent(child, parent)
  }

  /**
  * Update the given entity by detaching it from it's parent.
  *
  * @param child - A child to detach from it's parent.
  */
  public detachChild (child : Entity) : void {
    this.setParent(child, null)
  }

  /**
  * Update the given entity by detaching all it's child entity.
  *
  * @param parent - An entity to mutate.
  */
  public detachAllChildren (parent : Entity) : void {
    for (const child of this.children(parent)) {
      this.setParent(child, null)
    }
  }

  /**
  * Clear all hierarchy information of the given entity.
  *
  * @param entity - An entity to clear.
  */
  public clear (entity : Entity) : void {
    if (this.manager.hasComponent(entity, HierarchyType)) {
      this.setParent(entity, null)

      for (const child of this.children(entity)) {
        this.setParent(child, null)
      }
    }
  }

  /**
  * Return all children of the given entity.
  *
  * @param entity - An entity from wich getting the children.
  *
  * @return All children of the given entity.
  */
  public getChildren (entity : Entity) : Set<Entity> {
    if (this.manager.hasComponent(entity, HierarchyType)) {
      return this.manager.getComponent(entity, HierarchyType).data.children
    } else {
      return EMPTY_CHILDREN
    }
  }

  /**
  * Return true if the given does not have a parent entity.
  *
  * @param entity - An entity to assess.
  *
  * @return True if the given entity does not have a parent entity.
  */
  public isRoot (entity : Entity) : boolean {
    return this.getParent(entity) == undefined
  }

  /**
  * Return the depth of the given entity into it's hierarchy.
  *
  * @param entity - An entity to check.
  *
  * @return The depth of the entity into it's hierarchy.
  */
  public getDepth (entity : Entity) : number {
    let parent : Entity = this.getParent(entity)
    let depth : number = 0

    while (parent != null) {
      parent = this.getParent(parent)
      depth += 1
    }

    return depth
  }

  /**
  * Return an iterator over each children of the given entity.
  *
  * @param entity - An entity.
  *
  * @return An iterator over each children of the given entity.
  */
  public * children (entity : Entity) : Iterable<Entity> {
    yield * this.getChildren(entity)
  }

  /**
  * Return an iterator over each parent of the given entity.
  *
  * @param entity - An entity.
  *
  * @return An iterator over each parent of the given entity.
  */
  public * parents (entity : Entity) : Iterable<Entity> {
    let parent : Entity = this.getParent(entity)

    while (parent != null) {
      yield parent
      parent = this.getParent(parent)
    }
  }
}
