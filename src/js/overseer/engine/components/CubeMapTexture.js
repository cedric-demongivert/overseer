import { Component } from '@overseer/engine/ecs'
import { CubeMapTexture as GLKitCubeMapTexture } from '@glkit'

@Component({ type: 'overseer:engine:texture:cube' })
export class CubeMapTexture extends GLKitCubeMapTexture { }
