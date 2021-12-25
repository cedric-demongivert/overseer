import { Component } from 'react'
import * as React from 'react'
import Hammer from 'react-hammerjs'
import { Button } from 'reactstrap'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'

import * as Redux from '../../redux'
import { EntityEditor } from './entities'

import { ComponentsEditor } from './ComponentsEditor'
import { EntityComponentSystemRenderer } from './EntityComponentSystemRenderer'
import { Panel } from './Panel'
import { ToolBar } from './ToolBar'
import { Anchor } from './Anchor'
import { nothing } from './nothing'

export class EntityComponentSystemEditor extends Component<EntityComponentSystemEditor.Properties> {
  public static defaultProps : EntityComponentSystemEditor.Properties = {
    entityComponentSystem: null,
    onSizeChange: nothing,
    onChange: nothing
  }

  public constructor (props : EntityComponentSystemEditor.Properties, context : any) {
    super(props, context)

    this.handleSwipe = this.handleSwipe.bind(this)
    this.handleEntityPanelChange = this.handleEntityPanelChange.bind(this)
    this.handleComponentPanelChange = this.handleComponentPanelChange.bind(this)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
    this.toggleEntityPanel = this.toggleEntityPanel.bind(this)
    this.toggleComponentPanel = this.toggleComponentPanel.bind(this)

    this.state = Redux..DEFAULT
  }

  toggleEntityPanel () {
    this.handleEntityPanelChange(openable.toggle())
  }

  toggleComponentPanel () {
    this.handleComponentPanelChange(openable.toggle())
  }

  update (event) {
    this.setState(editor.reduce(this.state, event))
  }

  handleEntityPanelChange (event) {
    this.update(editor.updateEntityPanel(event))
  }

  handleSelectionChange (event) {
    this.update(editor.updateEntitySelection(event))
  }

  handleComponentPanelChange (event) {
    this.update(editor.updateComponentPanel(event))
  }

  handleSwipe (event) {
    if (event.target instanceof HTMLCanvasElement) {
      if (
        event.center.x - event.deltaX > event.target.width - 50
        && event.deltaX < -10
      ) {
        this.handleComponentPanelChange(openable.open())
      } else if (
        event.center.x - event.deltaX < 50 &&
        event.deltaX > 10
      ) {
        this.handleEntityPanelChange(openable.open())
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

          { this.renderToolBar() }
          { this.renderEntityPanel() }
          { this.renderComponentPanel() }
        </div>
      </Hammer>
    )
  }

  renderToolBar () {
    return (
      <ToolBar snap={Anchor.TOP}>
        <ToolBar.Start>
          <Button
            className='fas fa-bars'
            onClick={this.toggleEntityPanel}
            tabIndex={openable.State.isVisible(this.state.entityPanel) ? -1 : 0}
          />
        </ToolBar.Start>

        <ToolBar.Center>

        </ToolBar.Center>

        <ToolBar.End>
          <Button
            className='fas fa-bars'
            onClick={this.toggleComponentPanel}
            tabIndex={openable.State.isVisible(this.state.componentPanel) ? -1 : 0}
          />
        </ToolBar.End>
      </ToolBar>
    )
  }

  renderEntityPanel () {
    return (
      <Panel.Floating
        snap={Anchor.LEFT}
        state={this.state.entityPanel}
        onChange={this.handleEntityPanelChange}
      >
        <Panel.Header onClick={this.toggleEntityPanel}>
          <Panel.Header.Addons end>
            <Button
              color='block'
              className='fas fa-bars'
              tabIndex={openable.State.isVisible(this.state.entityPanel) ? 0 : -1}
            />
          </Panel.Header.Addons>
          <Panel.Header.Content>Entities</Panel.Header.Content>
        </Panel.Header>
        <Panel.Body>
          <EntityEditor
            entityComponentSystem={this.props.entityComponentSystem}
            selection={this.state.entitySelection}
            onChange={this.props.onChange}
            onSelectionChange={this.handleSelectionChange}
          />
        </Panel.Body>
      </Panel.Floating>
    )
  }

  renderComponentPanel () {
    return (
      <Panel.Floating
        snap={Anchor.RIGHT}
        state={this.state.componentPanel}
        onChange={this.handleComponentPanelChange}
      >
        <Panel.Header onClick={this.toggleComponentPanel}>
          <Panel.Header.Addons end>
            <Button
              color='block'
              className='fas fa-bars'
              tabIndex={openable.State.isVisible(this.state.componentPanel) ? 0 : -1}
            />
          </Panel.Header.Addons>
          <Panel.Header.Content>Components</Panel.Header.Content>
        </Panel.Header>
        <Panel.Body>
          <ComponentsEditor
            entityComponentSystem={this.props.entityComponentSystem}
            selection={this.state.entitySelection}
            onChange={this.props.onChange}
          />
        </Panel.Body>
      </Panel.Floating>
    )
  }
}

export namespace EntityComponentSystemEditor {
  export type Properties = {
    entityComponentSystem: EntityComponentSystem,
    onSizeChange: () => void,
    onChange: (event : Redux.ECSEvent) => void
  }
}
