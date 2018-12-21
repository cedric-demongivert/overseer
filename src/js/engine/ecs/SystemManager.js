/**
* A collection of systems.
*/
export class SystemManager {
  /**
  * Create a new empty system manager.
  */
  constructor () {
    this._systems = []
  }

  get systems () {
    return this._systems
  }

  /**
  * Register a new system into this manager.
  *
  * @param {System} system - A system to attach.
  *
  * @return {SystemManager} The current instance for chaining purposes.
  */
  add (system) {
    if (!this.has(system)) {
      this._systems.push(system)
    }

    return this
  }

  /**
  * Remove a system from this manager.
  *
  * @param {System} system - A system to detach.
  *
  * @return {SystemManager} The current instance for chaining purposes.
  */
  delete (system) {
    if (this.has(system)) {
      this._systems.splice(this._systems.indexOf(system), 1)
    }

    return this
  }

  /**
  * Returns true if this manager manage the given system.
  *
  * @param {System} system - A system to find.
  *
  * @return {boolean} True if the given system is managed by this manager.
  */
  has (system) {
    return this._systems.indexOf(system) >= 0
  }

  /**
  * Remove all registered systems from this manager.
  *
  * @return {SystemManager} The current instance for chaining purposes.
  */
  clear () {
    this._systems = []
    return this
  }
}
