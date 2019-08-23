import { Transformation as TransformationData } from '../data/Transformation'
import { GSEditor } from '../editor'

export const Transformation = GSEditor({
  /**
  * Editor fields.
  */
  properties: {
    worldToLocal: {
      label: 'World to local matrix',
      editor: GSEditor.matrix4f(),
      getter (ecs, component) {
        return component.worldToLocal
      },
      setter (ecs, component, value) {
        component.worldToLocal = value
      }
    },
    localToWorld: {
      label: 'Local to world matrix',
      editor: GSEditor.matrix4f(),
      getter (ecs, component) {
        return component.localToWorld
      },
      setter (ecs, component, value) {
        component.localToWorld = value
      }
    }
  },

  name: 'Transformation',

  /**
  * Identity transformation.
  */
  IDENTITY: new TransformationData(),

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new TransformationData()
  },

  /**
  * @see gltool-ecs/TypeHandler#copy
  */
  copy (origin, target) {
    target.copy(origin)
  },

  /**
  * @see gltool-ecs/TypeHandler#reset
  */
  reset (instance) {
    instance.reset()
  }
})
