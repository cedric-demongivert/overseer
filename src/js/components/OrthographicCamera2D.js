import {
  OrthographicCamera2D as OrthographicCamera2DData
} from '../data/OrthographicCamera2D'

import { GSEditor } from '../editor'
import { CameraManagementSystem } from '../systems'

export const OrthographicCamera2D = GSEditor({
  /**
  * Editor fields.
  */
  properties: {
    center: {
      label: 'Center',
      editor: GSEditor.vector2f(),
      getter (ecs, component) { return component.center },
      setter (ecs, component, value) {
        component.center = value

        ecs.requireSystem(CameraManagementSystem).commit(
          ecs.getEntityOfInstance(component)
        )
      }
    },
    width: {
      label: 'Width',
      editor: GSEditor.number(),
      getter (ecs, component) { return component.width },
      setter (ecs, component, value) {
        component.width = value

        ecs.requireSystem(CameraManagementSystem).commit(
          ecs.getEntityOfInstance(component)
        )
      }
    },
    height: {
      label: 'Height',
      editor: GSEditor.number(),
      getter (ecs, component) { return component.height },
      setter (ecs, component, value) {
        component.height = value

        ecs.requireSystem(CameraManagementSystem).commit(
          ecs.getEntityOfInstance(component)
        )
      }
    },
    right: {
      label: 'Right',
      editor: GSEditor.number(),
      getter (ecs, component) { return component.right },
      setter (ecs, component, value) {
        component.right = value

        ecs.requireSystem(CameraManagementSystem).commit(
          ecs.getEntityOfInstance(component)
        )
      }
    },
    left: {
      label: 'Left',
      editor: GSEditor.number(),
      getter (ecs, component) { return component.left },
      setter (ecs, component, value) {
        component.left = value

        ecs.requireSystem(CameraManagementSystem).commit(
          ecs.getEntityOfInstance(component)
        )
      }
    },
    top: {
      label: 'Top',
      editor: GSEditor.number(),
      getter (ecs, component) { return component.top },
      setter (ecs, component, value) {
        component.top = value

        ecs.requireSystem(CameraManagementSystem).commit(
          ecs.getEntityOfInstance(component)
        )
      }
    },
    bottom: {
      label: 'Bottom',
      editor: GSEditor.number(),
      getter (ecs, component) { return component.bottom },
      setter (ecs, component, value) {
        component.bottom = value

        ecs.requireSystem(CameraManagementSystem).commit(
          ecs.getEntityOfInstance(component)
        )
      }
    },
  },

  name: 'Orthographic Camera 2D',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new OrthographicCamera2DData()
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
