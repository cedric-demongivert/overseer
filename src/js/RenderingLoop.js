export class RenderingLoop {
  /**
  * Create a new rendering loop.
  *
  * @param {function} loop - The loop function.
  */
  constructor (loop) {
    this._loop = loop
    this._running = false
    this._previousTime = null
    this._firstRenderingCallback = this._firstRenderingCallback.bind(this)
    this._secondRenderingCallback = this._secondRenderingCallback.bind(this)
    this._executionIdentifier = null
  }

  _delta (time) {
    const seconds = time / 1000
    const result = this._previousTime == null ? seconds
                                              : seconds - this._previousTime
    this._previousTime = seconds

    return result
  }

  _firstRenderingCallback (time) {
    this._loop(this._delta(time))
    if (this._running) {
      this._executionIdentifier = window.requestAnimationFrame(
        this._secondRenderingCallback
      )
    }
  }

  _secondRenderingCallback (time) {
    this._loop(this._delta(time))
    if (this._running) {
      this._executionIdentifier = window.requestAnimationFrame(
        this._firstRenderingCallback
      )
    }
  }

  /**
  * Execute this loop only once.
  */
  once () {
    this.start()
    this.stop()
  }

  /**
  * Start this rendering loop.
  */
  start () {
    if (this._running) {
      throw new Error(
        'Unable to start the rendering loop because it is already running.'
      )
    } else {
      this._running = true
      this._executionIdentifier = window.requestAnimationFrame(
        this._firstRenderingCallback
      )
    }
  }

  /**
  * Abort the current execution.
  */
  cancel () {
    if (this._running) {
      window.cancelAnimationFrame(this._executionIdentifier)
      this._running = false
      this._executionIdentifier = null
    } else {
      throw new Error(
        'Unable to cancel the rendering loop because it is already stopped.'
      )
    }
  }

  /**
  * Gracefully stop this rendering loop.
  */
  stop () {
    if (this._running) {
      this._running = false
      this._executionIdentifier = null
    } else {
      throw new Error(
        'Unable to stop the rendering loop because it is already stopped.'
      )
    }
  }
}
