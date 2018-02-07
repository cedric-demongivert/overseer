class DestroyedComponentError extends Error {
  /**
  * @param {object} configuration - The error configuration.
  */
  constructor ({ manager, component, entity }) {
    super([
      `Unnable to access to the component ${component} of the entity `,
      `${entity}, previously registered into the manager `,
      `${manager.identifier} because the component ${component} was `,
      'destroyed and is currently innacessible.'
    ].join(''))
    this._manager = manager
    this._entity = entity
    this._component = component
    Error.captureStackTrace(this, DestroyedComponentError)
  }

  /**
  * @return {Manager} The Entity-Component-System manager which the component was registered into.
  */
  get manager () {
    return this._manager
  }

  /**
  * @return {Identifier} The identifier of the component that the user tried to access to.
  */
  get component () {
    return this._component
  }

  /**
  * @return {Identifier} The destroyed component's parent entity identifier.
  */
  get entity () {
    return this._identifier
  }
}

export const ComponentHandler = {
  defineProperty (target) {
    if (!target.destroyed) {
      return Reflect.defineProperty(...arguments)
    } else {
      throw new DestroyedComponentError({
        component: target.identifier,
        entity: target.entity,
        manager: target.manager
      })
    }
  },

  deleteProperty (target) {
    if (!target.destroyed) {
      return Reflect.deleteProperty(...arguments)
    } else {
      throw new DestroyedComponentError({
        component: target.identifier,
        entity: target.entity,
        manager: target.manager
      })
    }
  },

  get (target) {
    if (!target.destroyed) {
      return Reflect.get(...arguments)
    } else {
      throw new DestroyedComponentError({
        component: target.identifier,
        entity: target.entity,
        manager: target.manager
      })
    }
  },

  getOwnPropertyDescriptor (target) {
    if (!target.destroyed) {
      return Reflect.getOwnPropertyDescriptor(...arguments)
    } else {
      throw new DestroyedComponentError({
        component: target.identifier,
        entity: target.entity,
        manager: target.manager
      })
    }
  },

  getPrototypeOf (target) {
    if (!target.destroyed) {
      return Reflect.getPrototypeOf(...arguments)
    } else {
      throw new DestroyedComponentError({
        component: target.identifier,
        entity: target.entity,
        manager: target.manager
      })
    }
  },

  has (target) {
    if (!target.destroyed) {
      return Reflect.has(...arguments)
    } else {
      throw new DestroyedComponentError({
        component: target.identifier,
        entity: target.entity,
        manager: target.manager
      })
    }
  },

  isExtensible (target) {
    if (!target.destroyed) {
      return Reflect.isExtensible(...arguments)
    } else {
      throw new DestroyedComponentError({
        component: target.identifier,
        entity: target.entity,
        manager: target.manager
      })
    }
  },

  ownKeys (target) {
    if (!target.destroyed) {
      return Reflect.ownKeys(...arguments)
    } else {
      throw new DestroyedComponentError({
        component: target.identifier,
        entity: target.entity,
        manager: target.manager
      })
    }
  },

  preventExtensions (target) {
    if (!target.destroyed) {
      return Reflect.preventExtensions(...arguments)
    } else {
      throw new DestroyedComponentError({
        component: target.identifier,
        entity: target.entity,
        manager: target.manager
      })
    }
  },

  set (target) {
    if (!target.destroyed) {
      return Reflect.set(...arguments)
    } else {
      throw new DestroyedComponentError({
        component: target.identifier,
        entity: target.entity,
        manager: target.manager
      })
    }
  },

  setPrototypeOf (target) {
    if (!target.destroyed) {
      return Reflect.setPrototypeOf(...arguments)
    } else {
      throw new DestroyedComponentError({
        component: target.identifier,
        entity: target.entity,
        manager: target.manager
      })
    }
  },
}
