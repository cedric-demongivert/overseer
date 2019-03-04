import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

import { EntityComponentSystem } from '@ecs'

export class EntityListElement extends PureComponent {
  render () {
    return (
      <button className={this.getClassName()} tabIndex={this.props.tabIndex}>
        <div className='list-entity-element-identifier'>
          {this.props.identifier}
        </div>
        <div className='list-entity-element-label'>
          {this.getLabel()}
        </div>
      </button>
    )
  }

  getClassName () {
    const result = ['list-element list-entity-element']

    result.push(`list-entity-element-${this.props.identifier}`)
    if (this.props.selected) result.push('is-select')

    return result.join(' ')
  }

  getLabel () {
    return this.props.manager.getLabelOfEntity(this.props.identifier) ||
           `Entity ${this.props.identifier}`
  }
}

EntityListElement.propTypes = {
  identifier: PropTypes.number.isRequired,
  manager: PropTypes.instanceOf(EntityComponentSystem).isRequired,
  selected: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number.isRequired
}

EntityListElement.defaultProps = {
  selected: false,
  tabIndex: 0
}
