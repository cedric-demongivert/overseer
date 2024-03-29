const lengthValueSymbol: symbol = Symbol()

/**
* A length.
*/
export class Length {
  /**
   * 
   */
  private _value: number

  /**
   * 
   */
  private _unit: Length.Unit

  /**
  * Create a new length.
  *
  * @see Length.fromString
  * @see Length.from
  * @see Length.fromInstance
  *
  * @param {...any} params - Parameters for construction. See static factories for more information.
  */
  public constructor(...params) {
    this._value = 0
    this._unit = Length.m
    this.set(...params)
  }

  /**
  * Create a length from a string.
  *
  * @param {string} str - The length exprimed as a string.
  * @param {Length} [instance = new Length()] - An instance to use, if you want to use an existing object.
  *
  * @return {Length} A length.
  */
  static fromString(str, instance = new Length()) {
    const matchs = parser.exec(str)

    if (matchs) {
      instance.unit = matchs[5].trim()
      instance.value = parseFloat((matchs[2] || '') + matchs[3])
      return instance
    } else {
      throw new TypeError(
        `The string "${str}" is not a valid length representation. A valid ` +
        'length representation must be defined as "{value}{unit}".'
      )
    }
  }

  /**
  * Create a length from any object.
  *
  * The object must define a method for the symbol Length.value.
  *
  * @param {any} from - Instance to convert into a Length value.
  * @param {Length} [instance = new Length()] - An instance to use, if you want to use an existing object.
  * @return {Length} A length.
  */
  static fromInstance(from, instance = new Length()) {
    if (typeof from[Length.lengthValue] === 'function') {
      const params = from[Length.lengthValue]()

      if (params instanceof Array) {
        return instance.set(...params)
      } else {
        return instance.set(params.value, params.unit)
      }
    }

    throw new TypeError([
      `The object : "${from}" can't be converted into a Length instance `,
      'because it do not define a method for the symbol Length.lengthValue.'
    ].join())
  }

  /**
  * Create a new length with an explicit value and unit.
  *
  * @param {number} [value = 0] - The length value.
  * @param {string} [unit = Length.m] - The length unit.
  * @param {Length} [instance = new Length()] - An instance to use, if you want to use an existing object.
  * @return {Length} A length.
  */
  static from(value = 0, unit = Length.m, instance = new Length()) {
    instance._value = value
    instance._unit = unit
    return instance
  }

  /**
  * Change the current value of the length.
  *
  * @see Length.fromString
  * @see Length.from
  * @see Length.fromInstance
  *
  * @param {...any} params - Parameters. See static factories for more information.
  */
  public set(...params) {
    if (params.length === 1) {
      if (typeof params[0] === 'string') {
        Length.fromString(params[0], this)
      } else {
        Length.fromInstance(params[0], this)
      }
    } else {
      this._value = params[0]
      this._unit = params[1]
    }

    return this
  }

  /**
  * @param {string} unit - The unit to use.
  *
  * @return {number} The length value in the specified unit.
  */
  public in(unit) {
    if ($values.has(unit)) {
      return (this._value * $values.get(this._unit)) / $values.get(unit)
    } else {
      throw new TypeError(
        `The unit "${unit}" is not a valid length unit. Valid units are : [${[...$values.keys()].join(', ')
        }]`
      )
    }
  }

  public decimals(value) {
    let index = 0
    while (value >= 1.0) {
      index += 1
      value /= 10
    }
    return index
  }

  public order(n) {
    if (this.decimals(this._value) > n) {
      while (this.decimals(this._value) > n && $upper.has(this._unit)) {
        this._value = this.in($upper.get(this._unit))
        this._unit = $upper.get(this._unit)
      }
    } else {
      while (this.decimals(this._value) < n && $lower.has(this._unit)) {
        this._value = this.in($lower.get(this._unit))
        this._unit = $lower.get(this._unit)
      }
    }
  }

  /**
  * @return {number} The length value.
  */
  get value() {
    return this._value
  }

  /**
  * @param {value} newValue - The new length value.
  */
  set value(newValue) {
    this._value = newValue
  }

  /**
  * @return {string} The length unit.
  */
  get unit() {
    return this._unit
  }

  /**
  * Change the length unit. It will recompute the value accordingly.
  *
  * @param {string} newUnit - The new length unit.
  */
  set unit(unit) {
    if ($values.has(unit)) {
      this._value = this.in(unit)
      this._unit = unit
    } else {
      throw new TypeError(
        `The unit "${unit}" is not a valid length unit. Valid units are : [${[...$values.keys()].join(', ')
        }]`
      )
    }
  }

  /**
  * Check if this length is greater than another length.
  *
  * @param {any} other - Any value convertible into a length.
  * @return {boolean} True if this length is greater than the other.
  */
  public gt(other) {
    if (other instanceof Length) {
      return this.value > other.in(this.unit)
    } else {
      return this.value > new Length(other).in(this.unit)
    }
  }

  /**
  * Check if this length is greater than or equal to another length.
  *
  * @param {any} other - Any value convertible into a length.
  * @return {boolean} True if this length is greater than or equal to the other.
  */
  public gte(other) {
    if (other instanceof Length) {
      return this.value >= other.in(this.unit)
    } else {
      return this.value >= new Length(other).in(this.unit)
    }
  }

  /**
  * Check if this length is less than another length.
  *
  * @param {any} other - Any value convertible into a length.
  * @return {boolean} True if this length is less than the other.
  */
  public lt(other) {
    if (other instanceof Length) {
      return this.value < other.in(this.unit)
    } else {
      return this.value < new Length(other).in(this.unit)
    }
  }

