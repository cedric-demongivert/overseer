import { Component } from '@overseer/ecs'
import { CubeMapTexture as GLToolCubeMapTexture } from '@cedric-demongivert/gl-tool-texture'

import { Texture } from './Texture'

@Component({
  name: 'gl-tool:texture:cube-map',
  sameAs: [Texture]
})
export class CubeMapTexture extends GLToolCubeMapTexture { }
