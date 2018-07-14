export class Program {
  constructor (vertex, fragment) {
    this._vertex = vertex
    this._fragment = fragment
  }

  get vertex () {
    return this._vertex
  }

  get fragment () {
    return this._fragment
  }
}
