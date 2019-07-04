import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'

import { selection } from '@redux'

import { getLabel } from './getLabel'
import { Filter } from '../Filter'
import { nothing } from '../nothing'

import { ComponentEditor } from './ComponentEditor'

export class ComponentsEditor extends PureComponent {
  constructor (props, context) {
    super(props, context)

    this.handleChange = this.handleChange.bind(this)
    this.update = 0
  }

  handleChange (value) {
    this.props.onChange(value)
    this.update += 1
    this.forceUpdate()
  }

  /**
  * @see React.Component#render
  */
  render () {
    return this.isEmpty() ? this.renderEmpty() : this.renderContent()
  }

  /**
  * @return {React.node} This editor body when no entities was selected.
  */
  renderEmpty () {
    return (
      <div className={classnames('components-editor', this.props.className, 'is-empty')}>
        <div className='message'>
          Select entities to update their components.
        </div>
      </div>
    )
  }

  /**
  * @return {React.node} This editor body when entities was selected.
  */
  renderContent () {
    return (
      <div className={classnames('components-editor', this.props.className)}>
        <div className='components-editor-entity'>
          <div className='components-editor-entity-identifier'>
            { this.props.selection.last() }
          </div>
          <div className='components-editor-entity-label'>
            { getLabel(this.props.entityComponentSystem, this.props.selection.last()) }
          </div>
        </div>
        <Filter />
        <div className='collection collection-list'>
          { this.renderComponents() }
        </div>
      </div>
    )
  }

  /**
  * @return {React.node[]} All components editors of this editor.
  */
  renderComponents () {
    const types = this.props.entityComponentSystem.getTypesOfEntity(
      this.props.selection.last()
    )
    const result = []

    for (let index = 0, size = types.size; index < size; ++index) {
      const element = this.renderType(types.get(index), index)

      if (element) result.push(element)
    }

    return result
  }

  renderType (typeIdentifier, index) {
    const ecs = this.props.entityComponentSystem

    if (ecs.getHandlerOfType(typeIdentifier).hidden) return null

    return (
      <div key={index} className='element'>
        <ComponentEditor
          entityComponentSystem={ecs}
          entity={this.props.selection.last()}
          type={typeIdentifier}
          onChange={this.handleChange}
          update={this.update}
        />
      </div>
    )
  }

  /**
  * @return {boolean} True if this editor does not have components to render.
  */
  isEmpty () {
    return this.props.selection.size <= 0
  }
}

ComponentsEditor.propTypes = {
  entityComponentSystem: PropTypes.instanceOf(EntityComponentSystem).isRequired,
  selection: PropTypes.instanceOf(selection.State).isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

ComponentsEditor.defaultProps = {
  selection: selection.State.DEFAULT,
  onChange: nothing
}
