import { NotImplementedError } from '@errors'

/**
* A set of generic geometry components.
*/
export class CommonGeometries {
  /**
  * @return {Geometry} A 1x1, centered quad geometry.
  */
  get quad () {
    throw new NotImplementedError(CommonGeometries, 'get quad')
  }
}
