import { Record } from 'immutable'

import { OpenableState } from '../openable/OpenableState'
import { OpenableReducer } from '../openable/OpenableReducer'
import { OpenableEvent } from '../openable/OpenableEvent'
import { Selection } from '../selection/Selection'

const EMPTY : Properties = {
  entityPanel: OpenableState.CLOSED,
  componentPanel: OpenableState.CLOSED,
  entitySelection: Selection.empty(),
  lastSelectedEntity: undefined
}

export class Editor extends Record(EMPTY) {
  public updateEntityPanel (event : OpenableEvent) : Editor {
    return this.set('entityPanel', OpenableReducer.reduce(this.entityPanel, event))
  }

  public updateComponentPanel (event : OpenableEvent) : Editor {
    return this.set('componentPanel', OpenableReducer.reduce(this.componentPanel, event))
  }

  public updateEntitySelection (event : OpenableEvent) : Editor {
    return this.set('componentPanel', OpenableReducer.reduce(this.componentPanel, event))
  }
}

export namespace Editor {
  export type Properties = {
    entityPanel        : OpenableState,
    componentPanel     : OpenableState,
    entitySelection    : Selection<number>,
    lastSelectedEntity : undefined
  }
}
