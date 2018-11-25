import { Component } from '@overseer/engine/ecs'
import { Shader as GLToolShader } from '@cedric-demongivert/gl-tool-shader'

/**
* A fragment shader.
*/
@Component({ type: 'gl-tool:shader:fragment' })
export class Fragment extends GLToolShader.Fragment { }

/**
* A vertex shader.
*/
@Component({ type: 'gl-tool:shader:vertex' })
export class Vertex extends GLToolShader.Vertex { }
