import { Component } from '@overseer/engine/ecs'
import { VertexBuffer as GLKitVertexBuffer } from '@glkit'

/**
* A fragment shader.
*/
@Component({ type: 'overseer:engine:buffer:vertex' })
export class VertexBuffer extends GLKitVertexBuffer { }
