import matrix4i from './raw/matrix4i'

export class Matrix4i {
  /**
  * Create a new 4 by 4 integer matrix with initial content.
  *
  * @param {...number} content - Content of new 4 by 4 integer matrix in row-major order.
  *
  * @return {Matrix4i} A new 4 by 4 integer matrix with the given initial content.
  */
  static create (
    a00, a10, a20, a30,
    a01, a11, a21, a31,
    a02, a12, a22, a32,
    a03, a13, a23, a33
  ) {
    const result = new Matrix4i().set(
      a00, a10, a20, a30,
      a01, a11, a21, a31,
      a02, a12, a22, a32,
      a03, a13, a23, a33
    )
  }

  /**
  * Wrap a Int32Array as a 4 by 4 integer matrix.
  *
  * @param {Int32Array} buffer - A buffer to wrap.
  *
  * @return {Matrix4i} A new 4 by 4 integer matrix that wrap the given buffer.
  */
  static wrap (buffer) {
    return new Matrix4i(buffer)
  }

  /**
  * Clone a Int32Array as a 4 by 4 integer matrix instance and return the result.
  *
  * @param {Matrix4i} toClone - A 4 by 4 integer matrix instance to clone.
  *
  * @return {Matrix4i} A new 4 by 4 integer matrix that wrap the given buffer.
  */
  static clone (toClone) {
    const result = new Matrix4i()

    result.a00 = toCopy.a00
    result.a10 = toCopy.a10
    result.a20 = toCopy.a20
    result.a30 = toCopy.a30
    result.a01 = toCopy.a01
    result.a11 = toCopy.a11
    result.a21 = toCopy.a21
    result.a31 = toCopy.a31
    result.a02 = toCopy.a02
    result.a12 = toCopy.a12
    result.a22 = toCopy.a22
    result.a32 = toCopy.a32
    result.a03 = toCopy.a03
    result.a13 = toCopy.a13
    result.a23 = toCopy.a23
    result.a33 = toCopy.a33
    
    return result
  }

  /**
  * Wrap a Int32Array as a 4 by 4 matrix.
  *
  * @param {Int32Array} [buffer = new Int32Array(16)] - A buffer to wrap.
  */
  constructor (buffer = new Int32Array(16)) {
    this._buffer = buffer
  }

  /**
  * @return {number} The number of columns of this matrix.
  */
  get columns () {
    return 4
  }

  /**
  * @return {number} The number of rows of this matrix.
  */
  get rows () {
    return 4
  }

  /**
  * @return {number} The number of cells of this matrix.
  */
  get cells () {
    return 16
  }

  /**
  * @return {Int32Array} The underlying buffer of this matrix.
  */
  get buffer () {
    return this._buffer
  }

