import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import classnames from 'classnames'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'

import { Match } from '@redux'

import { nothing } from '../nothing'
import { Highlight } from '../Highlight'
import { getLabel } from './getLabel'
import { EntityFilter } from './filtering'

const ALL_MATCH = new Match()
const NO_MATCH = new Match()

ALL_MATCH.addRange(null, null)

export class EntityEditorListElement extends PureComponent {
  render () {
    return (
      <button
        className={classnames(
          'element', { 'is-filtered': this.isFiltered() },
          { 'is-select': this.props.selected }
        )}
        onClick={this.props.onClick}
      >
        <div className='element-identifier'>
          <Highlight match={this.getIdentifierMatch()}>
            {this.props.identifier.toString()}
          </Highlight>
        </div>
        <div className='element-label'>
          <Highlight match={this.getLabelMatch()}>
            {this.getLabel()}
          </Highlight>
        </div>
      </button>
    )
  }

  getLabelMatch () {
    return this.props.filter.extractLabelMatch(this.getLabel())
  }

  getIdentifierMatch () {
    if (this.props.filter.matchIdentifier(this.props.identifier)) {
      return ALL_MATCH
    } else {
      return NO_MATCH
    }
  }

  /**
  * @return {boolean} True if this entity is filtered.
  */
  isFiltered () {
    const ecs = this.props.entityComponentSystem
    const filter = this.props.filter

    const matchLabel = filter.matchLabel(this.getLabel())
    const matchIdentifier = filter.matchIdentifier(this.props.identifier)

    return (matchLabel === false && !matchIdentifier) ||
           (matchIdentifier === false && !matchLabel)
  }

  getLabel () {
    return getLabel(
      this.props.entityComponentSystem,
      this.props.identifier
    ) || `Entity ${this.props.identifier}`
  }
}

EntityEditorListElement.propTypes = {
  identifier: PropTypes.number.isRequired,
  entityComponentSystem: PropTypes.instanceOf(EntityComponentSystem).isRequired,
  selected: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  filter: PropTypes.instanceOf(EntityFilter).isRequired
}

EntityEditorListElement.defaultProps = {
  selected: false,
  tabIndex: 0,
  onClick: nothing,
  filter: EntityFilter.DEFAULT
}
