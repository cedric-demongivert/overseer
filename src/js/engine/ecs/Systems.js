import { System } from './System'

const SYSTEM_STATE = {
  DIRTY: 0,
  UPDATING: 1,
  UPDATED: 2
}

/**
* A system collection.
*/
export class Systems {
  /**
  * Create a new system collection for a given manager.
  *
  * @param {Manager} manager - The parent Entity Component System manager.
  */
  constructor (manager) {
    this._manager = manager
    this._systems = new Map()
    this._services = new Map()
    this._updating = false
    this._delta = 0
  }

  /**
  * @return {Manager} The parent Entity Component System manager.
  */
  get manager () {
    return this._manager
  }

  /**
  * @return {boolean} True if the current collection is currently updating.
  */
  get updating () {
    return this._updating
  }

  /**
  * Assert that this collection do not register a services two times.
  *
  * @param {System} system - The system to check.
  */
  _assertThatSystemServicesAreValid (system) {
    for (const service of System.services(system)) {
      if (this._services.has(service)) {
        throw new Error([
          'Unnable to register the given system into the manager ',
          `${this._manager} because the service ${service.name} provided by the `,
          'given system is already registered by another service of the ',
          'manager.'
        ].join(''))
      }
    }
  }

  /**
  * Add a system to this collection.
  *
  * @param {System} system - The system to register.
  *
  * @return {Systems} The current collection instance for chaining purpose.
  */
  add (system) {
    if (this._updating) {
      throw new Error(
        'Unnable to mutate a system collection during an update.'
      )
    }

    if (!this._systems.has(system)) {
      this._assertThatSystemServicesAreValid(system)

      this._systems.set(system, SYSTEM_STATE.UPDATED)
      for (const service of System.services(system)) {
        this._services.set(service, system)
      }

      system.attach(this._manager)
      system.initialize()
    }

    return this
  }

  /**
  * Delete a system of this manager.
  *
  * @param {System} system - A system to delete.
  *
  * @return {Systems} The current collection instance for chaining purpose.
  */
  delete (system) {
    if (this._updating) {
      throw new Error(
        'Unnable to mutate a system collection during an update.'
      )
    }

    if (this._systems.has(system)) {
      system.destroy()

      for (const service of System.services(system)) {
        this._services.delete(service)
      }
      this._systems.delete(system)
      system.detach()
    }

    return this
  }

  /**
  * @param {System} system - A system to fetch.
  *
  * @return {boolean} True if the given system exists in this collection.
  */
  has (system) {
    return this._systems.has(system)
  }

  /**
  * Update the current collection.
  *
  * @param {float} delta - The elapsed time in seconds.
  *
  * @return {Systems} The current collection instance for chaining purpose.
  */
  update (delta) {
    if (this._updating) {
      throw new Error(
        'Trying to update an updating system.'
      )
    } else {
      this._updating = true
      this._delta = delta
      for (const system of this._systems.keys()) {
        this._systems.set(system, SYSTEM_STATE.DIRTY)
      }

      for (const system of this._systems.keys()) {
        if (this._systems.get(system) === SYSTEM_STATE.DIRTY) {
          this._systems.set(system, SYSTEM_STATE.UPDATING)
          system.update(delta)
          this._systems.set(system, SYSTEM_STATE.UPDATED)
        }
      }
      this._updating = false
    }

    return this
  }

  /**
  * @param {Class} service - The service to fetch.
  *
  * @return {boolean} True if the given service is provided by a system of this collection.
  */
  hasService (service) {
    return this._services.has(service)
  }

  /**
  * Return a service from this collection.
  *
  * If the collection is into an update pass, the system that offer the
  * requested service may update before the others. Otherwise, the last
  * service instance will be returned.
  *
  * @param {Class} service - The service to get.
  *
  * @return {any} The service instance if any.
  */
  service (service) {
    if (!this._services.has(service)) {
      throw new Error([
        `Unnable to retrieve the service ${service.name} because it was `,
        'not currently provided by any system of this manager. Did you forgot ',
        'to register a system ?'
      ].join(''))
    }

    const system = this._services.get(service)

    if (this._updating) {
      switch (this._systems.get(system)) {
        case SYSTEM_STATE.UPDATING:
          throw new InvalidParameterError('service', service, [
            'Circular dependency detected.'
          ].join(''))
        case SYSTEM_STATE.DIRTY:
          this._systems.set(system, SYSTEM_STATE.UPDATING)
          system.update(delta)
          this._systems.set(system, SYSTEM_STATE.UPDATED)
        case SYSTEM_STATE.UPDATED:
      }
    }

    return system.getService(service)
  }

  /**
  * @return {Iterator<System>} An iterator over all systems of this collection.
  */
  * systems () {
    yield * this._systems.keys()
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Symbol/iterator
  */
  * [Symbol.iterator] () {
    yield * this._systems.keys()
  }
}
