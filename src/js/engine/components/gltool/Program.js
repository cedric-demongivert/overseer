import { Component } from '@overseer/engine/ecs'
import { Program as GLToolProgram } from '@cedric-demongivert/gl-tool-shader'

/**
* A webgl program.
*/
@Component({ type: 'gl-tool:program' })
export class Program extends GLToolProgram { }
