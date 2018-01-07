const _value = Symbol()
const _unit = Symbol()
const _lengthValue = Symbol()

/**
* A length.
*/
export class Length {
  /**
  * Create a new length.
  *
  * @see Length.fromString
  * @see Length.from
  * @see Length.fromInstance
  *
  * @param {...any} params - Parameters for construction. See static factories for more information.
  */
  constructor (...params) {
    this[_value] = 0
    this[_unit] = Length.m
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
  static fromString (str, instance = new Length()) {
    const matchs = parser.exec(str)

    if (matchs) {
      instance.unit = matchs[5].trim()
      instance.value = parseFloat((matchs[2] || '') + matchs[3])
      return instance
    } else {
      throw new TypeError(
        `The string "${str}" is not a valid length representation. A valid `,
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
  static fromInstance (from, instance = new Length()) {
    if (typeof from[Length.lengthValue] === 'function') {
      const params = from[Length.lengthValue]()

      if (params instanceof Array) {
        return instance.set(...params)
      } else {
        return instance.set(params)
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
  static from (value = 0, unit = Length.m, instance = new Length()) {
    instance[_value] = value
    instance[_unit] = unit
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
  set (...params) {
    if (params.length === 1) {
      if (typeof params[0] === 'string') {
        Length.fromString(params[0], this)
      } else {
        Length.fromInstance(params[0], this)
      }
    } else {
      this[_value] = params[0]
      this[_unit] = params[1]
    }

    return this
  }

  /**
  * @param {string} unit - The unit to use.
  *
  * @return {number} The length value in the specified unit.
  */
  in (unit) {
    if ($values.has(unit)) {
      return (this[_value] * $values.get(this[_unit])) / $values.get(unit)
    } else {
      throw new TypeError(
        `The unit "${unit}" is not a valid length unit. Valid units are : [${
          [...$values.keys()].join(', ')
        }]`
      )
    }
  }

  /**
  * @return {number} The length value.
  */
  get value () {
    return this[_value]
  }

  /**
  * @param {value} newValue - The new length value.
  */
  set value (newValue) {
    this[_value] = newValue
  }

  /**
  * @return {string} The length unit.
  */
  get unit () {
    return this[_unit]
  }

  /**
  * Change the length unit. It will recompute the value accordingly.
  *
  * @param {string} newUnit - The new length unit.
  */
  set unit (unit) {
    if ($values.has(unit)) {
      this[_value] = this.in(unit)
      this[_unit] = unit
    } else {
      throw new TypeError(
        `The unit "${unit}" is not a valid length unit. Valid units are : [${
          [...$values.keys()].join(', ')
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
  gt (other) {
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
  gte (other) {
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
  lt (other) {
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
  lte (other) {
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
  equal (other) {
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
  add (other) {
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
  subtract (other) {
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
  multiply (scalar) {
    this.value *= scalar
    return this
  }

  /**
  * A chain for length.value /= scalar
  *
  * @param {any} scalar
  * @return {Length} This instance of length.
  */
  divide (scalar) {
    this.value /= scalar
    return this
  }

  /**
  * Create a copy of this length.
  *
  * @return {Length} A copy of this length.
  */
  copy () {
    return new Length(this)
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/valueOf
  */
  valueOf () {
    return `${this.value}${this.unit}`
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/toString
  */
  toString () {
    return `${this.value}${this.unit}`
  }

  /**
  * Used in order to copy the length.
  */
  [_lengthValue] () {
    return [this.value, this.unit]
  }
}

Length.am = 'am'
Length.fm = 'fm'
Length.pm = 'pm'
Length.nm = 'nm'
Length.μm = 'μm'
Length.mm = 'mm'
Length.cm = 'cm'
Length.dm = 'dm'
Length.m = 'm'
Length.dam = 'dam'
Length.hm = 'hm'
Length.km = 'km'
Length.Mm = 'Mm'
Length.Gm = 'Gm'
Length.Tm = 'Tm'
Length.Pm = 'Pm'
Length.Em = 'Em'
Length.ua = 'ua'
Length.lengthValue = _lengthValue

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

const parser = new RegExp(
  `((\\+|\\-)?\\s*(\\d+(\\.\\d+)?))\\s*(${[...$values.keys()].join('|')})`
)
