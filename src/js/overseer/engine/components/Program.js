import { Component } from '@overseer/engine/ecs'
import { Program as GLKitProgram } from '@glkit'

/**
* A webgl program.
*/
@Component({ type: 'overseer:engine:program' })
export class Program extends GLKitProgram { }
