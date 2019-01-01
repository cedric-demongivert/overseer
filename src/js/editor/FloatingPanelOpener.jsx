import React, { PureComponent } from 'react'
import { Button } from 'react-bootstrap'

export class FloatingPanelOpener extends PureComponent {
  constructor (props, context) {
    super (props, context)
    this.toggle = this.toggle.bind(this)
  }

  render () {
    return (
      <div className={this.getRootElementClasses().join(' ')}>
        <Button bsStyle='link' onClick={this.toggle}>
          <span className='fas fa-bars' />
        </Button>
      </div>
    )
  }

  toggle () {
    if (this.props.onToggle) this.props.onToggle(!this.props.open)
  }

  getRootElementClasses () {
    const classes = ['floating-panel-opener']

    if (this.props.snap == null || this.props.snap.toLowerCase() == 'left') {
      classes.push('floating-panel-opener-left')
    } else if (this.props.snap.toLowerCase() == 'right') {
      classes.push('floating-panel-opener-right')
    }

    if (this.props.open) {
      classes.push('is-open')
    } else {
      classes.push('is-close')
    }

    return classes
  }
}
