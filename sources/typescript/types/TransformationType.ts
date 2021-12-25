import { Transformation } from '../components/Transformation'

import { OverseerComponentType } from './OverseerComponentType'

export const TransformationType: OverseerComponentType<Transformation> = {
  /**
   * @see OverseerComponentType.name
   */
  name: 'Transformation',

  /**
  * Editor fields.
  */
  /*properties: {
    worldToLocal: {
      label: 'World to local matrix',
      editor: GSEditor.matrix4f(),
      getter (ecs : EntityComponentSystem, component : Component<Transformation>) : Matrix4f {
        return component.data.worldToLocal
      },
      setter (ecs : EntityComponentSystem, component : Component<Transformation>, value : Matrix4f) : void {
        component.data.worldToLocal.copy(value)
      }
    },
    localToWorld: {
      label: 'Local to world matrix',
      editor: GSEditor.matrix4f(),
      getter (ecs : EntityComponentSystem, component : Component<Transformation>) : Matrix4f {
        return component.data.localToWorld
      },
      setter (ecs : EntityComponentSystem, component : Component<Transformation>, value : Matrix4f) : void {
        component.data.localToWorld.copy(value)
      }
    }
  },*/

  /**
  * @see OverseerComponentType.instantiate
  */
  instantiate(): Transformation {
    return new Transformation()
  },

  /**
  * @see OverseerComponentType.copy
  */
  copy(origin: Transformation, target: Transformation): void {
    target.copy(origin)
  },

  /**
  * @see OverseerComponentType.clear
  */
  clear(instance: Transformation): void {
    instance.clear()
  }
}
