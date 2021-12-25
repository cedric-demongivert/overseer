import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'

import { selection, Match } from '@redux'

import { nothing } from '../nothing'
import { EntityEditorListElement } from './EntityEditorListElement'
import { EntityFilter } from './filtering'

export class EntityEditorList extends PureComponent {
  constructor (props, context) {
    super(props, context)

    this.renderEntity = this.renderEntity.bind(this)
  }

  handleEntityClick (event, entity) {
    if (this.props.selection.has(entity)) {
      if (event.ctrlKey) {
        this.props.onSelectionChange(selection.delete(entity))
      } else if (this.props.selection.size > 0 && event.shiftKey) {
        this.deselectUntil(entity)
      } else if (this.props.selection.size > 1) {
        this.props.onSelectionChange(selection.only(entity))
      } else {
        this.props.onSelectionChange(selection.clear())
      }
    } else {
      if (event.ctrlKey) {
        this.props.onSelectionChange(selection.add(entity))
      } else if (this.props.selection.size > 0 && event.shiftKey) {
        this.selectUntil(entity)
      } else {
        this.props.onSelectionChange(selection.only(entity))
      }
    }
  }

  selectUntil (next) {
    this.props.onSelectionChange(selection.addMany(this.takeUntil(next)))
  }

  deselectUntil (next) {
    this.props.onSelectionChange(selection.deleteMany(this.takeUntil(next)))
  }

  takeUntil (next) {
    const result = []
    const entities = this.props.value
    const previous = this.props.selection.updatedOr(entities[0])

    let stop = null
    let index = 0

    while (entities[index] !== next && entities[index] !== previous) {
      index += 1
    }

    stop = entities[index] === next ? previous : next
    if (entities[index] === previous) {
      result.push(previous)
      index += 1
    }

    while (entities[index] !== stop) {
      result.push(entities[index])
      index += 1
    }

    result.push(stop)
    if (stop === previous) result.push(next)

    return result
  }

  render () {
    return (
      <div className='collection collection-list'>
        { this.props.value.map(this.renderEntity) }
      </div>
    )
  }

  renderEntity (entity) {
    return (
      <EntityEditorList.Element
        key={entity}
        identifier={entity}
        selected={this.props.selection.has(entity)}
        tabIndex={this.props.navigable ? 0 : -1}
        entityComponentSystem={this.props.entityComponentSystem}
        onClick={event => this.handleEntityClick(event, entity)}
        filter={this.props.filter}
      />
    )
  }
}

EntityEditorList.Element = EntityEditorListElement

EntityEditorList.propTypes = {
  entityComponentSystem: PropTypes.instanceOf(EntityComponentSystem).isRequired,
  value: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  selection: PropTypes.instanceOf(selection.State).isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  filter: PropTypes.instanceOf(EntityFilter).isRequired
}

EntityEditorList.defaultProps = {
  value: [],
  selection: selection.State.DEFAULT,
  onSelectionChange: nothing,
  filter: EntityFilter.DEFAULT
}
