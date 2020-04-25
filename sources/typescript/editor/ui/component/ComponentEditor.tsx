import { ReactNode } from 'react'
import * as React from 'react'

export class ComponentEditor<Component> {
  private _properties : string[]
  private _getters    : Function[]
  private _setters    : Function[]
  private _mutators   : Function[]
  private _labels     : string[]
  private _editors    : Function[]

  public constructor () {
    this._properties = []
    this._getters    = []
    this._setters    = []
    this._mutators   = []
    this._labels     = []
    this._editors    = []
  }

  /**
  * Define a property.
  *
  * @param property - Name of the property to define.
  *
  * @return The identifier of the defined property.
  */
  public define (property : string) : number {
    const identifier : number = this.getIdentifier(property)

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
  * @param identifier - The identifier of the property to mutate.
  * @param label - A label for the given property.
  */
  public defineLabel (identifier : number, label : string) : void {
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
  * @param identifier - The identifier of the property to mutate.
  * @param editor - An editor for the given property.
  */
  public defineEditor (identifier : number, editor : Function) : void {
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
  * @param identifier - The identifier of the property to mutate.
  * @param accessor - An accessor for the given property.
  */
  public defineAccessor (identifier : number, accessor : Function) : void {
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
  * @param identifier - The identifier of the property to mutate.
  * @param mutator - A mutator for the given property.
  */
  public defineMutator (identifier : number, mutator : Function) : void {
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
  * @param property - A property name.
  *
  * @return True if the given property exists into this editor.
  */
  public hasProperty (property : string) : boolean {
    return this.getIdentifier(property) != null
  }

  /**
  * Return the identifier of a given property of this editor.
  *
  * @param property - A property name.
  *
  * @return The identifier of the given property.
  */
  public getIdentifier (property : string) : number {
    const properties : string[] = this._properties

    let left : number = 0
    let right : number = properties.length

    while (left !== right) {
      const cursor : number = left + ((right - left) >>> 1)
      const location : number = property.localeCompare(properties[cursor])

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
  * @return The number of properties of this editor.
  */
  public getPropertyCount () : number {
    return this._properties.length
  }

  /**
  * Return the name of a property by using its identifier.
  *
  * @param identifier - Identifier of the property to get.
  *
  * @return The property identifier by the given number.
  */
  public getProperty (identifier : number) : string {
    return this._properties[identifier]
  }

  /**
  * Return the editor of a property by using its identifier.
  *
  * @param identifier - Identifier of the property to get.
  *
  * @return The editor of the given property.
  */
  public getEditor (identifier : number) : Function {
    return this._editors[identifier]
  }

  /**
  * Return the label of a property by using its identifier.
  *
  * @param identifier - Identifier of the property to fetch.
  *
  * @return The label of the given property.
  */
  public getLabel (identifier : number) : string {
    return this._labels[identifier]
  }

  /**
  * Return the accessor of a property by using its identifier.
  *
  * @param identifier - Identifier of the property to fetch.
  *
  * @return A function that allows to access to the given property value.
  */
  public getAccessor (identifier : number) : Function {
    return this._getters[identifier]
  }

  /**
  * Return the mutator of a property by using its identifier.
  *
  * @param identifier - Identifier of the property to fetch.
  *
  * @return A function that allows to mutate the given property value.
  */
  public getMutator (identifier : number) : Function {
    return this._setters[identifier]
  }

  /**
  * Return true if an accessor exists for the given property.
  *
  * @param identifier - Identifier of the property to fetch.
  *
  * @return True if an accessor exists for the given property.
  */
  public isReadable (identifier : number) : boolean {
    return this._getters[identifier] != null
  }

  /**
  * Return true if a mutator exists for the given property.
  *
  * @param identifier - Identifier of the property to fetch.
  *
  * @return True if a mutator exists for the given property.
  */
  public isMutable (identifier : number) : boolean {
    return this._setters[identifier] != null
  }

  /**
  * Render this editor as a react component.
  *
  * @param {object} properties.value - The component to edit.
  * @param {function} properties.onChange - A listener to call for handling any component update.
  * @param {object} properties.entityComponentSystem - The parent entityComponentSystem.
  *
  * @return A react component.
  */
  public render (properties : Component) : ReactNode {
    return (
      <div className='collection collection-list'>
        { this.renderFields(properties) }
      </div>
    )
  }

  /**
  *
  */
  public renderFields (properties : Component) : ReactNode {
    const result : ReactNode[] = []

    for (let index = 0, size = this._properties.length; index < size; ++index) {
      const Editor : Function = this._editors[index]
      const parameters : any = Object.assign({}, properties)

      if (this._getters[index]) {
        parameters.value = this._getters[index](
          parameters.entityComponentSystem,
          parameters.value
        )
      }

      if (this._setters[index]) {
        parameters.onChange = (value : any) => {
          parameters.onChange(this._mutators[index].bind(null, value))
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
