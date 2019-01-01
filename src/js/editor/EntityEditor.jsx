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
          height={this.props.height || 200}
          width={this.props.width || 300}
          rowCount={this.props.entities.length}
          rowHeight={30}
          rowRenderer={this.renderEntity}
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
        identifier={this.props.entities[index]}
        label={`Entity n°${this.props.entities[index]}`}
        selected={false}
      />
    )
  }
}
