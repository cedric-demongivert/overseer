export class Shape {
  get boundingBox () {
    throw new Error('Shape#boundingBox is not implemented.')
  }

  clone () {
    throw new Error('Shape#clone() : Shape is not implemented.')
  }
}
