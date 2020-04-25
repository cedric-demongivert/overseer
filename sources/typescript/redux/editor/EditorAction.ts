export type EditorAction = string

export namespace EditorAction {
  export const OPEN_ENTITY_PANEL      : EditorAction = 'editor:panels:entity:open'
  export const CLOSE_ENTITY_PANEL     : EditorAction = 'editor:panels:entity:close'
  export const TOGGLE_ENTITY_PANEL    : EditorAction = 'editor:panels:entity:toggle'
  export const ENTITY_PANEL_OPENED    : EditorAction = 'editor:panels:entity:opened'
  export const ENTITY_PANEL_CLOSED    : EditorAction = 'editor:panels:entity:closed'

  export const OPEN_COMPONENT_PANEL   : EditorAction = 'editor:panels:component:open'
  export const CLOSE_COMPONENT_PANEL  : EditorAction = 'editor:panels:component:close'
  export const TOGGLE_COMPONENT_PANEL : EditorAction = 'editor:panels:component:toggle'
  export const COMPONENT_PANEL_OPENED : EditorAction = 'editor:panels:component:opened'
  export const COMPONENT_PANEL_CLOSED : EditorAction = 'editor:panels:component:closed'

  export const SELECT_ENTITIES        : EditorAction = 'editor:selection:entity:select'
  export const DESELECT_ENTITIES      : EditorAction = 'editor:selection:entity:deselect'
  export const RESELECT_ENTITIES      : EditorAction = 'editor:selection:entity:reselect'
  export const CLEAR_ENTITY_SELECTION : EditorAction = 'editor:selection:entity:clear'

  export const ALL                    : EditorAction[] = [
    OPEN_ENTITY_PANEL,
    CLOSE_ENTITY_PANEL,
    TOGGLE_ENTITY_PANEL,
    ENTITY_PANEL_OPENED,
    ENTITY_PANEL_CLOSED,
    OPEN_COMPONENT_PANEL,
    CLOSE_COMPONENT_PANEL,
    TOGGLE_COMPONENT_PANEL,
    COMPONENT_PANEL_OPENED,
    COMPONENT_PANEL_CLOSED,
    SELECT_ENTITIES,
    DESELECT_ENTITIES,
    RESELECT_ENTITIES,
    CLEAR_ENTITY_SELECTION
  ]
}
