import matrix2ub from './raw/matrix2ub'

export class Matrix2ub {
  /**
  * Create a new 2 by 2 unsigned byte matrix with initial content.
  *
  * @param {...number} content - Content of new 2 by 2 unsigned byte matrix in row-major order.
  *
  * @return {Matrix2ub} A new 2 by 2 unsigned byte matrix with the given initial content.
  */
  static create (
    a00, a10,
    a01, a11
  ) {
    const result = new Matrix2ub().set(
      a00, a10,
      a01, a11
    )
  }

  /**
  * Wrap a Uint8Array as a 2 by 2 unsigned byte matrix.
  *
  * @param {Uint8Array} buffer - A buffer to wrap.
  *
  * @return {Matrix2ub} A new 2 by 2 unsigned byte matrix that wrap the given buffer.
  */
  static wrap (buffer) {
    return new Matrix2ub(buffer)
  }

  /**
  * Clone a Uint8Array as a 2 by 2 unsigned byte matrix instance and return the result.
  *
  * @param {Matrix2ub} toClone - A 2 by 2 unsigned byte matrix instance to clone.
  *
  * @return {Matrix2ub} A new 2 by 2 unsigned byte matrix that wrap the given buffer.
  */
  static clone (toClone) {
    const result = new Matrix2ub()

    result.a00 = toCopy.a00
    result.a10 = toCopy.a10
    result.a01 = toCopy.a01
    result.a11 = toCopy.a11
    
    return result
  }

  /**
  * Wrap a Uint8Array as a 2 by 2 matrix.
  *
  * @param {Uint8Array} [buffer = new Uint8Array(4)] - A buffer to wrap.
  */
  constructor (buffer = new Uint8Array(4)) {
    this._buffer = buffer
  }

  /**
  * @return {number} The number of columns of this matrix.
  */
  get columns () {
    return 2
  }

  /**
  * @return {number} The number of rows of this matrix.
  */
  get rows () {
    return 2
  }

  /**
  * @return {number} The number of cells of this matrix.
  */
  get cells () {
    return 4
  }

  /**
  * @return {Uint8Array} The underlying buffer of this matrix.
  */
  get buffer () {
    return this._buffer
  }

  /**
  * @return {number} The determinant of this matrix.
  */
  get determinant () {
    return matrix2ub.determinant(this._buffer, 0)
  }
  
  /**
  * Return the value of the cell at the column 0 and row 0.
  *
  * @return {number} return the value of the cell at the column 0 and row 0.
  */
  get a00 () {
    return this._buffer[0]
  }

  /**
  * Update the value of the cell at the column 0 and row 0.
  *
  * @param {number} value - The new value of the cell at the column 0 and row 0.
  */
  set a00 (value) {
    this._buffer[0] = value
  }
  
  /**
  * Return the value of the cell at the column 1 and row 0.
  *
  * @return {number} return the value of the cell at the column 1 and row 0.
  */
  get a10 () {
    return this._buffer[1]
  }

  /**
  * Update the value of the cell at the column 1 and row 0.
  *
  * @param {number} value - The new value of the cell at the column 1 and row 0.
  */
  set a10 (value) {
    this._buffer[1] = value
  }
  
  /**
  * Return the value of the cell at the column 0 and row 1.
  *
  * @return {number} return the value of the cell at the column 0 and row 1.
  */
  get a01 () {
    return this._buffer[2]
  }

  /**
  * Update the value of the cell at the column 0 and row 1.
  *
  * @param {number} value - The new value of the cell at the column 0 and row 1.
  */
  set a01 (value) {
    this._buffer[2] = value
  }
  
  /**
  * Return the value of the cell at the column 1 and row 1.
  *
  * @return {number} return the value of the cell at the column 1 and row 1.
  */
  get a11 () {
    return this._buffer[3]
  }

  /**
  * Update the value of the cell at the column 1 and row 1.
  *
  * @param {number} value - The new value of the cell at the column 1 and row 1.
  */
  set a11 (value) {
    this._buffer[3] = value
  }
  
