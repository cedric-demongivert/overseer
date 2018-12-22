import { Component } from '@overseer/ecs'
import { Shader as GLToolShader } from '@cedric-demongivert/gl-tool-shader'

/**
* A fragment shader.
*/
@Component({ name: 'gl-tool:shader:fragment' })
export class Fragment extends GLToolShader.Fragment { }

/**
* A vertex shader.
*/
@Component({ name: 'gl-tool:shader:vertex' })
export class Vertex extends GLToolShader.Vertex { }
