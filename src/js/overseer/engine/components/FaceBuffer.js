import { Component } from '@overseer/engine/ecs'
import { FaceBuffer as GLKitFaceBuffer } from '@glkit'

/**
* A fragment shader.
*/
@Component({ type: 'overseer:engine:buffer:face' })
export class FaceBuffer extends GLKitFaceBuffer { }
