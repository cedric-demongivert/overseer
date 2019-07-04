import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import * as Anchor from './Anchor'

function getClassName (snap) {
  switch (snap) {
    case Anchor.RIGHT: return 'is-snap-right'
    case Anchor.LEFT: return 'is-snap-left'
    case Anchor.TOP: return 'is-snap-top'
    default: return 'is-snap-bottom'
  }
}

export const ToolBar = (props) => (
  <div className={
    classnames('toolbar', props.className, getClassName(props.snap))
  }> {props.children} </div>
)

ToolBar.propTypes = {
  className: PropTypes.string,
  snap: PropTypes.oneOf([
    Anchor.RIGHT,
    Anchor.LEFT,
    Anchor.TOP,
    Anchor.BOTTOM
  ]).isRequired,
  children: PropTypes.node
}

ToolBar.defaultProps = {
  snap: Anchor.TOP
}

ToolBar.Start = (props) => (
  <div className={
    classnames('toolbar-start', props.className)
  }> {props.children} </div>
)

ToolBar.Start.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

ToolBar.End = (props) => (
  <div className={
    classnames('toolbar-end', props.className)
  }> {props.children} </div>
)

ToolBar.End.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

ToolBar.Center = (props) => (
  <div className={
    classnames('toolbar-center', props.className)
  }> {props.children} </div>
)

ToolBar.Center.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}
