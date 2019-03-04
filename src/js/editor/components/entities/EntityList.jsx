import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List } from 'react-virtualized'

import { EntityComponentSystem } from '@ecs'

import { EntityListElement } from './EntityListElement'

export class EntityList extends PureComponent {
  constructor (props, context) {
    super(props, context)

    this.renderElement = this.renderElement.bind(this)
  }

  render () {
    return (
      <div className='list list-entity'>
        { this.props.value.map(this.renderElement) }
      </div>
    )
  }

  renderElement (entity, index) {
    return (
      <EntityList.Element
        key={entity}
        identifier={entity}
        selected={false}
        tabIndex={this.props.navigable ? 0 : -1}
        manager={this.props.manager}
      />
    )
  }
}

EntityList.Element = EntityListElement

EntityList.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  manager: PropTypes.instanceOf(EntityComponentSystem).isRequired
}

EntityList.defaultProps = {
  value: []
}
