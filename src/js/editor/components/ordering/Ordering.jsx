import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { OrderingElement } from './OrderingElement'

import { $ordering } from '@redux'

export class Ordering extends PureComponent {
  constructor (props, context) {
    super(props, context)
    this.handleToggle = this.handleToggle.bind(this)
    this.renderChild = this.renderChild.bind(this)
  }

  handleToggle (field, union) {
    if (union) {
      this.props.onChange(this.props.value.toggle(field))
    } else {
      this.props.onChange(
        new $ordering.Ordering().orderBy(
          field, this.props.value.getDirectionOfField(field)
        ).toggle(field)
      )
    }
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
    if (child.type === OrderingElement) {
      return React.cloneElement(child, {
        onToggle: this.handleToggle,
        direction: this.props.value.getDirectionOfField(child.props.field),
        key: index
      })
    } else {
      return React.cloneElement(child, {
        key: index
      })
    }
  }

  getClassName () {
    if (this.props.className) {
      return `ordering ${this.props.className}`
    } else {
      return 'ordering'
    }
  }
}

Ordering.Element = OrderingElement

Ordering.propTypes = {
  className: PropTypes.string,
  value: PropTypes.instanceOf($ordering.Ordering),
  onChange: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.node)
}

Ordering.defaultProps = {
  className: null,
  value: $ordering.Ordering.EMPTY,
  onChange: _ => {},
  children: []
}
