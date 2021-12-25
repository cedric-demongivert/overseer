import { Camera } from '../components/Camera'

import { OverseerComponentType } from './OverseerComponentType'

export const CameraType: OverseerComponentType<Camera> = {
  /**
   * @see OverseerComponentType.name
   */
  name: 'Camera',

  /**
  * Editor fields.
  */
  /*properties: {
    worldToView: {
      label: 'World to view matrix',
      editor: GSEditor.matrix4f(),
      getter(ecs: EntityComponentSystem, component: Component<Camera>): Matrix4f {
        return component.data.worldToView
      },
      setter(ecs: EntityComponentSystem, component: Component<Camera>, value: Matrix4f): void {
        component.data.worldToView.copy(value)
      }
    },
    viewToWorld: {
      label: 'View to world matrix',
      editor: GSEditor.matrix4f(),
      getter(ecs: EntityComponentSystem, component: Component<Camera>): Matrix4f {
        return component.data.viewToWorld
      },
      setter(ecs: EntityComponentSystem, component: Component<Camera>, value: Matrix4f): void {
        component.data.viewToWorld.copy(value)
      }
    }
  },*/

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate() {
    return new Camera()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy(origin: Camera, target: Camera): void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear(instance: Camera): void {
    instance.clear()
  }
}