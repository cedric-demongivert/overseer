import { Color } from './Color'

/**
* An engine rgba color.
*/
export class ColorRGBA extends Color {
  /**
  * Create a new white color by default.
  *
  * @param {number} [r = 1] - The red channel value.
  * @param {number} [g = 1] - The green channel value.
  * @param {number} [b = 1] - The blue channel value.
  * @param {number} [a = 1] - The alpha channel value.
  */
  constructor (r = 1, g = 1, b = 1, a = 1) {
    super()
    this._r = r
    this._g = g
    this._b = b
    this._a = a
  }

  /**
  * @see Color#get r
  */
  get r () {
    return this._r
  }

  /**
  * @see Color#get g
  */
  get g () {
    return this._g
  }

  /**
  * @see Color#get b
  */
  get b () {
    return this._b
  }

  /**
  * @see Color#get a
  */
  get a () {
    return this._a
  }

  /**
  * @see Color#get h
  */
  get h () {
    const r = this._r
    const g = this._g
    const b = this._b

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)

    if (min === max) {
      return 0
    } else {
      const delta = max - min

      switch (max) {
        case r:
          return ((g - b) / delta + (g < b ? 6 : 0)) * 60
        case g:
          return ((b - r) / delta + 2) * 60
        case b:
          return ((r - g) / delta + 4) * 60
      }
    }
  }

  /**
  * @see Color#get s
  */
  get s () {
    const r = this._r
    const g = this._g
    const b = this._b

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)

    const lightness = (min + max) / 2.0

    if (min === max) {
      return 0
    } else {
      const delta = max - min

      if (lightness <= 0.5) {
        return delta / (max + min)
      } else {
        return delta / (2 - max - min)
      }
    }
  }

  /**
  * @see Color#get l
  */
  get l () {
    const r = this._r
    const g = this._g
    const b = this._b

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    return (min + max) / 2.0
  }

  /**
  * @see Color#setRGBA
  */
  setRGBA (r, g, b, a = this._a) {
    return new ColorRGBA(r, g, b, a)
  }

  /**
  * @see Color#setHSL
  */
  setHSL (h, s, l, a = this.a) {
    const chroma = (1 * Math.abs(2 * l - 1)) * s
    const uh = h / 60
    const x = chroma * (1 - Math.abs(uh % 2 - 1))
    const m = l - chroma / 2

    switch (uh >> 0) {
      case 0:
        return this.setRGBA(chroma + m, x + m, m, a)
      case 1:
        return this.setRGBA(x + m, chroma + m, m, a)
      case 2:
        return this.setRGBA(m, chroma + m, x + m, a)
      case 3:
        return this.setRGBA(m, x + m, chroma + m, a)
      case 4:
        return this.setRGBA(x + m, m, chroma + m, a)
      default:
        return this.setRGBA(chroma + m, m, x + m, a)
    }
  }
}
