export class RenderingLoop {
  private _loop : (timestamp : number) => void
  private _running : boolean
  private _previousTime : number
  private _executionIdentifier : number

  /**
  * Create a new rendering loop.
  *
  * @param loop - The loop function.
  */
  public constructor (loop : (timestamp : number) => void) {
    this._loop = loop
    this._running = false
    this._previousTime = null
    this._firstRenderingCallback = this._firstRenderingCallback.bind(this)
    this._secondRenderingCallback = this._secondRenderingCallback.bind(this)
    this._executionIdentifier = null
  }

  public _delta (time : number) : number {
    const seconds : number = time / 1000
    const result : number = (
      this._previousTime == null ? seconds
                                 : seconds - this._previousTime
    )

    this._previousTime = seconds

    return result
  }

  public _firstRenderingCallback (time : number) : void {
    this._loop(this._delta(time))

    if (this._running) {
      this._executionIdentifier = window.requestAnimationFrame(this._secondRenderingCallback)
    }
  }

  public _secondRenderingCallback (time : number) : void {
    this._loop(this._delta(time))

    if (this._running) {
      this._executionIdentifier = window.requestAnimationFrame(this._firstRenderingCallback)
    }
  }

  /**
  * Execute this loop only once.
  */
  public once () : void {
    this.start()
    this.stop()
  }

  /**
  * Start this rendering loop.
  */
  public start () : void {
    if (this._running) {
      throw new Error('Unable to start the rendering loop because it is already running.')
    } else {
      this._running = true
      this._executionIdentifier = window.requestAnimationFrame(this._firstRenderingCallback)
    }
  }

  /**
  * Abort the current execution.
  */
  public cancel () : void {
    if (this._running) {
      window.cancelAnimationFrame(this._executionIdentifier)
      this._running = false
      this._executionIdentifier = null
    } else {
      throw new Error('Unable to cancel the rendering loop because it is already stopped.')
    }
  }

  /**
  * Gracefully stop this rendering loop.
  */
  public stop () : void {
    if (this._running) {
      this._running = false
      this._executionIdentifier = null
    } else {
      throw new Error('Unable to stop the rendering loop because it is already stopped.')
    }
  }
}
