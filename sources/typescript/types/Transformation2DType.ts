import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'
import { Component } from '@cedric-demongivert/gl-tool-ecs'
import { Vector2f } from '@cedric-demongivert/gl-tool-math'

import { Transformation2D } from '../components/Transformation2D'
import { GSEditor } from '../editor/GSEditor'
import { TransformationManagementSystem } from '../systems/TransformationManagementSystem'

import { OverseerComponentType } from './OverseerComponentType'

export const Transformation2DType : OverseerComponentType<Transformation2D> = GSEditor({
  name: '2D Transformation',

  /**
  * Editor fields.
  */
  properties: {
    position: {
      label: 'Location',
      editor: GSEditor.vector2f(),
      getter (ecs : EntityComponentSystem, component : Component<Transformation2D>) : Vector2f {
        return component.data.location
      },
      setter (ecs : EntityComponentSystem, component : Component<Transformation2D>, value : Vector2f) : void {
        component.data.location.copy(value)
        ecs.requireSystem(TransformationManagementSystem).commit(component.entity)
      }
    },
    scale: {
      label: 'Scale',
      editor: GSEditor.vector2f(),
      getter (ecs : EntityComponentSystem, component : Component<Transformation2D>) : Vector2f {
        return component.data.size
      },
      setter (ecs : EntityComponentSystem, component : Component<Transformation2D>, value : Vector2f) : void {
        component.data.size.copy(value)
        ecs.requireSystem(TransformationManagementSystem).commit(component.entity)
      }
    },
    rotation: {
      label: 'Rotation',
      editor: GSEditor.number(),
      getter (ecs : EntityComponentSystem, component : Component<Transformation2D>) : number {
        return (component.data.rotation / (2 * Math.PI)) * 360
      },
      setter (ecs : EntityComponentSystem, component : Component<Transformation2D>, value : number) : void {
        component.data.rotation = (value / 360) * 2 * Math.PI
        ecs.requireSystem(TransformationManagementSystem).commit(component.entity)
      }
    }
  },

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : Transformation2D {
    return new Transformation2D()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : Transformation2D, target : Transformation2D) : void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : Transformation2D) : void {
    instance.clear()
  }
})
