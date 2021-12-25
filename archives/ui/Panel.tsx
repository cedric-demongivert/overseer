import { ReactElement } from 'react'
import { ReactNode } from 'react'
import { MouseEvent } from 'react'
import { TransitionEvent } from 'react'
import * as React from 'react'
import classnames from 'classnames'

import { Openable } from './Openable'
import { Anchor } from './Anchor'

import { nothing } from './nothing'

export function Panel (props : Panel.Properties) : ReactElement {
  return (
    <div className={classnames('panel', props.className)}>
      {props.children}
    </div>
  )
}

export namespace Panel {
  export type Properties = {
    className?: string,
    children?: ReactNode
  }

  export function Header (props : Header.Properties) : ReactElement {
    return (
      <div
        className={classnames(
          'panel-header',
          props.className,
          props.onClick ? 'is-clickable' : null
        )}
        onClick={props.onClick || nothing}
      > {props.children} </div>
    )
  }

  export namespace Header {
    export type Properties = {
      className?: string,
      onClick?: (event : MouseEvent) => void,
      children?: ReactNode
    }

    export function Addons (props : Addons.Properties) : ReactElement {
      return (
        <div className={classnames(
          'panel-header-addons', props.className,
          { 'is-start': props.start, 'is-end': props.end }
        )}>{props.children}</div>
      )
    }

    export namespace Addons {
      export type Properties = {
        className?: string,
        start?: boolean,
        end?: boolean,
        children?: ReactNode
      }
    }

    export function Content (props : Content.Properties) : ReactElement {
      return (
        <div className={classnames('panel-header-content', props.className)}>
          {props.children}
        </div>
      )
    }

    export namespace Content {
      export type Properties = {
        className?: string,
        children?: ReactNode
      }
    }
  }

  export function Body (props : Body.Properties) : ReactElement {
    return (
      <div className={classnames('panel-body', props.className)}>
        {props.children}
      </div>
    )
  }

  export namespace Body {
    export type Properties = {
      className?: string,
      children?: ReactNode
    }
  }

  export function Footer (props : Footer.Properties) : ReactElement {
    return (
      <div
        className={classnames(
          'panel-footer',
          props.className,
          props.onClick ? 'is-clickable' : null
        )}
        onClick={props.onClick || nothing}
      > {props.children} </div>
    )
  }

  export namespace Footer {
    export type Properties = {
      className?: string,
      onClick?: (event : MouseEvent) => void,
      children?: ReactNode
    }

    export function Addons (props : Addons.Properties) : ReactElement {
      return (
        <div className={classnames(
          'panel-footer-addons', props.className,
          { 'is-start': props.start, 'is-end': props.end }
        )}>{props.children}</div>
      )
    }

    export namespace Addons {
      export type Properties = {
        className?: string,
        start?: boolean,
        end?: boolean,
        children?: ReactNode
      }
    }

    export function Content (props : Content.Properties) : ReactElement {
      return (
        <div className={classnames('panel-footer-content', props.className)}>
          {props.children}
        </div>
      )
    }

    export namespace Content {
      export type Properties = {
        className?: string,
        children?: ReactNode
      }
    }
  }

  /*export const Floating : Function = Openable(
    function (props : Floating.Properties = Floating.defaultProps) : ReactElement {
      return (
        <div
          className={classnames(
            'panel', 'panel-floating', 'openable',
            props.snap === Anchor.LEFT ? 'is-snap-left' : 'is-snap-right',
            props.className
          )}
          onTransitionEnd={props.onTransitionEnd}
        >{props.children}</div>
      )
    }
  )

  export namespace Floating {
    export type Properties = {
      onTransitionEnd: (event : TransitionEvent) => void,
      className?: string,
      children?: ReactNode,
      snap: Anchor
    }

    export const defaultProps : Properties = {
      onTransitionEnd: nothing,
      children: null,
      snap: Anchor.LEFT
    }
  }*/
}
