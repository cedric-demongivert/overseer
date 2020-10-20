export type EditorPanel = number

export namespace EditorPanel {
  export const ENTITIES_PANEL   : EditorPanel = 0
  export const COMPONENTS_PANEL : EditorPanel = 1

  export const ALL : EditorPanel[] = [
    ENTITIES_PANEL,
    COMPONENTS_PANEL
  ]

  export function toString (value : EditorPanel) : string {
    switch (value) {
      case ENTITIES_PANEL   : return 'ENTITIES_PANEL'
      case COMPONENTS_PANEL : return 'COMPONENTS_PANEL'
      default               : return undefined
    }
  }
}