  /**
  * Set the content of a cell of this matrix.
  *
  * @param {number} column - Column of the cell to set.
  * @param {number} row - Row of the cell to set.
  * @param {number} value - Value to set.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  setCell (column, row, value) {
    this._buffer[2 * row + column] = value
    return this
  }

  /**
  * Get the content of a cell of this matrix.
  *
  * @param {number} column - Column of the cell to get.
  * @param {number} row - Row of the cell to get.
  *
  * @return {number} The value of the given cell.
  */
  getCell (column, row) {
    return this._buffer[2 * row + column]
  }

  /**
  * Set this matrix content.
  *
  * @param {...number} content - New content of this 2 by 2 unsigned byte matrix in row-major order.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  set (
    a00, a10,
    a01, a11
  ) {
    matrix2ub.set(
      this._buffer, 0,
      a00, a10,
      a01, a11
    )
    return this
  }

  /**
  * Copy another matrix content.
  *
  * @param {Matrix2ub} toCopy - Matrix instance to copy.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  copy (toCopy) {
    matrix2ub.copy(toCopy.buffer, 0, this._buffer, 0)
    return this
  }

  /**
  * Fill this matrix with a particular value.
  *
  * @param {number} value - Value to use for filling this matrix.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  fill (value) {
    matrix2ub.fill(this._buffer, 0, value)
    return this
  }

  /**
  * Transpose this matrix.
  *
  * @param {Matrix2ub} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  transpose (result = this) {
    matrix2ub.transpose(this._buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Invert this matrix.
  *
  * @param {Matrix2ub} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  invert (result = this) {
    matrix2ub.invert(this._buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Negate this matrix.
  *
  * @param {Matrix2ub} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  negate (result = this) {
    matrix2ub.negate(this._buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Multiply this matrix with another one.
  *
  * @param {Matrix2ub} left - Left operand matrix.
  * @param {Matrix2ub} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  multiplyWithMatrix (left, result = this) {
    matrix2ub.multiplyWithMatrix(this._buffer, 0, left.buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Multiply this matrix with a static one, this matrix will be used as right operand.
  *
  * @param {number} a00 - Value of the cell of the column 0 and row 0 of the static matrix.
  * @param {number} a10 - Value of the cell of the column 1 and row 0 of the static matrix.
  * @param {number} a01 - Value of the cell of the column 0 and row 1 of the static matrix.
  * @param {number} a11 - Value of the cell of the column 1 and row 1 of the static matrix.
  ,
  * @param {Matrix2ub} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  multiplyWithStaticMatrixAsRightOperand (
    a00, a10,
    a01, a11
    result = this
  ) {
    matrix2ub.multiplyWithStaticMatrixAsRightOperand(
      this._buffer, 0,
      a00, a10,
      a01, a11
      result.buffer, 0
    )
    return this
  }

  /**
  * Multiply this matrix with a static one, this matrix will be used as a left operand.
  *
  * @param {number} a00 - Value of the cell of the column 0 and row 0 of the static matrix.
  * @param {number} a10 - Value of the cell of the column 1 and row 0 of the static matrix.
  * @param {number} a01 - Value of the cell of the column 0 and row 1 of the static matrix.
  * @param {number} a11 - Value of the cell of the column 1 and row 1 of the static matrix.
  ,
  * @param {Matrix2ub} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  multiplyWithStaticMatrixAsLeftOperand (
    a00, a10,
    a01, a11
    result = this
  ) {
    matrix2ub.multiplyWithStaticMatrixAsLeftOperand(
      this._buffer, 0,
      a00, a10,
      a01, a11
      result.buffer, 0
    )
    return this
  }

  /**
  * Multiply this matrix with a vector.
  *
  * @param {Vector2ub} left - Left operand vector.
  * @param {Vector2ub} [result = left] - Vector to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  multiplyWithVector (left, result = left) {
    matrix2ub.multiplyWithVector(this._buffer, 0, left.buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Multiply this matrix with a scalar.
  *
  * @param {number} scalar - Scalar to use for the multiplication.
  * @param {Matrix2ub} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  multiplyWithScalar (scalar, result = this) {
    matrix2ub.multiplyWithScalar(this._buffer, 0, scalar, result.buffer, 0)
    return this
  }

  /**
  * Divide this matrix by a scalar.
  *
  * @param {number} scalar - Scalar to use for the division.
  * @param {Matrix2ub} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  divideWithScalar (scalar, result = this) {
    matrix2ub.divideWithScalar(this._buffer, 0, scalar, result.buffer, 0)
    return this
  }

  /**
  * Multiply this matrix with a scale matrix of the same order.
  *
  * @param {number} x - Scale factor of the x axis.
  * @param {number} y - Scale factor of the y axis.
  * @param {Matrix2ub} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  scale (
    x, y,
    result = this
  ) {
    matrix2ub.scale(
      this._buffer, 0,
      x, y,
      result.buffer, 0
    )
    return this
  }

  /**
  * Multiply this matrix with a 2 dimensional rotation matrix.
  *
  * @param {number} x - Rotation for the x axis in radians.
  * @param {number} y - Rotation for the y axis in radians.
  * @param {Matrix2ub} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  rotate (
    x, y,
    result = this
  ) {
    matrix2ub.rotate(
      this._buffer, 0,
      x, y,
      result.buffer, 0
    )
    return this
  }

  /**
  * Multiply this matrix with a translation matrix of the same order.
  *
  * @param {number} x - Translation to apply to the x axis.
  * @param {Matrix2ub} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  translate (
    x,
    result = this
  ) {
    matrix2ub.translate(
      this._buffer, 0,
      x,
      result.buffer, 0
    )
    return this
  }

  /**
  * Add another matrix to this matrix.
  *
  * @param {Matrix2ub} left - Left operand matrix.
  * @param {Matrix2ub} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  add (left, result = this) {
    matrix2ub.add(this._buffer, 0, left.buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Subtract another matrix to this matrix.
  *
  * @param {Matrix2ub} left - Left operand matrix.
  * @param {Matrix2ub} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  subtract (left, result = this) {
    matrix2ub.subtract(this._buffer, 0, left.buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Transform this matrix into an identity matrix.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  toIdentity () {
    matrix2ub.toIdentity(this._buffer, 0)
    return this
  }

  /**
  * Transform this matrix into a scale matrix of the same order.
  *
  * @param {number} x - Scale factor of the x axis.
  * @param {number} y - Scale factor of the y axis.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  toScale (x, y) {
    matrix2ub.toScale(this._buffer, 0, x, y)
    return this
  }

  /**
  * Transform this matrix into a 2 dimensional rotation matrix.
  *
  * @param {number} x - Rotation for the x axis in radians.
  * @param {number} y - Rotation for the y axis in radians.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  toRotation (x, y) {
    matrix2ub.toRotation(this._buffer, 0, x, y)
    return this
  }

  /**
  * Transform this matrix into a translation matrix of the same order.
  *
  * @param {number} x - Translation to apply to the x axis.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  toTranslation (x) {
    matrix2ub.toTranslation(this._buffer, 0, x)
    return this
  }

  /**
  * Extract a scale vector from this matrix.
  *
  * @param {Vector2ub} result - Vector to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  extractScale (result) {
    matrix2ub.extractScale(this._buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Extract a translation vector from this matrix.
  *
  * @param {Vector2ub} result - Vector to use for writing the result of this operation.
  *
  * @return {Matrix2ub} The updated instance of this matrix for chaining purpose.
  */
  extractTranslation (result) {
    matrix2ub.extractTranslation(this._buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Extract a 2 dimensional rotation angle from this matrix.
  *
  * @return {number} The result of the extraction.
  */
  extract2DRotation () {
    return matrix2ub.extract2DRotation(this._buffer, 0)
  }

  /**
  * Iterate over each components of this matrix in row-major order.
  *
  * @return {Iterator<number>} An iterator over each components of this matrix in row-major order.
  */
  * [Symbol.iterator] () {
    yield this._buffer[0]
    yield this._buffer[1]
    yield this._buffer[2]
    yield this._buffer[3]
  }

  /**
  * Return true if this matrix is equals to another one.
  *
  * @param {Matrix2ub} other - Matrix instance to use for comparison.
  * @param {number} [tolerance = Number.EPSILON] - Tolerance to use for the equality comparison.
  *
  * @return {boolean} True if this matrix is equals to the other.
  */
  equals (other, tolerance = Number.EPSILON) {
    return matrix2ub.equals(
      this._buffer, 0,
      other.buffer, 0,
      tolerance
    )
  }

  /**
  * Return a string representation of this matrix.
  *
  * @return {string} A string representation of this matrix.
  */
  toString () {
    return matrix2ub.toString(this._buffer, 0)
  }
}