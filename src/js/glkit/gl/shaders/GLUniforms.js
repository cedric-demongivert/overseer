import { GLType } from '../GLType'

const $isGLUniforms = Symbol('isGLUniforms')

/**
* A handler for GLUniforms valuemap proxy.
*/
const GLUniformsValueMapHandler = {
  get (target, name, receiver) {
    if (name === $isGLUniforms) {
      return true
    }

    if (name === Symbol.iterator) {
      return Object.getOwnPropertyNames(target.uniforms)[Symbol.iterator]()
    }

    GLUniforms._assertExists(name, target)
    return target.getUniform(name)
  },

  set (target, name, value, receiver) {
    GLUniforms._assertExists(name, target)
    target.use()

    const gltype = GLType.typeof(value)
    const glsize = GLType.sizeof(value)
    const glvalue = GLType.valueof(value)

    const location = target.uniforms[name].location
    const context = target.context

    if (gltype === target.uniforms[name].type) {
      switch (gltype) {
        case GLType.FLOAT:
          (glsize <= 1) ? context.uniform1f(location, glvalue) : context.uniform1fv(location, glvalue)
          break
        case GLType.FLOAT_VEC2:
          (glsize <= 1) ? context.uniform2f(location, glvalue) : context.uniform2fv(location, glvalue)
          break
        case GLType.FLOAT_VEC3:
          (glsize <= 1) ? context.uniform3f(location, glvalue) : context.uniform3fv(location, glvalue)
          break
        case GLType.FLOAT_VEC4:
          (glsize <= 1) ? context.uniform4f(location, glvalue) : context.uniform4fv(location, glvalue)
          break
        case GLType.INT:
          (glsize <= 1) ? context.uniform1i(location, glvalue) : context.uniform1iv(location, glvalue)
          break
        case GLType.INT_VEC2:
          (glsize <= 1) ? context.uniform2i(location, glvalue) : context.uniform2iv(location, glvalue)
          break
        case GLType.INT_VEC3:
          (glsize <= 1) ? context.uniform3i(location, glvalue) : context.uniform3iv(location, glvalue)
          break
        case GLType.INT_VEC4:
          (glsize <= 1) ? context.uniform4i(location, glvalue) : context.uniform4iv(location, glvalue)
          break
        case GLType.FLOAT_MAT2:
          context.uniformMatrix2fv(location, false, glvalue)
          break
        case GLType.FLOAT_MAT3:
          context.uniformMatrix3fv(location, false, glvalue)
          break
        case GLType.FLOAT_MAT4:
          context.uniformMatrix4fv(location, false, glvalue)
          break
        case GLType.SAMPLER_2D: {
          const textureUnit = target.uniforms[name].textureUnit
          context.activeTexture(context[`TEXTURE${textureUnit}`])
          context.bindTexture(context.TEXTURE_2D, glvalue)
          context.uniform1i(location, textureUnit)
        } break
        case GLType.SAMPLER_CUBE: {
          const textureUnit = target.uniforms[name].textureUnit
          context.activeTexture(context[`TEXTURE${textureUnit}`])
          context.bindTexture(context.TEXTURE_CUBE_MAP, glvalue)
          context.uniform1i(location, textureUnit)
        } break
      }
    } else {
      throw new Error([
        `Invalid value type : ${gltype} instead of `,
        `${target.uniforms[name].type}`
      ].join(''))
    }

    return true
  },

  isExtensible (target) {
    return false
  },

  has (target, name) {
    return name in target.uniforms
  },

  ownKeys (target, name) {
    return Object.getOwnPropertyNames(target.uniforms)
  }
}

/**
* A wrapper over all uniforms of a GLProgram
*/
export class GLUniforms {
  /**
  * Create a new GLUniforms wrapper.
  *
  * @param {GLProgram} program - The program to wrap.
  */
  constructor (program) {
    return new Proxy(program, GLUniformsValueMapHandler)
  }

  /**
  * @return {boolean} Always true.
  */
  get [$isGLUniforms] () {
    return true
  }

  /**
  * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Symbol/hasInstance
  */
  static [Symbol.hasInstance] (instance) {
    return instance && instance[$isGLUniforms] === true
  }

  /**
  * Assert that a uniform exists.
  *
  * @param {string} name - The uniform field name.
  * @param {GLProgram} program - The program to check.
  *
  * @throws {Error} If the uniform does not exist.
  */
  static _assertExists (name, program) {
    if (!(name in program.uniforms)) {
      throw new Error(
        `Invalid uniform name, the uniform field ${name} does not exists.`
      )
    }
  }
}
