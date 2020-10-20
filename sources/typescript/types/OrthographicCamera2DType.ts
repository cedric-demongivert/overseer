import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'
import { Component } from '@cedric-demongivert/gl-tool-ecs'
import { Vector2f } from '@cedric-demongivert/gl-tool-math'

import { OrthographicCamera2D } from '../components/OrthographicCamera2D'
import { GSEditor } from '../editor/GSEditor'

import { CameraManagementSystem } from '../systems/CameraManagementSystem'
import { OverseerComponentType } from './OverseerComponentType'

export const OrthographicCamera2DType : OverseerComponentType<OrthographicCamera2D> = GSEditor({
  name: 'Orthographic Camera 2D',

  /**
  * Editor fields.
  */
  properties: {
    center: {
      label: 'Center',
      editor: GSEditor.vector2f(),
      getter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>) : Vector2f {
        return component.data.center
      },
      setter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>, value : Vector2f) : void {
        component.data.center.copy(value)
        ecs.requireSystem(CameraManagementSystem).commit(component.entity)
      }
    },
    width: {
      label: 'Width',
      editor: GSEditor.number(),
      getter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>) : number {
        return component.data.width
      },
      setter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>, value : number) : void {
        component.data.width = value
        ecs.requireSystem(CameraManagementSystem).commit(component.entity)
      }
    },
    height: {
      label: 'Height',
      editor: GSEditor.number(),
      getter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>) : number {
        return component.data.height
      },
      setter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>, value : number) : void {
        component.data.height = value
        ecs.requireSystem(CameraManagementSystem).commit(component.entity)
      }
    },
    right: {
      label: 'Right',
      editor: GSEditor.number(),
      getter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>) : number {
        return component.data.right
      },
      setter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>, value : number) : void {
        component.data.right = value
        ecs.requireSystem(CameraManagementSystem).commit(component.entity)
      }
    },
    left: {
      label: 'Left',
      editor: GSEditor.number(),
      getter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>) : number {
        return component.data.left
      },
      setter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>, value : number) : void {
        component.data.left = value
        ecs.requireSystem(CameraManagementSystem).commit(component.entity)
      }
    },
    top: {
      label: 'Top',
      editor: GSEditor.number(),
      getter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>) : number {
        return component.data.top
      },
      setter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>, value : number) : void {
        component.data.top = value
        ecs.requireSystem(CameraManagementSystem).commit(component.entity)
      }
    },
    bottom: {
      label: 'Bottom',
      editor: GSEditor.number(),
      getter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>) : number {
        return component.data.bottom
      },
      setter (ecs : EntityComponentSystem, component : Component<OrthographicCamera2D>, value : number) : void {
        component.data.bottom = value
        ecs.requireSystem(CameraManagementSystem).commit(component.entity)
      }
    },
  },

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : OrthographicCamera2D {
    return new OrthographicCamera2D()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : OrthographicCamera2D, target : OrthographicCamera2D) : void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : OrthographicCamera2D) : void {
    instance.clear()
  }
})
