import { getLabel } from './getLabel'

/**
* Compare two entity identifiers.
*
* @param {number} left - Left entity identifier to compare.
* @param {number} right - Right entity identifier to compare.
*
* @return {number} 1 if left is greather than right, 0 if left is equal to right, -1 otherwise.
*/
function compareEntityIdentifiers (a, b) {
  return a - b
}

/**
* Create a new entity identifier comparator for a given ecs.
*
* @param {EntityComponentSystem} ecs - An entity-component-system to use in order to do the comparison.
*
* @return {function} A comparator of entity identifiers.
*/
export function createEntityIdentifierComparator (ecs) {
  return compareEntityIdentifiers
}

/**
* Create a new entity labels comparator for a given ecs.
*
* @param {EntityComponentSystem} ecs - An entity-component-system to use in order to do the comparison.
*
* @return {function} A comparator of entity labels.
*/
export function createEntityLabelComparator (ecs) {
  /**
  * Compare the labels of two entity.
  *
  * @param {number} left - Identifier of the left entity to compare.
  * @param {number} right - Identifier of the right entity to compare.
  *
  * @return {number} 1 if left is greather than right, 0 if left is equal to right, -1 otherwise.
  */
  return function compareEntityLabels (a, b) {
    const aLabel = getLabel(ecs, a)
    const bLabel = getLabel(ecs, b)

    if (aLabel == null) return 1
    if (bLabel == null) return -1

    return aLabel.localeCompare(bLabel)
  }
}
