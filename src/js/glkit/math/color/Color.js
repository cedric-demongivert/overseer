import { GLType } from '@glkit/gl/GLType'
import { NotImplementedError } from '@errors'

/**
* An engine color.
*/
export class Color {
  /**
  * Create a new white color by default.
  */
  constructor () {
    this[GLType.type] = GLType.FLOAT_VEC4
    this[GLType.size] = 1
  }

  /**
  * Return the red channel of this color.
  *
  * @return {number} The red channel of this color.
  */
  get r () {
    throw new NotImplementedError(Color, 'get r')
  }

  /**
  * Return the green channel of this color.
  *
  * @return {number} The green channel of this color.
  */
  get g () {
    throw new NotImplementedError(Color, 'get g')
  }

  /**
  * Return the blue channel of this color.
  *
  * @return {number} The blue channel of this color.
  */
  get b () {
    throw new NotImplementedError(Color, 'get b')
  }

  /**
  * Return the alpha channel of this color.
  *
  * @return {number} The alpha channel of this color.
  */
  get a () {
    throw new NotImplementedError(Color, 'get a')
  }

  /**
  * Return the hue channel of this color.
  *
  * @return {number} The hue channel of this color.
  */
  get h () {
    throw new NotImplementedError(Color, 'get h')
  }

  /**
  * Return the staturation channel of this color.
  *
  * @return {number} The staturation channel of this color.
  */
  get s () {
    throw new NotImplementedError(Color, 'get s')
  }

  /**
  * Return the lightness channel of this color.
  *
  * @return {number} The value channel of this color.
  */
  get l () {
    throw new NotImplementedError(Color, 'get l')
  }

  /**
  * Return an RGBA hexadecimal representation of this color.
  *
  * @return {number} An RGBA hexadecimal representation of this color.
  */
  get hex () {
    return (this.r * 255) << 24 ^
           (this.g * 255) << 16 ^
           (this.b * 255) << 8 ^
           (this.a * 255) << 0
  }

  /**
  * Return an RGBA hexadecimal representation of this color.
  *
  * @return {string} An RGBA hexadecimal representation of this color.
  */
  get hexString () {
    return `#${this.hex}`
  }

  /**
  * Define this color by using an RGBA hexadecimal representation.
  *
  * @param {number} value - Hexadecimal representation of this color.
  *
  * @return {Color} A new updated color instance.
  */
  setHex (value) {
    if (typeof value === 'string') {
      value = parseInt(value.trim().substr(1))
    }

    const r = (value >> 24 & 255) / 255
    const g = (value >> 16 & 255) / 255
    const b = (value >> 8 & 255) / 255
    const a = (value >> 0 & 255) / 255

    return this.setRGBA(r, g, b, a)
  }

  /**
  * Redefine this color by setting its red, green, blue and alpha channels.
  *
  * @param {number} r - New red channel of this color.
  * @param {number} g - New green channel of this color.
  * @param {number} b - New blue channel of this color.
  * @param {number} a - New alpha channel of this color.
  *
  * @return {Color} A new updated color instance.
  */
  setRGBA (r, g, b, a) {
    throw new NotImplementedError(Color, 'setRGBA')
  }

  /**
  * Redefine this color by setting its red, green and blue channels.
  *
  * @param {number} r - New red channel of this color.
  * @param {number} g - New green channel of this color.
  * @param {number} b - New blue channel of this color.
  *
  * @return {Color} A new updated color instance.
  */
  setRGB (r, g, b) {
    return this.setRGBA(r, g, b, 1)
  }

  /**
  * Change the red channel value of this color.
  *
  * @param {number} value - The new channel value.
  *
  * @return {Color} A new updated color instance.
  */
  setR (value) {
    return this.setRGBA(value, this.g, this.b, this.a)
  }

  /**
  * Change the green channel value of this color.
  *
  * @param {number} value - The new channel value.
  *
  * @return {Color} A new updated color instance.
  */
  setG (value) {
    return this.setRGBA(this.r, value, this.b, this.a)
  }

  /**
  * Change the blue channel value of this color.
  *
  * @param {number} value - The new channel value.
  *
  * @return {Color} A new updated color instance.
  */
  setB (value) {
    return this.setRGBA(this.r, this.g, value, this.a)
  }

  /**
  * Change the alpha channel value of this color.
  *
  * @param {number} value - The new channel value.
  *
  * @return {Color} A new updated color instance.
  */
  setA (value) {
    return this.setRGBA(this.r, this.g, this.b, value)
  }

  /**
  * Redefine this color by setting its hue, saturation and value channels.
  *
  * @param {number} h - New hue channel of this color.
  * @param {number} s - New saturation channel of this color.
  * @param {number} v - New value channel of this color.
  * @param {number} [a = this.a] - New alpha channel of this color.
  *
  * @return {Color} A new updated color instance.
  */
  setHSL (h, s, v, a = this.a) {
    throw new NotImplementedError(Color, 'setHSL')
  }

  /**
  * Change the hue channel value of this color.
  *
  * @param {number} value - The new channel value.
  *
  * @return {Color} A new updated color instance.
  */
  setH (value) {
    return this.setHSL(value, this.s, this.l, this.a)
  }

  /**
  * Change the saturation channel value of this color.
  *
  * @param {number} value - The new channel value.
  *
  * @return {Color} A new updated color instance.
  */
  setS (value) {
    return this.setHSL(this.h, value, this.l, this.a)
  }

  /**
  * Change the lightness channel value of this color.
  *
  * @param {number} value - The new channel value.
  *
  * @return {Color} A new updated color instance.
  */
  setL (value) {
    return this.setHSL(this.h, this.s, value, this.a)
  }

  /**
  * Iterate by default over all r, g, b, a channels.
  *
  * @return {Iterator<number>} An iterator over all r, g, b, a channels.
  */
  * [Symbol.iterator] () {
    yield this.r
    yield this.g
    yield this.b
    yield this.a
  }

  /**
  * Return the GLValue associated to this object.
  *
  * @return {GLValue} The GLValue associated to this object.
  */
  get [GLType.value] () {
    return this
  }
}
