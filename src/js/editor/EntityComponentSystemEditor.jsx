import React, { Component } from 'react'
import Hammer from 'react-hammerjs'

import { EntityComponentSystemRenderer } from './EntityComponentSystemRenderer'
import { FloatingPanel } from './FloatingPanel'
import { FloatingPanelOpener } from './FloatingPanelOpener'
import { EntityEditor } from './EntityEditor'

export class EntityComponentSystemEditor extends Component {
  constructor (props, context) {
    super(props, context)
    this.handleSwipe = this.handleSwipe.bind(this)
  }

  handleSwipe (event) {
    if (event.target instanceof HTMLCanvasElement) {
      if (
        this.props.onEntitiesPanelToggle &&
        !this.props.isEntitiesPanelOpen &&
        event.center.x - event.deltaX < 50 &&
        event.deltaX > 10
      ) {
        this.props.onEntitiesPanelToggle(true)
      } else if (
        this.props.onComponentsPanelToggle &&
        !this.props.isComponentsPanelOpen &&
        event.center.x - event.deltaX > event.target.width - 50 &&
        event.deltaX < 10
      ) {
        this.props.onComponentsPanelToggle(true)
      }
    }
  }

  render () {
    return (
      <Hammer onSwipe={this.handleSwipe}>
        <div className='entity-component-system-editor'>
          <EntityComponentSystemRenderer
            entityComponentSystem={this.props.entityComponentSystem}
            onSizeChange={this.props.onSizeChange}
          />

          <FloatingPanelOpener
            snap='left'
            onToggle={this.props.onEntitiesPanelToggle}
            open={this.props.isEntitiesPanelOpen}
          />

          <FloatingPanel
            snap='left'
            title='Entitées'
            onToggle={this.props.onEntitiesPanelToggle}
            open={this.props.isEntitiesPanelOpen}
          >
            <EntityEditor
              entityComponentSystem={this.props.entityComponentSystem}
              entities={[...this.props.entityComponentSystem.entities]}
              navigable={this.props.isEntitiesPanelOpen}
            />
          </FloatingPanel>

          <FloatingPanelOpener
            snap='right'
            onToggle={this.props.onComponentsPanelToggle}
            open={this.props.isComponentsPanelOpen}
          />

          <FloatingPanel
            snap='right'
            title='Composants'
            onToggle={this.props.onComponentsPanelToggle}
            open={this.props.isComponentsPanelOpen}
          >

          </FloatingPanel>
        </div>
      </Hammer>
    )
  }
}
