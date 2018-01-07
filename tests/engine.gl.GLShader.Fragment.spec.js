/* eslint-env jest */

import { GLShader } from '../src/js/engine/gl'

import { createWebGLMock } from './webgl.mock.js'

const webglmock = createWebGLMock(jest)

describe('engine.gl.GLShader.Fragment', function () {
  beforeAll(webglmock.mock)
  afterAll(webglmock.unmock)

  describe('#constructor', function () {
    it('allow to construct a fragment shader', function () {
      const gl = webglmock.create()
      const id = Symbol()
      gl.createShader.mockReturnValueOnce(id)

      const shader = new GLShader.Fragment(gl)

      expect(gl.createShader).toHaveBeenCalledWith(gl.FRAGMENT_SHADER)
      expect(shader).toBeInstanceOf(GLShader)
      expect(shader).toBeInstanceOf(GLShader.Fragment)
    })
  })
})
