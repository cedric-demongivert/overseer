import { Transformation2D as Data } from '../data/Transformation2D'
import { GSEditor } from '../editor'
import { TransformationManagementSystem } from '../systems'

export const Transformation2D = GSEditor({
  /**
  * Editor fields.
  */
  properties: {
    position: {
      label: 'Location',
      editor: GSEditor.vector2f(),
      getter (ecs, component) { return component.location },
      setter (ecs, component, value) {
        component.location = value

        ecs.requireSystem(TransformationManagementSystem).commit(
          ecs.getEntityOfInstance(component)
        )
      }
    },
    scale: {
      label: 'Scale',
      editor: GSEditor.vector2f(),
      getter (ecs, component) { return component.scale },
      setter (ecs, component, value) {
        component.scale = value

        ecs.requireSystem(TransformationManagementSystem).commit(
          ecs.getEntityOfInstance(component)
        )
      }
    },
    rotation: {
      label: 'Rotation',
      editor: GSEditor.number(),
      getter (ecs, component) {
        return (component.rotation / (2 * Math.PI)) * 360
      },
      setter (ecs, component, value) {
        component.rotation = (value / 360) * 2 * Math.PI

        ecs.requireSystem(TransformationManagementSystem).commit(
          ecs.getEntityOfInstance(component)
        )
      }
    }
  },

  name: '2D Transformation',

  /**
  * Identity transformation.
  */
  IDENTITY: new Data(),

  /**
  * @see gltool-ecs/TypeHandler#instanciate
  */
  instanciate () {
    return new Data()
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
