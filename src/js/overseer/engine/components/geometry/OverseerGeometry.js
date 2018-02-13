import { Geometry } from './Geometry'
import { Component } from '@overseer/engine/ecs'

/**
* Define a geometry.
*/
@Component({ type: Component.typeof(Geometry) })
export class OverseerGeometry extends Geometry {

}
