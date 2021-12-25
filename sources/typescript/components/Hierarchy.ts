import { Entity } from '@cedric-demongivert/gl-tool-ecs'

/**
 * 
 */
export class Hierarchy {
  /**
   * 
   */
  public parent: Entity

  /**
   * 
   */
  public readonly children: Set<Entity>

  /**
  * Create a new hierarchy.
  */
  public constructor() {
    this.parent = undefined
    this.children = new Set<Entity>()
  }

  /**
  * Reset this component to its initial state.
  */
  public clear(): void {
    this.parent = undefined
    this.children.clear()
  }

  /**
  * @see Object.equals
  */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Hierarchy) {
      if (this.parent !== other.parent || this.children.size !== other.children.size) {
        return false
      }

      for (const child of this.children) {
        if (!other.children.has(child)) {
          return false
        }
      }

      return true
    }

    return false
  }
}
