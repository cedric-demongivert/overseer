import { ReactElement } from 'react'
import { ReactNode } from 'react'
import * as React from 'react'
import classnames from 'classnames'

import { Anchor } from './Anchor'

function getClassName (anchor : Anchor) : string {
  switch (anchor) {
    case Anchor.RIGHT : return 'is-snap-right'
    case Anchor.LEFT  : return 'is-snap-left'
    case Anchor.TOP   : return 'is-snap-top'
    default           : return 'is-snap-bottom'
  }
}

export function ToolBar (props : ToolBar.Properties = ToolBar.defaultProps) : ReactElement {
  return (
    <div className={classnames('toolbar', props.className, getClassName(props.snap))}>
      {props.children}
    </div>
  )
}

export namespace ToolBar {
  export type Properties = {
    className?: string,
    snap: Anchor,
    children?: ReactNode
  }

  export const defaultProps : Properties = {
    snap: Anchor.TOP
  }

  export function Start (props : Start.Properties) : ReactElement {
    return (
      <div className={classnames('toolbar-start', props.className)}>
        {props.children}
      </div>
    )
  }

  export namespace Start {
    export type Properties = {
      className?: string,
      children?: ReactNode
    }
  }

  export function End (props : End.Properties) : ReactElement {
    return (
      <div className={classnames('toolbar-end', props.className)}>
        {props.children}
      </div>
    )
  }

  export namespace End {
    export type Properties = {
      className?: string,
      children?: ReactNode
    }
  }

  export function Center (props : End.Properties) : ReactElement {
    return (
      <div className={classnames('toolbar-center', props.className)}>
        {props.children}
      </div>
    )
  }

  export namespace Center {
    export type Properties = {
      className?: string,
      children?: ReactNode
    }
  }
}
