import { Component } from '@overseer/ecs'
import { Program as GLToolProgram } from '@cedric-demongivert/gl-tool-shader'

/**
* A webgl program.
*/
@Component({ name: 'gl-tool:program' })
export class Program extends GLToolProgram { }
