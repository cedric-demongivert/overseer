import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ordering } from '@redux'

import { OrderingField } from './OrderingField'
import { nothing } from '../nothing'


export class Ordering extends PureComponent {
  constructor (props, context) {
    super(props, context)
    this.handleChange = this.handleChange.bind(this)
    this.renderChild = this.renderChild.bind(this)
  }

  handleChange (event) {
    this.props.onChange(event)
  }

  render () {
    return (
      <div className={this.getClassName()}>
        { this.renderChildren() }
      </div>
    )
  }

  renderChildren () {
    return React.Children.map(this.props.children, this.renderChild)
  }

  renderChild (child, index) {
    if (child.type === OrderingField) {
      return React.cloneElement(child, {
        onChange: this.handleChange,
        direction: this.getDirectionOfField(child.props.field),
        key: index
      })
    } else {
      return React.cloneElement(child, {
        key: index
      })
    }
  }

  /**
  * Return the direction of the given field.
  *
  * @param {number} field - A field identifier.
  *
  * @return {Direction} The direction of the given field.
  */
  getDirectionOfField (field) {
    return this.props.value.getDirectionOfField(field)
  }

  /**
  * @return {string} The class name of the root element of this component.
  */
  getClassName () {
    if (this.props.className) {
      return `ordering ${this.props.className}`
    } else {
      return 'ordering'
    }
  }
}

Ordering.Field = OrderingField

Ordering.propTypes = {
  className: PropTypes.string,
  value: PropTypes.instanceOf(ordering.State).isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.node)
}

Ordering.defaultProps = {
  className: null,
  value: ordering.State.DEFAULT,
  onChange: nothing,
  children: []
}
