import { Matrix } from '@glkit/math/matrix/Matrix'

import { toString } from './common'

export class Vector extends Matrix {
  constructor (type, dimension) {
    super(type, 1, dimension)
    this._transposed = false
  }

  get columns () {
    return (this._transposed) ? super.rows : super.columns
  }

  get rows () {
    return (this._transposed) ? super.columns : super.rows
  }

  get dimension () {
    return super.rows
  }

  toString () {
    return toString(this)
  }
}
