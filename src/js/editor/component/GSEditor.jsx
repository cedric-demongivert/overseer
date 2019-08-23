import React from 'react'
import classnames from 'classnames'

export class GSEditor {
  constructor () {
    this._properties = []
    this._getters = []
    this._setters = []
    this._mutators = []
    this._labels = []
    this._editors = []
  }

  /**
  * Define a property.
  *
  * @param {string} property - Name of the property to define.
  *
  * @return {number} The identifier of the defined property.
  */
  define (property) {
    const identifier = this.getIdentifier(property)

    if (identifier == null) {
      this._properties.push(property)
      this._editors.push(null)
      this._getters.push(null)
      this._setters.push(null)
      this._mutators.push(null)

      return this._properties.length - 1
    }

    return identifier
  }

  /**
  * Define the label of a given property.
  *
  * @param {number} identifier - The identifier of the property to mutate.
  * @param {string} label - A label for the given property.
  */
  defineLabel (identifier, label) {
    if (this._properties[identifier] == null) {
      throw new Error([
        'Unable to define the label of the property ', identifier.toString(),
        ' to "', label, '" because the given property does not exists.'
      ].join(''))
    }

    if (this._labels[identifier] != null) {
      throw new Error([
        'Unable to define the label of the property ',
        this._properties[identifier], ' to "', label,
        '" because the given property does already have a label registered',
        ' that is "', this._labels[identifier], '". Only one label is ',
        ' allowed by property.'
      ].join(''))
    }

    this._labels[identifier] = label
  }

  /**
  * Define the editor of a given property.
  *
  * @param {number} identifier - The identifier of the property to mutate.
  * @param {Component} editor - An editor for the given property.
  */
  defineEditor (identifier, editor) {
    if (this._properties[identifier] == null) {
      throw new Error([
        'Unable to define the editor of the property ', identifier.toString(),
        ' to ', editor.name, ' because the given property does not exists.'
      ].join(''))
    }

    if (this._editors[identifier] != null) {
      throw new Error([
        'Unable to define the editor of the property ',
        this._properties[identifier], ' to ', editor.name,
        ' because the given property does already have an editor registered',
        ' that is ', this._editors[identifier].name, '. Only one editor is ',
        ' allowed by property.'
      ].join(''))
    }

    this._editors[identifier] = editor
  }

  /**
  * Define the accessor of a given property.
  *
  * @param {number} identifier - The identifier of the property to mutate.
  * @param {function} accessor - An accessor for the given property.
  */
  defineAccessor (identifier, accessor) {
    if (this._properties[identifier] == null) {
      throw new Error([
        'Unable to define the accessor of the property ', identifier.toString(),
        ' to ', accessor.name, ' because the given property does not exists.'
      ].join(''))
    }

    if (this._getters[identifier] != null) {
      throw new Error([
        'Unable to define the accessor of the property ',
        this._properties[identifier], ' to ', accessor.name,
        ' because the given property does already have an accessor registered',
        ' that is ', this._getters[identifier].name, '. Only one accessor is ',
        ' allowed by property.'
      ].join(''))
    }

    this._getters[identifier] = accessor
  }

  /**
  * Define the mutator of a given property.
  *
  * @param {number} identifier - The identifier of the property to mutate.
  * @param {function} mutator - A mutator for the given property.
  */
  defineMutator (identifier, mutator) {
    if (this._properties[identifier] == null) {
      throw new Error([
        'Unable to define the mutator of the property ', identifier.toString(),
        ' to ', mutator.name, ' because the given property does not exists.'
      ].join(''))
    }

    if (this._setters[identifier] != null) {
      throw new Error([
        'Unable to define the mutator of the property ',
        this._properties[identifier], ' to ', mutator.name,
        ' because the given property does already have a mutator registered',
        ' that is ', this._setters[identifier].name, '. Only one mutator is ',
        ' allowed by property.'
      ].join(''))
    }

    this._setters[identifier] = mutator
    this._mutators[identifier] = (
      (value, ecs, component) => mutator(ecs, component, value)
    )
  }