  /**
  * @return {number} The determinant of this matrix.
  */
  get determinant () {
    return matrix4i.determinant(this._buffer, 0)
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
  * Return the value of the cell at the column 2 and row 0.
  *
  * @return {number} return the value of the cell at the column 2 and row 0.
  */
  get a20 () {
    return this._buffer[2]
  }

  /**
  * Update the value of the cell at the column 2 and row 0.
  *
  * @param {number} value - The new value of the cell at the column 2 and row 0.
  */
  set a20 (value) {
    this._buffer[2] = value
  }
  
  /**
  * Return the value of the cell at the column 3 and row 0.
  *
  * @return {number} return the value of the cell at the column 3 and row 0.
  */
  get a30 () {
    return this._buffer[3]
  }

  /**
  * Update the value of the cell at the column 3 and row 0.
  *
  * @param {number} value - The new value of the cell at the column 3 and row 0.
  */
  set a30 (value) {
    this._buffer[3] = value
  }
  
  /**
  * Return the value of the cell at the column 0 and row 1.
  *
  * @return {number} return the value of the cell at the column 0 and row 1.
  */
  get a01 () {
    return this._buffer[4]
  }

  /**
  * Update the value of the cell at the column 0 and row 1.
  *
  * @param {number} value - The new value of the cell at the column 0 and row 1.
  */
  set a01 (value) {
    this._buffer[4] = value
  }
  
  /**
  * Return the value of the cell at the column 1 and row 1.
  *
  * @return {number} return the value of the cell at the column 1 and row 1.
  */
  get a11 () {
    return this._buffer[5]
  }

  /**
  * Update the value of the cell at the column 1 and row 1.
  *
  * @param {number} value - The new value of the cell at the column 1 and row 1.
  */
  set a11 (value) {
    this._buffer[5] = value
  }
  
  /**
  * Return the value of the cell at the column 2 and row 1.
  *
  * @return {number} return the value of the cell at the column 2 and row 1.
  */
  get a21 () {
    return this._buffer[6]
  }

  /**
  * Update the value of the cell at the column 2 and row 1.
  *
  * @param {number} value - The new value of the cell at the column 2 and row 1.
  */
  set a21 (value) {
    this._buffer[6] = value
  }
  
  /**
  * Return the value of the cell at the column 3 and row 1.
  *
  * @return {number} return the value of the cell at the column 3 and row 1.
  */
  get a31 () {
    return this._buffer[7]
  }

  /**
  * Update the value of the cell at the column 3 and row 1.
  *
  * @param {number} value - The new value of the cell at the column 3 and row 1.
  */
  set a31 (value) {
    this._buffer[7] = value
  }
  
  /**
  * Return the value of the cell at the column 0 and row 2.
  *
  * @return {number} return the value of the cell at the column 0 and row 2.
  */
  get a02 () {
    return this._buffer[8]
  }

  /**
  * Update the value of the cell at the column 0 and row 2.
  *
  * @param {number} value - The new value of the cell at the column 0 and row 2.
  */
  set a02 (value) {
    this._buffer[8] = value
  }
  
  /**
  * Return the value of the cell at the column 1 and row 2.
  *
  * @return {number} return the value of the cell at the column 1 and row 2.
  */
  get a12 () {
    return this._buffer[9]
  }

  /**
  * Update the value of the cell at the column 1 and row 2.
  *
  * @param {number} value - The new value of the cell at the column 1 and row 2.
  */
  set a12 (value) {
    this._buffer[9] = value
  }
  
  /**
  * Return the value of the cell at the column 2 and row 2.
  *
  * @return {number} return the value of the cell at the column 2 and row 2.
  */
  get a22 () {
    return this._buffer[10]
  }

  /**
  * Update the value of the cell at the column 2 and row 2.
  *
  * @param {number} value - The new value of the cell at the column 2 and row 2.
  */
  set a22 (value) {
    this._buffer[10] = value
  }
  
  /**
  * Return the value of the cell at the column 3 and row 2.
  *
  * @return {number} return the value of the cell at the column 3 and row 2.
  */
  get a32 () {
    return this._buffer[11]
  }

  /**
  * Update the value of the cell at the column 3 and row 2.
  *
  * @param {number} value - The new value of the cell at the column 3 and row 2.
  */
  set a32 (value) {
    this._buffer[11] = value
  }
  
  /**
  * Return the value of the cell at the column 0 and row 3.
  *
  * @return {number} return the value of the cell at the column 0 and row 3.
  */
  get a03 () {
    return this._buffer[12]
  }

  /**
  * Update the value of the cell at the column 0 and row 3.
  *
  * @param {number} value - The new value of the cell at the column 0 and row 3.
  */
  set a03 (value) {
    this._buffer[12] = value
  }
  
  /**
  * Return the value of the cell at the column 1 and row 3.
  *
  * @return {number} return the value of the cell at the column 1 and row 3.
  */
  get a13 () {
    return this._buffer[13]
  }

  /**
  * Update the value of the cell at the column 1 and row 3.
  *
  * @param {number} value - The new value of the cell at the column 1 and row 3.
  */
  set a13 (value) {
    this._buffer[13] = value
  }
  
  /**
  * Return the value of the cell at the column 2 and row 3.
  *
  * @return {number} return the value of the cell at the column 2 and row 3.
  */
  get a23 () {
    return this._buffer[14]
  }

  /**
  * Update the value of the cell at the column 2 and row 3.
  *
  * @param {number} value - The new value of the cell at the column 2 and row 3.
  */
  set a23 (value) {
    this._buffer[14] = value
  }
  
  /**
  * Return the value of the cell at the column 3 and row 3.
  *
  * @return {number} return the value of the cell at the column 3 and row 3.
  */
  get a33 () {
    return this._buffer[15]
  }

  /**
  * Update the value of the cell at the column 3 and row 3.
  *
  * @param {number} value - The new value of the cell at the column 3 and row 3.
  */
  set a33 (value) {
    this._buffer[15] = value
  }
  
  /**
  * Set the content of a cell of this matrix.
  *
  * @param {number} column - Column of the cell to set.
  * @param {number} row - Row of the cell to set.
  * @param {number} value - Value to set.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  setCell (column, row, value) {
    this._buffer[4 * row + column] = value
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
    return this._buffer[4 * row + column]
  }

  /**
  * Set this matrix content.
  *
  * @param {...number} content - New content of this 4 by 4 integer matrix in row-major order.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  set (
    a00, a10, a20, a30,
    a01, a11, a21, a31,
    a02, a12, a22, a32,
    a03, a13, a23, a33
  ) {
    matrix4i.set(
      this._buffer, 0,
      a00, a10, a20, a30,
      a01, a11, a21, a31,
      a02, a12, a22, a32,
      a03, a13, a23, a33
    )
    return this
  }

  /**
  * Copy another matrix content.
  *
  * @param {Matrix4i} toCopy - Matrix instance to copy.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  copy (toCopy) {
    matrix4i.copy(toCopy.buffer, 0, this._buffer, 0)
    return this
  }

  /**
  * Fill this matrix with a particular value.
  *
  * @param {number} value - Value to use for filling this matrix.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  fill (value) {
    matrix4i.fill(this._buffer, 0, value)
    return this
  }

  /**
  * Transpose this matrix.
  *
  * @param {Matrix4i} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  transpose (result = this) {
    matrix4i.transpose(this._buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Invert this matrix.
  *
  * @param {Matrix4i} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  invert (result = this) {
    matrix4i.invert(this._buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Negate this matrix.
  *
  * @param {Matrix4i} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  negate (result = this) {
    matrix4i.negate(this._buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Multiply this matrix with another one.
  *
  * @param {Matrix4i} left - Left operand matrix.
  * @param {Matrix4i} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  multiplyWithMatrix (left, result = this) {
    matrix4i.multiplyWithMatrix(this._buffer, 0, left.buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Multiply this matrix with a static one, this matrix will be used as right operand.
  *
  * @param {number} a00 - Value of the cell of the column 0 and row 0 of the static matrix.
  * @param {number} a10 - Value of the cell of the column 1 and row 0 of the static matrix.
  * @param {number} a20 - Value of the cell of the column 2 and row 0 of the static matrix.
  * @param {number} a30 - Value of the cell of the column 3 and row 0 of the static matrix.
  * @param {number} a01 - Value of the cell of the column 0 and row 1 of the static matrix.
  * @param {number} a11 - Value of the cell of the column 1 and row 1 of the static matrix.
  * @param {number} a21 - Value of the cell of the column 2 and row 1 of the static matrix.
  * @param {number} a31 - Value of the cell of the column 3 and row 1 of the static matrix.
  * @param {number} a02 - Value of the cell of the column 0 and row 2 of the static matrix.
  * @param {number} a12 - Value of the cell of the column 1 and row 2 of the static matrix.
  * @param {number} a22 - Value of the cell of the column 2 and row 2 of the static matrix.
  * @param {number} a32 - Value of the cell of the column 3 and row 2 of the static matrix.
  * @param {number} a03 - Value of the cell of the column 0 and row 3 of the static matrix.
  * @param {number} a13 - Value of the cell of the column 1 and row 3 of the static matrix.
  * @param {number} a23 - Value of the cell of the column 2 and row 3 of the static matrix.
  * @param {number} a33 - Value of the cell of the column 3 and row 3 of the static matrix.
  ,
  * @param {Matrix4i} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  multiplyWithStaticMatrixAsRightOperand (
    a00, a10, a20, a30,
    a01, a11, a21, a31,
    a02, a12, a22, a32,
    a03, a13, a23, a33
    result = this
  ) {
    matrix4i.multiplyWithStaticMatrixAsRightOperand(
      this._buffer, 0,
      a00, a10, a20, a30,
      a01, a11, a21, a31,
      a02, a12, a22, a32,
      a03, a13, a23, a33
      result.buffer, 0
    )
    return this
  }

  /**
  * Multiply this matrix with a static one, this matrix will be used as a left operand.
  *
  * @param {number} a00 - Value of the cell of the column 0 and row 0 of the static matrix.
  * @param {number} a10 - Value of the cell of the column 1 and row 0 of the static matrix.
  * @param {number} a20 - Value of the cell of the column 2 and row 0 of the static matrix.
  * @param {number} a30 - Value of the cell of the column 3 and row 0 of the static matrix.
  * @param {number} a01 - Value of the cell of the column 0 and row 1 of the static matrix.
  * @param {number} a11 - Value of the cell of the column 1 and row 1 of the static matrix.
  * @param {number} a21 - Value of the cell of the column 2 and row 1 of the static matrix.
  * @param {number} a31 - Value of the cell of the column 3 and row 1 of the static matrix.
  * @param {number} a02 - Value of the cell of the column 0 and row 2 of the static matrix.
  * @param {number} a12 - Value of the cell of the column 1 and row 2 of the static matrix.
  * @param {number} a22 - Value of the cell of the column 2 and row 2 of the static matrix.
  * @param {number} a32 - Value of the cell of the column 3 and row 2 of the static matrix.
  * @param {number} a03 - Value of the cell of the column 0 and row 3 of the static matrix.
  * @param {number} a13 - Value of the cell of the column 1 and row 3 of the static matrix.
  * @param {number} a23 - Value of the cell of the column 2 and row 3 of the static matrix.
  * @param {number} a33 - Value of the cell of the column 3 and row 3 of the static matrix.
  ,
  * @param {Matrix4i} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  multiplyWithStaticMatrixAsLeftOperand (
    a00, a10, a20, a30,
    a01, a11, a21, a31,
    a02, a12, a22, a32,
    a03, a13, a23, a33
    result = this
  ) {
    matrix4i.multiplyWithStaticMatrixAsLeftOperand(
      this._buffer, 0,
      a00, a10, a20, a30,
      a01, a11, a21, a31,
      a02, a12, a22, a32,
      a03, a13, a23, a33
      result.buffer, 0
    )
    return this
  }

  /**
  * Multiply this matrix with a vector.
  *
  * @param {Vector4i} left - Left operand vector.
  * @param {Vector4i} [result = left] - Vector to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  multiplyWithVector (left, result = left) {
    matrix4i.multiplyWithVector(this._buffer, 0, left.buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Multiply this matrix with a scalar.
  *
  * @param {number} scalar - Scalar to use for the multiplication.
  * @param {Matrix4i} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  multiplyWithScalar (scalar, result = this) {
    matrix4i.multiplyWithScalar(this._buffer, 0, scalar, result.buffer, 0)
    return this
  }

  /**
  * Divide this matrix by a scalar.
  *
  * @param {number} scalar - Scalar to use for the division.
  * @param {Matrix4i} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  divideWithScalar (scalar, result = this) {
    matrix4i.divideWithScalar(this._buffer, 0, scalar, result.buffer, 0)
    return this
  }

  /**
  * Multiply this matrix with a scale matrix of the same order.
  *
  * @param {number} x - Scale factor of the x axis.
  * @param {number} y - Scale factor of the y axis.
  * @param {number} z - Scale factor of the z axis.
  * @param {number} w - Scale factor of the w axis.
  * @param {Matrix4i} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  scale (
    x, y, z, w,
    result = this
  ) {
    matrix4i.scale(
      this._buffer, 0,
      x, y, z, w,
      result.buffer, 0
    )
    return this
  }

  /**
  * Multiply this matrix with a 3 dimensional rotation matrix.
  *
  * @param {number} x - Rotation for the x axis in radians.
  * @param {number} y - Rotation for the y axis in radians.
  * @param {number} z - Rotation for the z axis in radians.
  * @param {Matrix4i} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  rotate (
    x, y, z,
    result = this
  ) {
    matrix4i.rotate(
      this._buffer, 0,
      x, y, z,
      result.buffer, 0
    )
    return this
  }

  /**
  * Multiply this matrix with a translation matrix of the same order.
  *
  * @param {number} x - Translation to apply to the x axis.
  * @param {number} y - Translation to apply to the y axis.
  * @param {number} z - Translation to apply to the z axis.
  * @param {Matrix4i} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  translate (
    x, y, z,
    result = this
  ) {
    matrix4i.translate(
      this._buffer, 0,
      x, y, z,
      result.buffer, 0
    )
    return this
  }

  /**
  * Add another matrix to this matrix.
  *
  * @param {Matrix4i} left - Left operand matrix.
  * @param {Matrix4i} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  add (left, result = this) {
    matrix4i.add(this._buffer, 0, left.buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Subtract another matrix to this matrix.
  *
  * @param {Matrix4i} left - Left operand matrix.
  * @param {Matrix4i} [result = this] - Matrix to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  subtract (left, result = this) {
    matrix4i.subtract(this._buffer, 0, left.buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Transform this matrix into an identity matrix.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  toIdentity () {
    matrix4i.toIdentity(this._buffer, 0)
    return this
  }

  /**
  * Transform this matrix into a scale matrix of the same order.
  *
  * @param {number} x - Scale factor of the x axis.
  * @param {number} y - Scale factor of the y axis.
  * @param {number} z - Scale factor of the z axis.
  * @param {number} w - Scale factor of the w axis.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  toScale (x, y, z, w) {
    matrix4i.toScale(this._buffer, 0, x, y, z, w)
    return this
  }

  /**
  * Transform this matrix into a 3 dimensional rotation matrix.
  *
  * @param {number} x - Rotation for the x axis in radians.
  * @param {number} y - Rotation for the y axis in radians.
  * @param {number} z - Rotation for the z axis in radians.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  toRotation (x, y, z) {
    matrix4i.toRotation(this._buffer, 0, x, y, z)
    return this
  }

  /**
  * Transform this matrix into a translation matrix of the same order.
  *
  * @param {number} x - Translation to apply to the x axis.
  * @param {number} y - Translation to apply to the y axis.
  * @param {number} z - Translation to apply to the z axis.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  toTranslation (x, y, z) {
    matrix4i.toTranslation(this._buffer, 0, x, y, z)
    return this
  }

  /**
  * Extract a scale vector from this matrix.
  *
  * @param {Vector4i} result - Vector to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  extractScale (result) {
    matrix4i.extractScale(this._buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Extract a translation vector from this matrix.
  *
  * @param {Vector3i} result - Vector to use for writing the result of this operation.
  *
  * @return {Matrix4i} The updated instance of this matrix for chaining purpose.
  */
  extractTranslation (result) {
    matrix4i.extractTranslation(this._buffer, 0, result.buffer, 0)
    return this
  }

  /**
  * Extract a 2 dimensional rotation angle from this matrix.
  *
  * @return {number} The result of the extraction.
  */
  extract2DRotation () {
    return matrix4i.extract2DRotation(this._buffer, 0)
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
    yield this._buffer[4]
    yield this._buffer[5]
    yield this._buffer[6]
    yield this._buffer[7]
    yield this._buffer[8]
    yield this._buffer[9]
    yield this._buffer[10]
    yield this._buffer[11]
    yield this._buffer[12]
    yield this._buffer[13]
    yield this._buffer[14]
    yield this._buffer[15]
  }

  /**
  * Return true if this matrix is equals to another one.
  *
  * @param {Matrix4i} other - Matrix instance to use for comparison.
  * @param {number} [tolerance = Number.EPSILON] - Tolerance to use for the equality comparison.
  *
  * @return {boolean} True if this matrix is equals to the other.
  */
  equals (other, tolerance = Number.EPSILON) {
    return matrix4i.equals(
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
    return matrix4i.toString(this._buffer, 0)
  }
}