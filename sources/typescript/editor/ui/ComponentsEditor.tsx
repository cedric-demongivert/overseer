import { PureComponent } from 'react'
import { ReactElement } from 'react'
import * as React from 'react'
import classnames from 'classnames'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'
import { Entity } from '@cedric-demongivert/gl-tool-ecs'
import { ComponentType } from '@cedric-demongivert/gl-tool-ecs'
import { Sequence } from '@cedric-demongivert/gl-tool-collection'

import { ECSEvent } from '../../redux/ecs/ECSEvent'
import { Selection } from '../../redux/selection/Selection'

import { getLabel } from './getLabel'
import { Filter } from './Filter'
import { nothing } from './nothing'

import { ComponentEditor } from './ComponentEditor'

export class ComponentsEditor extends PureComponent<ComponentsEditor.Properties> {
  public static defaultProps : ComponentsEditor.Properties = {
    entityComponentSystem: null,
    selection: Selection.EMPTY,
    onChange: nothing
  }

  public update : number

  public constructor (props : ComponentsEditor.Properties, context : any) {
    super(props, context)

    this.handleChange = this.handleChange.bind(this)
    this.update = 0
  }

  public handleChange (value : ECSEvent) : void {
    this.props.onChange(value)
    this.update += 1
    this.forceUpdate()
  }

  /**
  * @see React.Component#render
  */
  public render () : ReactElement {
    return this.isEmpty() ? this.renderEmpty() : this.renderContent()
  }

  /**
  * @return This editor body when no entities was selected.
  */
  private renderEmpty () : ReactElement {
    return (
      <div className={classnames('components-editor', this.props.className, 'is-empty')}>
        <div className='message'>
          Select entities to update their components.
        </div>
      </div>
    )
  }

  /**
  * @return This editor body when entities was selected.
  */
  public renderContent () : ReactElement {
    return (
      <div className={classnames('components-editor', this.props.className)}>
        <div className='components-editor-entity'>
          <div className='components-editor-entity-identifier'>
            { this.props.selection.elements.last() }
          </div>
          <div className='components-editor-entity-label'>
            { getLabel(this.props.entityComponentSystem, this.props.selection.elements.last()) }
          </div>
        </div>
        <Filter />
        <div className='collection collection-list'>
          { this.renderComponents() }
        </div>
      </div>
    )
  }

  /**
  * @return  All components editors of this editor.
  */
  private renderComponents () : ReactElement[] {
    const types : Sequence<ComponentType<any>> = (
      this.props.entityComponentSystem.getTypesOfEntity(
        this.props.selection.elements.last()
      )
    )

    const result : ReactElement[] = []

    for (let index = 0, size = types.size; index < size; ++index) {
      const element : ReactElement = this.renderType(types.get(index), index)

      if (element) result.push(element)
    }

    return result
  }

  private renderType (type : ComponentType<any>, index : number) : ReactElement {
    const ecs : EntityComponentSystem = this.props.entityComponentSystem

    if ((type as any).hidden) {
      return null
    }

    return (
      <div key={index} className='element'>
        <ComponentEditor
          entityComponentSystem={ecs}
          component={ecs.getComponentOfEntity(this.props.selection.elements.last(), type).identifier}
          onChange={this.handleChange}
          //update={this.update}
        />
      </div>
    )
  }

  /**
  * @return True if this editor does not have components to render.
  */
  private isEmpty () : boolean {
    return this.props.selection.elements.size <= 0
  }
}

export namespace ComponentsEditor {
  export type Properties = {
    entityComponentSystem: EntityComponentSystem,
    selection: Selection<Entity>,
    className?: string,
    onChange: (event : ECSEvent) => void
  }
}
