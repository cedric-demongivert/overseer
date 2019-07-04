import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'react-virtualized'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'

import { ordering, selection, ecs } from '@redux'

import { nothing } from '../nothing'
import { Ordering } from '../ordering'
import { Filter } from '../Filter'

import { Entities } from './Entities'
import { EntityEditorList } from './EntityEditorList'
import { EntityFilter } from './filtering'

import * as EntityField from './EntityField'

export class EntityEditor extends Component {
  constructor (props, context) {
    super(props, context)

    this.handleOrderingChange = this.handleOrderingChange.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)

    this.state = {
      ordering: ordering.State.DEFAULT,
      filter: EntityFilter.parse('')
    }
  }

  handleKeyUp (event) {
    if (event.key === 'Delete') {
      this.props.onChange(ecs.deleteEntities([...this.state.selection]))
      this.props.onSelectionChange(selection.clear())
      event.stopPropagation()
    }
  }

  handleOrderingChange (event) {
    this.setState(
      state => ({ ordering: ordering.reduce(state.ordering, event) })
    )
  }

  handleFilterChange (event) {
    this.setState({ filter: EntityFilter.parse(event) })
  }

  render () {
    return (
      <div
        className='entity-editor'
        onKeyUp={this.handleKeyUp}
      >
        { this.renderOrdering() }
        { this.renderFilter() }
        { this.renderList() }
      </div>
    )
  }

  renderList () {
    return (
      <Entities
        as='value'
        entityComponentSystem={this.props.entityComponentSystem}
        ordering={this.state.ordering}
      >
        <EntityEditorList
          entityComponentSystem={this.props.entityComponentSystem}
          onSelectionChange={this.props.onSelectionChange}
          selection={this.props.selection}
          filter={this.state.filter}
          navigable
        />
      </Entities>
    )
  }

  renderFilter () {
    return (
      <Filter
        value={this.state.filter.text}
        onChange={this.handleFilterChange}
        placeholder='filter'
      />
    )
  }

  renderOrdering () {
    return (
      <Ordering
        value={this.state.ordering}
        onChange={this.handleOrderingChange}
      >
        <Ordering.Field
          field={EntityField.IDENTIFIER}
          width={60}
        >N°</Ordering.Field>
        <Ordering.Field
          field={EntityField.LABEL}
        >Label</Ordering.Field>
      </Ordering>
    )
  }
}

EntityEditor.propTypes = {
  entityComponentSystem: PropTypes.instanceOf(EntityComponentSystem).isRequired,
  selection: PropTypes.instanceOf(selection.State).isRequired,
  onChange: PropTypes.func.isRequired,
  onSelectionChange: PropTypes.func.isRequired
}

EntityEditor.defaultProps = {
  selection: selection.State.DEFAULT,
  onChange: nothing,
  onSelectionChange: nothing
}
