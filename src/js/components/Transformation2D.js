import { Transformation2D as Data } from '../data/Transformation2D'
import { GSEditor } from '../editor'
import { TransformationSystem } from '../systems'

function requireSystem (ecs, type) {
  const systems = ecs.systems

  for (let index = 0, size = systems.size; index < size; ++index) {
    if (systems.get(index) instanceof type) {
      return systems.get(index)
    }
  }

  throw new Error()
}

export const Transformation2D = GSEditor({
  /**
  * Editor fields.
  */
  properties: {
    position: {
      label: 'Location',
      editor: GSEditor.vector2f(),
      getter (component) { return component.location },
      setter (component, value, ecs) {
        component.location = value

        requireSystem(ecs, TransformationSystem).commit(
          ecs.getEntityOfInstance(component)
        )
      }
    },
    scale: {
      label: 'Scale',
      editor: GSEditor.vector2f(),
      getter (component) { return component.scale },
      setter (component, value, ecs) {
        component.scale = value

        requireSystem(ecs, TransformationSystem).commit(
          ecs.getEntityOfInstance(component)
        )
      }
    },
    rotation: {
      label: 'Rotation',
      editor: GSEditor.number(),
      getter (component) {
        return (component.rotation / (2 * Math.PI)) * 360
      },
      setter (component, value, ecs) {
        component.rotation = (value / 360) * 2 * Math.PI

        requireSystem(ecs, TransformationSystem).commit(
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