  /**
  * Check if this length is less than or equal to another length.
  *
  * @param {any} other - Any value convertible into a length.
  * @return {boolean} True if this length is less than or equal to the other.
  */
  public lte(other) {
    if (other instanceof Length) {
      return this.value <= other.in(this.unit)
    } else {
      return this.value <= new Length(other).in(this.unit)
    }
  }

  /**
  * Check if this length is equal to another length.
  *
  * @param {any} other - Any value convertible into a length.
  * @return {boolean} True if this length is equal to the other.
  */
  equal(other) {
    if (other instanceof Length) {
      return this.value === other.in(this.unit)
    } else {
      return this.value === new Length(other).in(this.unit)
    }
  }

  /**
  * Add another length.
  *
  * @param {any} other - Any value convertible into a length.
  * @return {Length} This instance of length.
  */
  add(other) {
    if (other instanceof Length) {
      this.value += other.in(this.unit)
    } else {
      this.value += new Length(other).in(this.unit)
    }

    return this
  }

  /**
  * Subtract another length.
  *
  * @param {any} other - Any value convertible into a length.
  * @return {Length} This instance of length.
  */
  subtract(other) {
    if (other instanceof Length) {
      this.value -= other.in(this.unit)
    } else {
      this.value -= new Length(other).in(this.unit)
    }

    return this
  }

  /**
  * A chain for length.value *= scalar
  *
  * @param {any} scalar
  * @return {Length} This instance of length.
  */
  multiply(scalar) {
    this.value *= scalar
    return this
  }

  /**
  * A chain for length.value /= scalar
  *
  * @param {any} scalar
  * @return {Length} This instance of length.
  */
  divide(scalar) {
    this.value /= scalar
    return this
  }

  /**
  * Create a clone of this length.
  *
  * @return {Length} A clone of this length.
  */
  clone() {
    return new Length(this)
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/valueOf
  */
  valueOf() {
    return `${this.value}${this.unit}`
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/toString
  */
  toString() {
    return `${this.value}${this.unit}`
  }

  /**
   * 
   */
  public equals(other: any): boolean {
    if (other == null) return false
    if (other === this) return true

    if (other instanceof Length) {
      return this.equal(other)
    }

    return false
  }

  /**
   * 
   */
  [lengthValueSymbol]() {
    return this
  }
}

export namespace Length {
  export type Unit = string

  export const am: Unit = 'am'
  export const fm: Unit = 'fm'
  export const pm: Unit = 'pm'
  export const nm: Unit = 'nm'
  export const μm: Unit = 'μm'
  export const mm: Unit = 'mm'
  export const cm: Unit = 'cm'
  export const dm: Unit = 'dm'
  export const m: Unit = 'm'
  export const dam: Unit = 'dam'
  export const hm: Unit = 'hm'
  export const km: Unit = 'km'
  export const Mm: Unit = 'Mm'
  export const Gm: Unit = 'Gm'
  export const Tm: Unit = 'Tm'
  export const Pm: Unit = 'Pm'
  export const Em: Unit = 'Em'
  export const ua: Unit = 'ua'

  export const lengthValue: symbol = lengthValueSymbol
}

const $values = new Map([
  [Length.am, 0.000000000000000001],
  [Length.fm, 0.000000000000001],
  [Length.pm, 0.000000000001],
  [Length.nm, 0.000000001],
  [Length.μm, 0.000001],
  [Length.mm, 0.001],
  [Length.cm, 0.01],
  [Length.dm, 0.1],
  [Length.m, 1],
  [Length.dam, 10],
  [Length.hm, 100],
  [Length.km, 1000],
  [Length.Mm, 1000000],
  [Length.Gm, 1000000000],
  [Length.Tm, 1000000000000],
  [Length.Pm, 1000000000000000],
  [Length.Em, 1000000000000000000],
  [Length.ua, 149597870000]
])

const $upper = new Map([
  [Length.am, Length.fm],
  [Length.fm, Length.pm],
  [Length.pm, Length.nm],
  [Length.nm, Length.μm],
  [Length.μm, Length.mm],
  [Length.mm, Length.cm],
  [Length.cm, Length.dm],
  [Length.dm, Length.m],
  [Length.m, Length.dam],
  [Length.dam, Length.hm],
  [Length.hm, Length.km],
  [Length.km, Length.Mm],
  [Length.Mm, Length.Gm],
  [Length.Gm, Length.Tm],
  [Length.Tm, Length.Pm],
  [Length.Pm, Length.Em]
])

const $lower = new Map([
  [Length.fm, Length.am],
  [Length.pm, Length.fm],
  [Length.nm, Length.pm],
  [Length.μm, Length.nm],
  [Length.mm, Length.μm],
  [Length.cm, Length.mm],
  [Length.dm, Length.cm],
  [Length.m, Length.dm],
  [Length.dam, Length.m],
  [Length.hm, Length.dam],
  [Length.km, Length.hm],
  [Length.Mm, Length.km],
  [Length.Gm, Length.Mm],
  [Length.Tm, Length.Gm],
  [Length.Pm, Length.Tm],
  [Length.Em, Length.Pm]
])

const parser = new RegExp(
  `((\\+|\\-)?\\s*(\\d+(\\.\\d+)?))\\s*(${[...$values.keys()].join('|')})`
)
