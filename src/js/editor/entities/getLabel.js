import { Label } from '../../components'

export function getLabel (ecs, entity) {
  if (ecs.hasComponent(entity, Label)) {
    return ecs.getInstance(entity, Label).get()
  } else {
    return undefined
  }
}
