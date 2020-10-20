import { Vector3f, Vector2f } from '@cedric-demongivert/gl-tool-math'

/**
* A viewport.
*/
export class Viewport {
  /**
  * Left location, in pixels, of this viewport.
  */
  public left : number

  /**
  * Right location, in pixels, of this viewport.
  */
  public right : number

  /**
  * Bottom location, in pixels, of this viewport.
  */
  public bottom : number

  /**
  * Top location, in pixels, of this viewport.
  */
  public top : number

  /**
  * Create a new empty viewport.
  */
  public constructor () {
    this.left = 0
    this.right = 0
    this.bottom = 0
    this.top = 0
  }

  /**
  * Reset this viewport to its initial state.
  */
  public clear () {
    this.left = 0
    this.right = 0
    this.bottom = 0
    this.top = 0
  }

  /**
  * Copy another viewport.
  *
  * @param toCopy - Another viewport to copy.
  */
  public copy (toCopy : Viewport) : void {
    this.left = toCopy.left
    this.right = toCopy.right
    this.bottom = toCopy.bottom
    this.top = toCopy.top
  }

  /**
  * Return the x component of the center of this viewport.
  *
  * @return The x component of the center of this viewport.
  */
  public get centerX () : number {
    return (this.left + this.right) / 2
  }

  /**
  * Change the x component of the center of this viewport.
  *
  * @param value - The new x component of the center of this viewport.
  */
  public set centerX (value : number) {
    this.setCenterX(value)
  }

  /**
  * Change the x component of the center of this viewport.
  *
  * @param value - The new x component of the center of this viewport.
  */
  public setCenterX (value : number) : void {
    const hwidth : number = this.width / 2

    this.left = value - hwidth
    this.right = value + hwidth
  }

  /**
  * Return the y component of the center of this viewport.
  *
  * @return The y component of the center of this viewport.
  */
  public get centerY () : number {
    return (this.bottom + this.top) / 2
  }

  /**
  * Change the y component of the center of this viewport.
  *
  * @param value - The new y component of the center of this viewport.
  */
  public set centerY (value : number) {
    this.setCenterY(value)
  }

  /**
  * Change the y component of the center of this viewport.
  *
  * @param value - The new y component of the center of this viewport.
  */
  public setCenterY (value : number) {
    const hheight : number = this.height / 2

    this.bottom = value - hheight
    this.top = value + hheight
  }

  /**
  * Return the current center of the viewport.
  *
  * @return The current center of the viewport.
  */
  public get center () : Vector2f {
    return this.getCenter()
  }

  /**
  * Change the center of this viewport.
  *
  * @param value - The new center of the viewport.
  */
  public set center (value : Vector2f) {
    this.setCenter(value.x, value.y)
  }

  /**
  * Return the current center of the viewport.
  *
  * @param [result = new Vector2f()] - The vector to set to the center of this viewport.
  * @return The current center of the viewport.
  */
  public getCenter (result = new Vector2f()) : Vector2f {
    result.set(this.centerX, this.centerY)

    return result
  }

  /**
  * Set the new center of this viewport.
  *
  * @param x - The new x componen value of the center of this viewport.
  * @param y - The new x componen value of the center of this viewport.
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
  * Return the width of the viewport.
  *
  * @return The width of the viewport.
  */
  public get width () : number {
    return this.right - this.left
  }

  /**
  * Change the width of the viewport.
  *
  * @param value - The new width of the viewport.
  */
  public set width (value : number) {
    this.setWidth(value)
  }

  /**
  * Change the width of the viewport.
  *
  * @param value - The new width of the viewport.
  */
  public setWidth (value : number) : void {
    const centerX = this.centerX
    const hwidth = value / 2

    this.left = centerX - hwidth
    this.right = centerX + hwidth
  }

  /**
  * Return the height of the viewport.
  *
  * @return The height of the viewport.
  */
  public get height () : number {
    return this.top - this.bottom
  }

  /**
  * Change the height of the viewport.
  *
  * @param value - The new height of the viewport.
  */
  public set height (value : number) {
    this.setHeight(value)
  }

  /**
  * Change the height of the viewport.
  *
  * @param value - The new height of the viewport.
  */
  public setHeight (value : number) : void {
    const centerY  : number = this.centerY
    const hheight  : number = value / 2

    this.bottom = centerY - hheight,
    this.top = centerY + hheight
  }

  public toViewportXCoordinate (screenXCoordinate : number) : number {
    return (((screenXCoordinate - this.left) / this.width) - 0.5) * 2
  }

  public toViewportYCoordinate (screenYCoordinate : number) : number {
    return (((screenYCoordinate - this.bottom) / this.height) - 0.5) * 2
  }

  public toScreenXCoordinate (viewportXCoordinate : number) : number {
    return (viewportXCoordinate / 2 + 0.5) * this.width + this.left
  }

  public toScreenYCoordinate (viewportYCoordinate : number) : number {
    return (viewportYCoordinate / 2 + 0.5) * this.height + this.bottom
  }

  public toScreenCoordinates (viewportCoodinates : Vector2f | Vector3f) : void {
    if (viewportCoodinates instanceof Vector2f) {
      viewportCoodinates.set(
        this.toScreenXCoordinate(viewportCoodinates.x),
        this.toScreenYCoordinate(viewportCoodinates.y)
      )
    } else {
      viewportCoodinates.set(
        this.toScreenXCoordinate(viewportCoodinates.x),
        this.toScreenYCoordinate(viewportCoodinates.y),
        viewportCoodinates.z
      )
    }
  }

  public toViewportCoordinates (screenCoordinates : Vector2f | Vector3f) : void {
    if (screenCoordinates instanceof Vector2f) {
      screenCoordinates.set(
        this.toViewportXCoordinate(screenCoordinates.x),
        this.toViewportYCoordinate(screenCoordinates.y)
      )
    } else {
      screenCoordinates.set(
        this.toViewportXCoordinate(screenCoordinates.x),
        this.toViewportYCoordinate(screenCoordinates.y),
        screenCoordinates.z
      )
    }
  }

  /**
  * Returns true if the given screen location is into this viewport.
  *
  * @param x - Screen coordinate to check in abscissa.
  * @param y - Screen coordinate to check in ordinate.
  *
  * @return True if the given screen location is into this viewport.
  */
  public contains (x : number, y : number) : boolean {
    return x >= this.left &&
           x < this.right &&
           y >= this.bottom &&
           y < this.top
  }
}
