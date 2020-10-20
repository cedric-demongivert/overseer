import { Record } from 'immutable'
import { List } from 'immutable'

import { OpenableState } from '../openable/OpenableState'
import { OpenableReducer } from '../openable/OpenableReducer'
import { OpenableEvent } from '../openable/OpenableEvent'
import { Selection } from '../selection/Selection'
import { SelectionEvent } from '../selection/SelectionEvent'
import { SelectionReducer } from '../selection/SelectionReducer'

import { EditorPanel } from './EditorPanel'

const EMPTY : Editor.Properties = {
  panels: List(EditorPanel.ALL.map(() => OpenableState.CLOSED)),
  entitySelection: Selection.empty(),
  lastSelectedEntity: undefined
}

export class Editor extends Record(EMPTY) {
  public openPanel (panel : EditorPanel) : Editor {
    return this.updatePanel(panel, OpenableEvent.open())
  }

  public closePanel (panel : EditorPanel) : Editor {
    return this.updatePanel(panel, OpenableEvent.close())
  }

  public togglePanel (panel : EditorPanel) : Editor {
    return this.updatePanel(panel, OpenableEvent.toggle())
  }

  public markPanelAsOpened (panel : EditorPanel) : Editor {
    return this.updatePanel(panel, OpenableEvent.opened())
  }

  public markPanelAsClosed (panel : EditorPanel) : Editor {
    return this.updatePanel(panel, OpenableEvent.closed())
  }

  public updatePanel (panel : EditorPanel, event : OpenableEvent) : Editor {
    return this.set(
      'panels',
      this.panels.set(
        panel,
        OpenableReducer.reduce(this.panels.get(panel), event)
      )
    )
  }

  public updateEntitySelection (event : SelectionEvent) : Editor {
    return this.set(
      'entitySelection',
      SelectionReducer.reduce(this.entitySelection, event)
    )
  }
}

export namespace Editor {
  export const DEFAULT : Editor = new Editor()

  export type Properties = {
    panels             : List<OpenableState>,
    entitySelection    : Selection<number>,
    lastSelectedEntity : undefined
  }
}
