import React, { PureComponent } from 'react'
import { Button } from 'reactstrap'

export class EntityEditorElement extends PureComponent {
  getRootElementClasses () {
    const result = ['entity-editor-element']

    result.push(`entity-${this.props.identifier}`)

    if (this.props.selected) {
      result.push('is-select')
    }

    return result
  }

  render () {
    return (
      <div
        style={this.props.style}
        className={this.getRootElementClasses().join(' ')}
      >
        <Button block color='primary'>
          <div className='entity-editor-element-identifier'>
            {this.props.identifier}
          </div>
          <div className='entity-editor-element-label'>
            {this.props.label}
          </div>
        </Button>
      </div>
    )
  }
}
