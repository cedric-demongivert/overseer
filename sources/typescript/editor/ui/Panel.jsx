import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Openable } from './Openable'
import * as Anchor from './Anchor'

import { nothing } from './nothing'

export const Panel = (props) => (
  <div className={classnames('panel', props.className)}>
    {props.children}
  </div>
)

Panel.Header = (props) => {
  const className = classnames(
    'panel-header',
    props.className,
    props.onClick ? 'is-clickable' : null
  )

  return (
    <div className={className} onClick={props.onClick || nothing}>
      {props.children}
    </div>
  )
}

Panel.Header.Addons = (props) => (
  <div className={classnames(
    'panel-header-addons', props.className,
    { 'is-start': props.start, 'is-end': props.end }
  )}>{props.children}</div>
)

Panel.Header.Content = (props) => (
  <div className={classnames('panel-header-content', props.className)}>
    {props.children}
  </div>
)

Panel.Body = (props) => (
  <div className={classnames('panel-body', props.className)}>
    {props.children}
  </div>
)

Panel.Footer = (props) => {
  const className = classnames(
    'panel-footer',
    props.className,
    props.onClick ? 'is-clickable' : null
  )

  return (
    <div className={className} onClick={props.onClick || nothing}>
      {props.children}
    </div>
  )
}

Panel.Footer.Addons = (props) => (
  <div className={classnames(
    'panel-footer-addons', props.className,
    { 'is-start': props.start, 'is-end': props.end }
  )}>{props.children}</div>
)

Panel.Footer.Content = (props) => (
  <div className={classnames('panel-footer-content', props.className)}>
    {props.children}
  </div>
)

const Floating = (props) => (
  <div
    className={classnames(
      'panel', 'panel-floating', 'openable',
      props.snap === Anchor.LEFT ? 'is-snap-left' : 'is-snap-right',
      props.className
    )}
    onTransitionEnd={props.onTransitionEnd}
  >{props.children}</div>
)

Floating.propTypes = {
  onTransitionEnd: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  snap: PropTypes.oneOf([
    Anchor.RIGHT,
    Anchor.LEFT
  ]).isRequired
}

Floating.defaultProps = {
  onTransitionEnd: nothing,
  children: null,
  snap: Anchor.LEFT
}

Panel.Floating = Openable(Floating)
