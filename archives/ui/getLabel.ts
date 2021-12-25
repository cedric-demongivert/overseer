import { EntityComponentSystem } from '@cedric-demongivert/gl-tool-ecs'
import { Entity } from '@cedric-demongivert/gl-tool-ecs'

import { LabelType } from '../../types/LabelType'

export function getLabel (ecs : EntityComponentSystem, entity : Entity) : string {
  if (ecs.hasComponent(entity, LabelType)) {
    return ecs.getComponentOfEntity(entity, LabelType).data
  } else {
    return undefined
  }
}
