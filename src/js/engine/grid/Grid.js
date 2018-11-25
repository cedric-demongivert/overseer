import { GLObject } from '@glkit'

export class Grid extends GLObject {
  /**
  * Render this grid for a particular view.
  *
  * @param {View} view - An overseer view.
  */
  render (view) {
    throw new Error('Grid#render(view : View) is not implemented.')
  }
}
