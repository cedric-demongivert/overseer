import { Editor } from './Editor'
import { EditorAction } from './EditorAction'
import { EditorEvent } from './EditorEvent'
import { EditorPanel } from './EditorPanel'

export namespace EditorReducer {
  export function reduce (state : Editor, action : EditorEvent) : Editor {
    const result : Editor = state == null ? Editor.DEFAULT : state

    switch (action.type) {
      case EditorAction.OPEN_ENTITY_PANEL:
        return result.openPanel(EditorPanel.ENTITIES_PANEL)
      case EditorAction.CLOSE_ENTITY_PANEL:
        return result.closePanel(EditorPanel.ENTITIES_PANEL)
      case EditorAction.TOGGLE_ENTITY_PANEL:
        return result.togglePanel(EditorPanel.ENTITIES_PANEL)
      case EditorAction.ENTITY_PANEL_OPENED:
        return result.markPanelAsOpened(EditorPanel.ENTITIES_PANEL)
      case EditorAction.ENTITY_PANEL_CLOSED:
        return result.markPanelAsClosed(EditorPanel.ENTITIES_PANEL)
      case EditorAction.OPEN_COMPONENT_PANEL:
        return result.openPanel(EditorPanel.COMPONENTS_PANEL)
      case EditorAction.CLOSE_COMPONENT_PANEL:
        return result.closePanel(EditorPanel.COMPONENTS_PANEL)
      case EditorAction.TOGGLE_COMPONENT_PANEL:
        return result.togglePanel(EditorPanel.COMPONENTS_PANEL)
      case EditorAction.COMPONENT_PANEL_OPENED:
        return result.markPanelAsOpened(EditorPanel.COMPONENTS_PANEL)
      case EditorAction.COMPONENT_PANEL_CLOSED:
        return result.markPanelAsClosed(EditorPanel.COMPONENTS_PANEL)
      case EditorAction.SELECT_ENTITIES:
        return result
      case EditorAction.DESELECT_ENTITIES:
        return result
      case EditorAction.RESELECT_ENTITIES:
        return result
      case EditorAction.CLEAR_ENTITY_SELECTION:
        return result
      default:
        return result
    }
  }
}
