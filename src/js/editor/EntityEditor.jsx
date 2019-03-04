import React, { Component } from 'react'
import { List } from 'react-virtualized'

import { Ordering, OrderingElement, EntityList } from './components'
import { $ordering } from '@redux'

const FIELD_LABEL = 0
const FIELD_IDENTIFIER = 1

export class EntityEditor extends Component {
  constructor (props, context) {
    super(props, context)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      ordering: new $ordering.Ordering()
    }
  }

  handleChange (newValue) {
    console.log(newValue)
    this.setState({
      ordering: newValue
    })
  }

  render () {
    return (
      <div className='entity-editor'>
        <Ordering value={this.state.ordering} onChange={this.handleChange}>
          <OrderingElement
            field={FIELD_IDENTIFIER}
            width={60}
          >N°</OrderingElement>
          <OrderingElement field={FIELD_LABEL}>Label</OrderingElement>
        </Ordering>
        <EntityList
          value={this.props.entities}
          manager={this.props.entityComponentSystem}
          navigable
        />
      </div>
    )
  }
}
