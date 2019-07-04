export class Label {
  constructor () {
    this._label = null
  }

  reset () {
    this._label = null
  }

  copy (other) {
    this._label = other.label
  }

  get label () {
    return this._label
  }

  get () {
    return this._label
  }

  set label (label) {
    this._label = label
  }

  set (label) {
    this._label = label
  }
}
