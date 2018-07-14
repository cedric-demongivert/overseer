import { NotImplementedError } from '@errors'

export class Image2D {
  get format () {
    throw new NotImplementedError(Image2D, 'get format')
  }

  get pixels () {
    throw new NotImplementedError(Image2D, 'get pixels')
  }

  get width () {
    throw new NotImplementedError(Image2D, 'get width')
  }

  get height () {
    throw new NotImplementedError(Image2D, 'get height')
  }

  upload (context, target, level) {
    throw new NotImplementedError(Image2D, 'upload')
  }
}
