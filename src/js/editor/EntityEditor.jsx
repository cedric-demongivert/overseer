import React, { Component } from 'react'
import { List } from 'react-virtualized'

import { EntityEditorElement } from './EntityEditorElement'

export class EntityEditor extends Component {
  constructor (props, context) {
    super(props, context)

    this.renderEntity = this.renderEntity.bind(this)
  }

  render () {
    return (
      <div className='entity-editor'>
        <List
          tabIndex={-1}
          height={this.props.height || 200}
          width={this.props.width || 300}
          rowCount={this.props.entities.length}
          rowHeight={30}
          rowRenderer={this.renderEntity.bind(this)}
        />
      </div>
    )
  }

  renderEntity ({
    index,
    isScrolling,
    isVisible,
    key,
    parent,
    style
  }) {
    return (
      <EntityEditorElement
        style={style}
        key={key}
        identifier={this.getEntity(index)}
        label={this.getLabelOfEntity(index)}
        selected={false}
        navigable={this.props.navigable}
      />
    )
  }

  getEntity (index) {
    return this.props.entities[index]
  }

  getLabelOfEntity (index) {
    return this.props.entityComponentSystem.getLabelOfEntity(
      this.props.entities[index]
    ) || `Entity ${this.props.entities[index]}`
  }
}
