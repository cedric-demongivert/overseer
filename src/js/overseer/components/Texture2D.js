import { Component } from '@overseer/ecs'
import { Texture2D as GLToolTexture2D } from '@cedric-demongivert/gl-tool-texture'

import { Texture } from './Texture'

@Component({
  name: 'gl-tool:texture:2d',
  sameAs: [Texture]
})
export class Texture2D extends GLToolTexture2D { }
