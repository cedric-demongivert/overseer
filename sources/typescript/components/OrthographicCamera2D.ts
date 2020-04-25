import { Matrix4f, Vector2f } from '@cedric-demongivert/gl-tool-math'

export class OrthographicCamera2D {
  public left   : number
  public right  : number
  public top    : number
  public bottom : number

  /**
  * @see Component#initialize
  */
  public constructor () {
    this.left = 0
    this.right = 1
    this.top = 0
    this.bottom = 1
  }

  /**
  * Reset this component instance to its initial state.
  */
  public clear () {
    this.left = 0
    this.right = 1
    this.top = 0
    this.bottom = 1
  }

  /**
  * Copy another instance of this component.
  *
  * @param {OrthographicCamera2D} other - Other instance to copy.
  */
  public copy (other : OrthographicCamera2D) {
    this.left = other.left
    this.right = other.right
    this.top = other.top
    this.bottom = other.bottom
  }

  /**
  * Return the current world to view matrix of this camera.
  *
  * @param [result = new Matrix4f()] - The matrix to set to the world to view matrix of this camera.
  */
  public extractWorldToView (target = new Matrix4f()) : void {
    const left : number = this.left
    const right : number = this.right
    const top : number = this.top
    const bottom : number = this.bottom

    const sx : number = 2 / (right - left)
    const px : number = -((right + left) / (right - left))
    const sy : number = 2 / (top - bottom)
    const py : number = -((top + bottom) / (top - bottom))

    target.set(
      sx,  0, 0, px,
       0, sy, 0, py,
       0,  0, 1,  0,
       0,  0, 0,  1
    )
  }

  /**
  * Return the current world to view matrix of this camera.
  *
  * @param [result = new Matrix4f()] - The matrix to set to the world to view matrix of this camera.
  */
  public extractViewToWorld (target = new Matrix4f()) : void {
    this.extractWorldToView(target)
    target.invert()
  }

  /**
  * @return The squared radius of this camera.
  */
  public get squaredRadius () : number {
    const width : number = this.width
    const height : number = this.height

    return width * width + height * height
  }

  /**
  * @return The radius of this camera.
  */
  public get radius () : number {
    return Math.sqrt(this.squaredRadius)
  }

  /**
  * Return the x component of the center of this camera.
  *
  * @return The x component of the center of this camera.
  */
  public get centerX () : number {
    return (this.left + this.right) / 2
  }

  /**
  * Change the x component of the center of this camera.
  *
  * @param value - The new x component of the center of this camera.
  */
  public set centerX (value : number) {
    this.setCenterX(value)
  }

  /**
  * Change the x component of the center of this camera.
  *
  * @param value - The new x component of the center of this camera.
  */
  public setCenterX (value : number) : void {
    const hwidth : number = this.width / 2

    this.left = value - hwidth
    this.right = value + hwidth
  }

  /**
  * Return the y component of the center of this camera.
  *
  * @return The y component of the center of this camera.
  */
  public get centerY () : number {
    return (this.bottom + this.top) / 2
  }

  /**
  * Change the y component of the center of this camera.
  *
  * @param value - The new y component of the center of this camera.
  */
  public set centerY (value : number) {
    this.setCenterY(value)
  }

  /**
  * Change the y component of the center of this camera.
  *
  * @param value - The new y component of the center of this camera.
  */
  public setCenterY (value : number) {
    const hheight : number = this.height / 2

    this.bottom = value - hheight
    this.top = value + hheight
  }

  /**
  * Return the current center of the camera.
  *
  * @return The current center of the camera.
  */
  public get center () : Vector2f {
    return this.extractCenter()
  }

  /**
  * Change the center of this camera.
  *
  * @param value - The new center of the camera.
  */
  public set center (value : Vector2f) {
    this.setCenter(value.x, value.y)
  }

  /**
  * Return the current center of the camera.
  *
  * @param [result = new Vector2f()] - The vector to set to the center of this camera.
  *
  * @return The current center of the camera.
  */
  public extractCenter (result = new Vector2f()) : Vector2f {
    result.set(this.centerX, this.centerY)
    return result
  }

  /**
  * Set the new center of this camera.
  *
  * @param x - The new x componen value of the center of this camera.
  * @param y - The new x componen value of the center of this camera.
  */
  public setCenter (x : number, y : number) : void {
    const hwidth : number = this.width / 2
    const hheight : number = this.height / 2

    this.bottom = y - hheight
    this.top = y + hheight

    this.left = x - hwidth
    this.right = x + hwidth
  }

  /**
  * Return the width of the camera.
  *
  * @return The width of the camera.
  */
  public get width () : number {
    return this.right - this.left
  }

  /**
  * Change the width of the camera.
  *
  * @param value - The new width of the camera.
  */
  public set width (value : number) {
    this.setWidth(value)
  }

  /**
  * Change the width of the camera.
  *
  * @param value - The new width of the camera.
  */
  public setWidth (value : number) : void {
    const centerX : number = this.centerX
    const hwidth : number = value / 2

    this.left = centerX - hwidth
    this.right = centerX + hwidth
  }

  /**
  * Return the height of the camera.
  *
  * @return The height of the camera.
  */
  public get height () : number {
    return this.top - this.bottom
  }

  /**
  * Change the height of the camera.
  *
  * @param value - The new height of the camera.
  */
  public set height (value : number) {
    this.setHeight(value)
  }

  /**
  * Change the height of the camera.
  *
  * @param value - The new height of the camera.
  */
  public setHeight (value : number) : void {
    const centerY = this.centerY
    const hheight = value / 2

    this.bottom = centerY - hheight,
    this.top = centerY + hheight
  }

  /**
  * @return The aspect ratio of the camera as a number.
  */
  public get aspectRatio () {
    return this.width / this.height
  }
}
