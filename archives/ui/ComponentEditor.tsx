import { PureComponent } from 'react'
import { ReactElement } from 'react'
import { ReactNode } from 'react'
import * as React from 'react'
import classnames from 'classnames'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'

import { ECSEvent } from '../../redux/ecs/ECSEvent'

import { Panel } from './Panel'
import { nothing } from './nothing'

export class ComponentEditor extends PureComponent<ComponentEditor.Properties> {
  public static defaultProps : ComponentEditor.Properties = {
    component: 0,
    entityComponentSystem: null,
    onChange: nothing
  }

  /**
  * @see React.PureComponent#constructor
  */
  public constructor (props : ComponentEditor.Properties, context : any) {
    super(props, context)
    this.handleChange = this.handleChange.bind(this)
  }

  /**
  * Handle an update of the edited component.
  *
  * @param mutator - A mutator to apply to the edited component.
  */
  private handleChange (mutator : Function) : void {
    this.props.onChange(ECSEvent.updateComponent(this.props.component, mutator))
  }

  /**
  * @see React.Component#render
  */
  public render () : ReactElement {
    const handler : any = this.props.entityComponentSystem.getComponent(this.props.component).type

    return (
      <Panel className={classnames('component-editor', this.props.className)}>
        <Panel.Header>
          <Panel.Header.Content>
            { this.renderHeading(handler) }
          </Panel.Header.Content>
        </Panel.Header>
        <Panel.Body>
          { this.renderBody(handler) }
        </Panel.Body>
      </Panel>
    )
  }

  /**
  * Render the body of this editor.
  */
  private renderBody (handler : any) : ReactNode {
    if (handler.render) {
      return handler.render({
        entityComponentSystem: this.props.entityComponentSystem,
        component: this.props.component,
        onChange: this.handleChange
      })
    } else {
      return (
        'Editor not configured for this component type. Please declare this ' +
        'component type as hidden or write a #render function into this ' +
        'component type\'s handler object.'
      )
    }
  }

  /**
  * Render the heading of this editor.
  */
  private renderHeading (handler : any) : string {
    return handler.name || 'Unknown Component'
  }
}

export namespace ComponentEditor {
  export type Properties = {
    className?: string,
    entityComponentSystem: EntityComponentSystem,
    component: number,
    onChange: (event : ECSEvent) => void
  }
}
