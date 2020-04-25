import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'
import { Component } from '@cedric-demongivert/gl-tool-ecs'
import { Vector2f } from '@cedric-demongivert/gl-tool-math'
import { Vector3f } from '@cedric-demongivert/gl-tool-math'

import { Viewport } from '../components/Viewport'
import { GSEditor } from '../editor/GSEditor'

import { OverseerComponentType } from './OverseerComponentType'

export const ViewportType : OverseerComponentType<Viewport> = GSEditor({
  name: 'Viewport',

  /**
  * Editor fields.
  */
  properties: {
    center: {
      label: 'Center',
      editor: GSEditor.vector2f(),
      getter (ecs : EntityComponentSystem, component : Component<Viewport>) : Vector2f {
        return component.data.center
      },
      setter (ecs : EntityComponentSystem, component : Component<Viewport>, value : Vector2f) : void {
        component.data.center = value
      }
    },
    width: {
      label: 'Width',
      editor: GSEditor.number(),
      getter (ecs : EntityComponentSystem, component : Component<Viewport>) : number {
        return component.data.width
      },
      setter (ecs : EntityComponentSystem, component : Component<Viewport>, value : number) : void {
        component.data.width = value
      }
    },
    height: {
      label: 'Height',
      editor: GSEditor.number(),
      getter (ecs : EntityComponentSystem, component : Component<Viewport>) : number {
        return component.data.height
      },
      setter (ecs : EntityComponentSystem, component : Component<Viewport>, value : number) : void {
        component.data.height = value
      }
    },
    right: {
      label: 'Right',
      editor: GSEditor.number(),
      getter (ecs : EntityComponentSystem, component : Component<Viewport>) : number {
        return component.data.right
      },
      setter (ecs : EntityComponentSystem, component : Component<Viewport>, value : number) : void {
        component.data.right = value
      }
    },
    left: {
      label: 'Left',
      editor: GSEditor.number(),
      getter (ecs : EntityComponentSystem, component : Component<Viewport>) : number {
        return component.data.left
      },
      setter (ecs : EntityComponentSystem, component : Component<Viewport>, value : number) : void {
        component.data.left = value
      }
    },
    top: {
      label: 'Top',
      editor: GSEditor.number(),
      getter (ecs : EntityComponentSystem, component : Component<Viewport>) : number {
        return component.data.top
      },
      setter (ecs : EntityComponentSystem, component : Component<Viewport>, value : number) : void {
        component.data.top = value
      }
    },
    bottom: {
      label: 'Bottom',
      editor: GSEditor.number(),
      getter (ecs : EntityComponentSystem, component : Component<Viewport>) : number {
        return component.data.bottom
      },
      setter (ecs : EntityComponentSystem, component : Component<Viewport>, value : number) : void {
        component.data.bottom = value
      }
    },
    background: {
      label: 'Background',
      editor: GSEditor.color(),
      getter (ecs : EntityComponentSystem, component : Component<Viewport>) : Vector3f {
        return component.data.background
      },
      setter (ecs : EntityComponentSystem, component : Component<Viewport>, value : Vector3f) : void {
        component.data.background.copy(value)
      }
    },
  },

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate () : Viewport {
    return new Viewport()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy (origin : Viewport, target : Viewport) : void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear (instance : Viewport) : void {
    instance.clear()
  }
})