  /**
  * Return true if the given property exists into this editor.
  *
  * @param {string} property - A property name.
  *
  * @return {boolean} True if the given property exists into this editor.
  */
  hasProperty (property) {
    return this.getIdentifier(property) != null
  }

  /**
  * Return the identifier of a given property of this editor.
  *
  * @param {string} property - A property name.
  *
  * @return {number} The identifier of the given property.
  */
  getIdentifier (property) {
    const properties = this._properties

    let left = 0
    let right = properties.length

    while (left !== right) {
      const cursor = left + ((right - left) >>> 1)
      const location = property.localeCompare(properties[cursor])

      if (location === 0) {
        return cursor
      } else if (location === 1) {
        left = cursor + 1
      } else {
        right = cursor
      }
    }

    return undefined
  }

  /**
  * @return {number} The number of properties of this editor.
  */
  getPropertyCount () {
    return this._properties.length
  }

  /**
  * Return the name of a property by using its identifier.
  *
  * @param {number} identifier - Identifier of the property to get.
  *
  * @return {string} The property identifier by the given number.
  */
  getProperty (identifier) {
    return this._properties[identifier]
  }

  /**
  * Return the editor of a property by using its identifier.
  *
  * @param {number} identifier - Identifier of the property to get.
  *
  * @return {React.Component} The editor of the given property.
  */
  getEditor (identifier) {
    return this._editors[identifier]
  }

  /**
  * Return the label of a property by using its identifier.
  *
  * @param {number} identifier - Identifier of the property to fetch.
  *
  * @return {string} The label of the given property.
  */
  getLabel (identifier) {
    return this._labels[identifier]
  }

  /**
  * Return the accessor of a property by using its identifier.
  *
  * @param {number} identifier - Identifier of the property to fetch.
  *
  * @return {function} A function that allows to access to the given property value.
  */
  getAccessor (identifier) {
    return this._getters[identifier]
  }

  /**
  * Return the mutator of a property by using its identifier.
  *
  * @param {number} identifier - Identifier of the property to fetch.
  *
  * @return {function} A function that allows to mutate the given property value.
  */
  getMutator (identifier) {
    return this._setters[identifier]
  }

  /**
  * Return true if an accessor exists for the given property.
  *
  * @param {number} identifier - Identifier of the property to fetch.
  *
  * @return {boolean} True if an accessor exists for the given property.
  */
  isReadable (identifier) {
    return this._getters[identifier] != null
  }

  /**
  * Return true if a mutator exists for the given property.
  *
  * @param {number} identifier - Identifier of the property to fetch.
  *
  * @return {boolean} True if a mutator exists for the given property.
  */
  isMutable (identifier) {
    return this._setters[identifier] != null
  }

  /**
  * Render this editor as a react component.
  *
  * @param {object} properties.value - The component to edit.
  * @param {function} properties.onChange - A listener to call for handling any component update.
  * @param {object} properties.entityComponentSystem - The parent entityComponentSystem.
  *
  * @return {React.Component} A react component.
  */
  render (properties) {
    return (
      <div className='collection collection-list'>
        { this.renderFields(properties) }
      </div>
    )
  }

  /**
  *
  */
  renderFields (properties) {
    const result = []

    for (let index = 0, size = this._properties.length; index < size; ++index) {
      const Editor = this._editors[index]
      const parameters = Object.assign({}, properties)

      if (this._getters[index]) {
        parameters.value = this._getters[index](
          properties.entityComponentSystem,
          properties.value
        )
      }

      if (this._setters[index]) {
        parameters.onChange = (value) => {
          properties.onChange(this._mutators[index].bind(null, value))
        }
      } else {
        parameters.readonly = true
      }

      result.push(
        <div className='element' key={index}>
          <div className='collection collection-list'>
            <div className='element'>{ this._labels[index] }</div>
            <div className='element'><Editor {...parameters} /></div>
          </div>
        </div>
      )
    }

    return result
  }
}
