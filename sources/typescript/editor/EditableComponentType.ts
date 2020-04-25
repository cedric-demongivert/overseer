import { ReactNode } from 'react'

import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'
import { ComponentType } from '@cedric-demongivert/gl-tool-ecs'
import { Component } from '@cedric-demongivert/gl-tool-ecs'

import { ComponentEditor } from './ui/component/ComponentEditor'

export interface EditableComponentType<Type> extends ComponentType<Type> {
  name : string

  properties? : EditableComponentType.Properties<Type>

  editor? : ComponentEditor<Type>

  render? : (component : Type) => ReactNode
}

export namespace EditableComponentType {
  export interface Properties<Type> {
    [key : string] : EditableComponentType.Property<Type, any>
  }

  export interface Property<DataType, PropertyType> {
    readonly label?: string
    readonly editor?: Function
    getter?(ecs : EntityComponentSystem, component : Component<DataType>) : PropertyType
    setter?(ecs : EntityComponentSystem, component : Component<DataType>, value : PropertyType) : void
  }
}
