export class Layer {
  /**
  * Create a new layer component that store the object into the zero layer.
  */
  constructor () {
    this._value = 0
  }

  /**
  * Reset this component to its initial state.
  */
  reset () {
    this._value = 0
  }

  /**
  * Copy another component state.
  *
  * @param {Layer} other - Another component state to copy.
  */
  copy (other) {
    this._value = other.value
  }

  /**
  * @return {number} The layer that contains this object.
  */
  get value () {
    return this._value
  }

  /**
  * Update the layer that contains this object.
  *
  * @param {number} value - The new layer that contains this object.
  */
  set value (value) {
    this._value = value
  }

  /**
  * @return {number} The layer that contains this object.
  */
  get () {
    return this._value
  }

  /**
  * Update the layer that contains this object.
  *
  * @param {number} value - The new layer that contains this object.
  */
  set (value) {
    this._value = value
  }
}
