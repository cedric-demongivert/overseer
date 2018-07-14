import { Descriptor } from './Descriptor'
import { GLShader } from './gl/GLShader'

/**
* A webgl shader.
*/
export class Shader extends Descriptor {
  /**
  * Create a new webgl shader from source code.
  *
  * @param {string} source - Source code of the shader to create.
  */
  constructor (source) {
    this._source = source
  }

  /**
  * Return the source code of this shader.
  *
  * @return {string} The source code of this shader.
  */
  get source () {
    return this._source
  }

  /**
  * @see Descriptor#contextualise
  */
  contextualise (context) {
    return new GLShader(context, this)
  }
}

/**
* A webgl vertex shader.
*/
export class VertexShader extends Shader {
  /**
  * Create a new vertex shader instance from some source code.
  *
  * @param {string} source - Source code of the shader to create.
  */
  constructor (source) {
    super(source)
  }
}

/**
* A webgl fragment shader.
*/
export class FragmentShader extends Shader {
  /**
  * Create a new fragment shader instance from some source code.
  *
  * @param {string} source - Source code of the shader to create.
  */
  constructor (source) {
    super(source)
  }
}

Shader.Vertex = VertexShader
Shader.Fragment = FragmentShader
