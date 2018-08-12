import { Component } from '@overseer/engine/ecs'
import { Texture2D as GLKitTexture2D } from '@glkit'

@Component({ type: 'overseer:engine:texture:2d' })
export class Texture2D extends GLKitTexture2D { }
