import React, { Component } from 'react'

export class SizeAdapter extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      width: null,
      height: null
    }

    this.rootElement = React.createRef()
    this.handleWindowResize = this.handleWindowResize.bind(this)
  }

  handleWindowResize () {
    this.setState({
      width: this.rootElement.current.clientWidth,
      height: this.rootElement.current.clientHeight
    })
  }

  componentDidMount () {
    this.handleWindowResize()
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  render () {
    return (
      <div ref={this.rootElement} className='filler'>
        {
          React.cloneElement(
            this.props.children, {
              [this.props.injectWidthAs || 'width']: this.state.width,
              [this.props.injectHeightAs || 'height']: this.state.height
            }
          )
        }
      </div>
    )
  }
}
