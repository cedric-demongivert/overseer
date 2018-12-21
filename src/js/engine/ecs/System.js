/**
* An engine system.
*/
export class System {
  /**
  * Create a new empty system.
  */
  constructor () {
    this._manager = null
  }

  /**
  * Return the manager of this system.
  *
  * @return {EntityComponentSystem} The manager of this system.
  */
  get manager () {
    return this._manager
  }

  /**
  * Called when the system is attached to a manager in order to initialize it.
  */
  initialize () { }

  /**
  * Called when the parent entity manager will add an entity.
  *
  * @param {number} entity - The identifier of the entity to add.
  */
  managerWillAddEntity (entity) { }

  /**
  * Called when the parent entity manager did add an entity.
  *
  * @param {number} entity - The identifier of the added entity.
  */
  managerDidAddEntity (entity) { }

  /**
  * Called when the parent manager will delete an entity.
  *
  * @param {number} entity - The identifier of the entity that will be deleted.
  */
  managerWillDeleteEntity (entity) { }

  /**
  * Called when the parent manager did delete an entity.
  *
  * @param {number} entity - The identifier of the entity that was deleted.
  */
  managerDidDeleteEntity (entity) { }

  /**
  * Called when the parent manager will add a component.
  *
  * @param {any} component - The component that will be added.
  */
  managerWillAddComponent (component) {}

  /**
  * Called when the parent manager did add a component.
  *
  * @param {any} component - The component that was added.
  */
  managerDidAddComponent (component) {}

  /**
  * Called when the parent manager will delete a component.
  *
  * @param {any} component - The component that will be deleted.
  */
  managerWillDeleteComponent (component) {}

  /**
  * Called when the parent manager did delete a component.
  *
  * @param {any} component - The component that was deleted.
  */
  managerDidDeleteComponent (component) {}

  /**
  * Called when the manager will update all its systems.
  *
  * @param {number} delta - The number of seconds between the last update and the current update.
  */
  managerWillUpdate (delta) { }

  /**
  * Update this system.
  *
  * @param {number} delta - The number of seconds between the last update and the current update.
  */
  update (delta) { }

  /**
  * Called when the manager did update all its systems.
  *
  * @param {number} delta - The number of seconds between the last update and the current update.
  */
  managerDidUpdate (delta) { }

  /**
  * Called when this system will be detached of its manager in order to release
  * all of its ressources.
  */
  destroy () { }

  /**
  * Attach this system to a manager.
  *
  * @param {EntityComponentSystem} manager - The future parent manager.
  *
  * @return {System} The current system instance for chaining purpose.
  */
  attach (manager) {
    if (this._manager !== manager) {
      if (this._manager) this.detach()

      this._manager = manager
      this._manager.addSystem(this)
    }

    return this
  }

  /**
  * Detach this system of its manager.
  *
  * @return {System} The current system instance for chaining purpose.
  */
  detach () {
    if (this._manager != null) {
      if (this._manager.hasSystem(this)) {
        const oldManager = this._manager
        this._manager = null
        oldManager.deleteSystem(this)
      }
    }

    return this
  }
}
