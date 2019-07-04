import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'
import { ecs } from '@redux'

import { Panel } from '../Panel'
import { nothing } from '../nothing'

export class ComponentEditor extends PureComponent {
  /**
  * @see React.PureComponent#constructor
  */
  constructor (props, context) {
    super(props, context)

    this.handleChange = this.handleChange.bind(this)
  }

  /**
  * Handle an update of the edited component.
  *
  * @param {function} mutator - A mutator to apply to the edited component.
  */
  handleChange (mutator) {
    this.props.onChange(ecs.updateComponent(
      this.getComponentIdentifier(), mutator
    ))
  }

  /**
  * @see React.Component#render
  */
  render () {
    return (
      <Panel className={classnames('component-editor', this.props.className)}>
        <Panel.Header>
          <Panel.Header.Content>{this.getLabel()}</Panel.Header.Content>
        </Panel.Header>
        <Panel.Body>
          { this.renderBody() }
        </Panel.Body>
      </Panel>
    )
  }

  /**
  * @return {React.node} The body of this component editor.
  */
  renderBody () {
    const handler = this.getHandler()

    if (handler.render) {
      return handler.render({
        value: this.getComponent(),
        onChange: this.handleChange,
        entityComponentSystem: this.props.entityComponentSystem
      })
    } else {
      return [
        'Editor not configured for this component type. Please declare this ',
        'component type as hidden or write a #render function into this ',
        'component type\'s handler object.'
      ].join('')
    }
  }

  /**
  * @return {TypeHandler} The edited component's type handler.
  */
  getHandler () {
    return this.props.entityComponentSystem.getHandlerOfType(this.props.type)
  }

  /**
  * @return {string} The edited component's type name.
  */
  getLabel () {
    return this.getHandler().name
  }

  /**
  * @return {any} The edited component instance.
  */
  getComponent () {
    return this.props.entityComponentSystem.getInstance(
      this.props.entity, this.getHandler()
    )
  }

  /**
  * @return {number} The edited component's identifier.
  */
  getComponentIdentifier () {
    return this.props.entityComponentSystem.getComponent(
      this.props.entity, this.getHandler()
    )
  }
}

ComponentEditor.propTypes = {
  className: PropTypes.string,
  entityComponentSystem: PropTypes.instanceOf(EntityComponentSystem).isRequired,
  entity: PropTypes.number,
  type: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

ComponentEditor.defaultProps = {
  onChange: nothing
}
