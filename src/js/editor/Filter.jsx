import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import classnames from 'classnames'

import { nothing } from './nothing'

export class Filter extends PureComponent {
  /**
  * @see React/Component#constructor
  */
  constructor (props, context) {
    super(props, context)

    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleEscapeShortcut = this.handleEscapeShortcut.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.input = React.createRef()
  }

  /**
  * Do focus the input element of this filter.
  */
  handleFocus () {
    this.input.current.focus()
  }

  /**
  * Handle a change of this filter inner content.
  *
  * @param {Event} event - The change event emitted by this filter text input.
  */
  handleChange (event) {
    this.props.onChange(event.target.value)
  }

  /**
  * Handle a user clearing request.
  */
  handleClear () {
    if (this.props.value !== '') {
      this.props.onChange('')
      this.handleFocus()
    }
  }

  /**
  * Watch for an escape key releasing event.
  *
  * @param {KeyboardEvent} event - A key up event emitted by this filter text input.
  */
  handleEscapeShortcut (event) {
    if (event.key === 'Escape') this.handleClear()
  }

  /**
  * @see React/Component#render
  */
  render () {
    return (
      <div className={classnames('filter', this.props.className, { 'is-dirty': this.props.value !== '' })}>
        <Button
          className='filter-icon fas fa-search'
          onClick={this.handleFocus}
        />
        <input
          type='text'
          className='input-control filter-control'
          placeholder='filter'
          value={this.props.value}
          onChange={this.handleChange}
          onKeyUp={this.handleEscapeShortcut}
          ref={this.input}
        />
        <Button
          className='filter-clear fas fa-times'
          onClick={this.handleClear}
        />
      </div>
    )
  }
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
}

Filter.defaultProps = {
  value: '',
  placeholder: 'filter',
  onChange: nothing,
  className: null
}
