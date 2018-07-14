import { Descriptor } from './Descriptor'

export class Buffer extends Descriptor {
  constructor () {
    this._usage = Buffer.STATIC_DRAW
  }

  get usage () {
    return this._usage
  }

  set usage (value) {
    this._usage = value
  }

  /**
  * Commit this buffer content for further rendering.

  * @return {Buffer} The current buffer for chaining purpose.
  */
  commit () {
    for (const contextualisation of GLContextualisation.each(this)) {
      contextualisation.dirty = true
    }

    return this
  }
}

class BufferUsage {
  constructor (value, resolver) {
    this._value = value
    this._resolver = resolver
  }

  get value () {
    return this._value
  }

  resolve (context) {
    return this._resolver(context)
  }
}

let nextIdentifier = 0
const next = () => nextIdentifier ++

Buffer.STATIC_DRAW = new BufferUsage(
  next(), context => context.STATIC_DRAW
)

Buffer.DYNAMIC_DRAW = new BufferUsage(
  next(), context => context.DYNAMIC_DRAW
)

Buffer.STREAM_DRAW = new BufferUsage(
  next(), context => context.STREAM_DRAW
)

Buffer.STATIC_READ = new BufferUsage(
  next(), context => context.STATIC_READ
)

Buffer.DYNAMIC_READ = new BufferUsage(
  next(), context => context.DYNAMIC_READ
)

Buffer.STREAM_READ = new BufferUsage(
  next(), context => context.STREAM_READ
)

Buffer.STATIC_COPY = new BufferUsage(
  next(), context => context.STATIC_COPY
)

Buffer.DYNAMIC_COPY = new BufferUsage(
  next(), context => context.DYNAMIC_COPY
)

Buffer.STREAM_COPY = new BufferUsage(
  next(), context => context.STREAM_COPY
)
