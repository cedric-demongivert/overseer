import React, { PureComponent } from 'react'
import { Button } from 'react-bootstrap'
import Hammer from 'react-hammerjs'

export class FloatingPanel extends PureComponent {
  constructor (props, context) {
    super (props, context)
    this.toggle = this.toggle.bind(this)
    this.handleSwipe = this.handleSwipe.bind(this)
  }

  handleSwipe (event) {
    if (
      this.props.open &&
      this.props.snap === 'right' &&
      event.deltaX > 10
    ) {
      this.toggle()
    } else if (
      this.props.open &&
      this.props.snap === 'left' || this.props.snap == null &&
      event.deltaX < 10
    ) {
      this.toggle()
    }
  }

  render () {
    return (
      <Hammer onSwipe={this.handleSwipe}>
        <div className={this.getRootElementClasses().join(' ')}>
          <div className='floating-panel-header' onClick={this.toggle}>
            <div className='floating-panel-header-toggle' onClick={this.toggle}>
              <Button bsStyle='link' onClick={this.toggle}>
                <span className='fas fa-bars' />
              </Button>
            </div>
            <h1 className='floating-panel-header-content'>
              {this.props.title}
            </h1>
          </div>
          <div className='floating-panel-content'>
            {this.props.children}
          </div>
        </div>
      </Hammer>
    )
  }

  toggle () {
    if (this.props.onToggle) this.props.onToggle(!this.props.open)
  }

  getRootElementClasses () {
    const classes = ['floating-panel']

    if (this.props.snap == null || this.props.snap.toLowerCase() == 'left') {
      classes.push('floating-panel-left')
    } else if (this.props.snap.toLowerCase() == 'right') {
      classes.push('floating-panel-right')
    }

    if (this.props.open) {
      classes.push('is-open')
    } else {
      classes.push('is-close')
    }

    return classes
  }
}
