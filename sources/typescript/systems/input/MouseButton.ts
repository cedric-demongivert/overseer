export type MouseButton = number

export namespace MouseButton {
  export const NONE  : MouseButton = 0
  export const MOUSE_BUTTON_1 : MouseButton = button(0)
  export const MOUSE_BUTTON_2 : MouseButton = button(1)
  export const MOUSE_BUTTON_3 : MouseButton = button(2)

  export const ALL : MouseButton[] = [
    NONE,
    MOUSE_BUTTON_1,
    MOUSE_BUTTON_2,
    MOUSE_BUTTON_3
  ]

  export function button (index : number) : MouseButton {
    return 1 << index
  }

  export function toString (button : MouseButton) : string {
    switch (button) {
      case NONE           : return 'NONE'
      case MOUSE_BUTTON_1 : return 'MOUSE_BUTTON_1'
      case MOUSE_BUTTON_2 : return 'MOUSE_BUTTON_2'
      case MOUSE_BUTTON_3 : return 'MOUSE_BUTTON_3'
      default             : return 'MOUSE_BUTTON_' + button
    }
  }
}
