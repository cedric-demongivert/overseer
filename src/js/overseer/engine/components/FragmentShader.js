import { Component } from '@overseer/engine/ecs'
import { FragmentShader as GLKitFragmentShader } from '@glkit'

/**
* A fragment shader.
*/
@Component({ type: 'overseer:engine:shader:fragment' })
export class FragmentShader extends GLKitFragmentShader { }
