import { Viewport as ViewportData } from '../data/Viewport'
import { GSEditor } from '../editor'

export const Viewport = GSEditor({
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
      }
    },
    width: {
      label: 'Width',
      editor: GSEditor.number(),
      getter (ecs, component) { return component.width },
      setter (ecs, component, value) {
        component.width = value
      }
    },
    height: {
      label: 'Height',
      editor: GSEditor.number(),
      getter (ecs, component) { return component.height },
      setter (ecs, component, value) {
        component.height = value
      }
    },
    right: {
      label: 'Right',
      editor: GSEditor.number(),
      getter (ecs, component) { return component.right },
      setter (ecs, component, value) {
        component.right = value
      }
    },
    left: {
      label: 'Left',
      editor: GSEditor.number(),
      getter (ecs, component) { return component.left },
      setter (ecs, component, value) {
        component.left = value
      }
    },
    top: {
      label: 'Top',
      editor: GSEditor.number(),
      getter (ecs, component) { return component.top },
      setter (ecs, component, value) {
        component.top = value
      }
    },
    bottom: {
      label: 'Bottom',
      editor: GSEditor.number(),
      getter (ecs, component) { return component.bottom },
      setter (ecs, component, value) {
        component.bottom = value
      }
    },
    bottom: {
      label: 'Background',
      editor: GSEditor.color(),
      getter (ecs, component) { return component.background },
      setter (ecs, component, value) {
        component.background = value
      }
    },
  },

  name: 'Viewport',

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new ViewportData()
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
