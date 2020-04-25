import * as Action from './Action'

/**
* Update the entity selection state.
*
* @param {object} event - A selection event to propagate.
*
* @return {object} A well formed redux event.
*/
export function updateEntitySelection (event) {
  return {
    type: Action.UPDATE_ENTITY_SELECTION,
    payload: event
  }
}

/**
* Update the entity panel state.
*
* @param {object} event - An openable event to propagate.
*
* @return {object} A well formed redux event.
*/
export function updateEntityPanel (event) {
  return {
    type: Action.UPDATE_ENTITY_PANEL,
    payload: event
  }
}

/**
* Update the component panel state.
*
* @param {object} event - An openable event to propagate.
*
* @return {object} A well formed redux event.
*/
export function updateComponentPanel (event) {
  return {
    type: Action.UPDATE_COMPONENT_PANEL,
    payload: event
  }
}

/**
* Update the all panels state.
*
* @param {object} event - An openable event to propagate.
*
* @return {object} A well formed redux event.
*/
export function updatePanels (event) {
  return {
    type: Action.UPDATE_PANELS,
    payload: event
  }
}
