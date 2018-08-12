import { Component } from '@overseer/engine/ecs'
import { VertexShader as GLKitVertexShader } from '@glkit'

/**
* A vertex shader.
*/
@Component({ type: 'overseer:engine:shader:vertex' })
export class VertexShader extends GLKitVertexShader { }
