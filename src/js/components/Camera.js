import { Camera as CameraData } from '../data/Camera'
import { GSEditor } from '../editor'

export const Camera = GSEditor({
  /**
  * Editor fields.
  */
  properties: {
    worldToView: {
      label: 'World to view matrix',
      editor: GSEditor.matrix4f(),
      getter (ecs, component) {
        return component.worldToView
      },
      setter (ecs, component, value) {
        component.worldToView = value
      }
    },
    viewToWorld: {
      label: 'View to world matrix',
      editor: GSEditor.matrix4f(),
      getter (ecs, component) {
        return component.viewToWorld
      },
      setter (ecs, component, value) {
        component.viewToWorld = value
      }
    }
  },

  name: 'Camera',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new CameraData()
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
