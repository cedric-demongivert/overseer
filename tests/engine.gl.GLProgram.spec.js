/* eslint-env jest */

import { GLShader, GLProgram } from '../src/js/engine/gl'

import { createWebGLMock } from './webgl.mock.js'

const webglmock = createWebGLMock(jest)

describe('engine.gl.GLProgram', function () {
  beforeAll(webglmock.mock)
  afterAll(webglmock.unmock)

  describe('#constructor', function () {
    it('allow to construct a program from two shaders', function () {
      const gl = webglmock.create()
      const programid = Symbol()

      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)

      expect(gl.createProgram).toHaveBeenCalled()
      expect(program).toBeInstanceOf(GLProgram)
      expect(program.vertex).toBeNull()
      expect(program.fragment).toBeNull()
      expect(program.linked).toBeFalsy()
    })
  })

  describe('#set vertex', function () {
    it('allow to attach a vertex shader to the program', function () {
      const gl = webglmock.create()
      const programid = Symbol()
      const shaderid = Symbol()

      gl.createShader.mockReturnValueOnce(shaderid)
      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)
      const shader = new GLShader.Vertex(gl)
      Object.defineProperty(shader, 'type', { value: gl.VERTEX_SHADER })

      program.vertex = shader

      expect(program.vertex).toBe(shader)
      expect(gl.attachShader).toHaveBeenCalledWith(programid, shaderid)
      expect(gl.detachShader).not.toHaveBeenCalled()
    })

    it('throw if the shader come from another context', function () {
      const gl = webglmock.create()
      const gl2 = webglmock.create()
      const programid = Symbol()
      const shaderid = Symbol()

      gl.createShader.mockReturnValueOnce(shaderid)
      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)
      const shader = new GLShader.Vertex(gl2)
      Object.defineProperty(shader, 'type', { value: gl.VERTEX_SHADER })

      expect(_ => { program.vertex = shader }).toThrow()
    })

    it('throw if the shader is a fragment shader', function () {
      const gl = webglmock.create()
      const programid = Symbol()
      const shaderid = Symbol()

      gl.createShader.mockReturnValueOnce(shaderid)
      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)
      const shader = new GLShader.Fragment(gl)
      Object.defineProperty(shader, 'type', { value: gl.FRAGMENT_SHADER })

      expect(_ => { program.vertex = shader }).toThrow()
    })

    it('allow to detach a vertex shader of the program', function () {
      const gl = webglmock.create()
      const programid = Symbol()
      const shaderid = Symbol()

      gl.createShader.mockReturnValueOnce(shaderid)
      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)
      const shader = new GLShader.Vertex(gl)
      Object.defineProperty(shader, 'type', { value: gl.VERTEX_SHADER })

      program.vertex = shader

      gl.attachShader.mockClear()
      gl.detachShader.mockClear()

      program.vertex = null

      expect(program.vertex).toBeNull()
      expect(gl.attachShader).not.toHaveBeenCalledWith()
      expect(gl.detachShader).toHaveBeenCalledWith(programid, shaderid)
    })

    it('allow to replace a vertex shader of the program', function () {
      const gl = webglmock.create()
      const programid = Symbol()
      const shaderid = Symbol()
      const shaderid2 = Symbol()

      gl.createShader.mockReturnValueOnce(shaderid)
      gl.createShader.mockReturnValueOnce(shaderid2)
      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)
      const shader = new GLShader.Vertex(gl)
      Object.defineProperty(shader, 'type', { value: gl.VERTEX_SHADER })
      const shader2 = new GLShader.Vertex(gl)
      Object.defineProperty(shader2, 'type', { value: gl.VERTEX_SHADER })

      program.vertex = shader

      gl.attachShader.mockClear()
      gl.detachShader.mockClear()

      program.vertex = shader2

      expect(program.vertex).toBe(shader2)
      expect(gl.attachShader).toHaveBeenCalledWith(programid, shaderid2)
      expect(gl.detachShader).toHaveBeenCalledWith(programid, shaderid)
    })
  })

  describe('#set fragment', function () {
    it('allow to attach a fragment shader to the program', function () {
      const gl = webglmock.create()
      const programid = Symbol()
      const shaderid = Symbol()

      gl.createShader.mockReturnValueOnce(shaderid)
      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)
      const shader = new GLShader.Fragment(gl)
      Object.defineProperty(shader, 'type', { value: gl.FRAGMENT_SHADER })

      program.fragment = shader

      expect(program.fragment).toBe(shader)
      expect(gl.attachShader).toHaveBeenCalledWith(programid, shaderid)
      expect(gl.detachShader).not.toHaveBeenCalled()
    })

    it('throw if the shader come from another context', function () {
      const gl = webglmock.create()
      const gl2 = webglmock.create()
      const programid = Symbol()
      const shaderid = Symbol()

      gl.createShader.mockReturnValueOnce(shaderid)
      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)
      const shader = new GLShader.Fragment(gl2)
      Object.defineProperty(shader, 'type', { value: gl.FRAGMENT_SHADER })

      expect(_ => { program.fragment = shader }).toThrow()
    })

    it('throw if the shader is a fragment shader', function () {
      const gl = webglmock.create()
      const programid = Symbol()
      const shaderid = Symbol()

      gl.createShader.mockReturnValueOnce(shaderid)
      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)
      const shader = new GLShader.Fragment(gl)
      Object.defineProperty(shader, 'type', { value: gl.VERTEX_SHADER })

      expect(_ => { program.fragment = shader }).toThrow()
    })

    it('allow to detach a fragment shader of the program', function () {
      const gl = webglmock.create()
      const programid = Symbol()
      const shaderid = Symbol()

      gl.createShader.mockReturnValueOnce(shaderid)
      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)
      const shader = new GLShader.Fragment(gl)
      Object.defineProperty(shader, 'type', { value: gl.FRAGMENT_SHADER })

      program.fragment = shader

      gl.attachShader.mockClear()
      gl.detachShader.mockClear()

      program.fragment = null

      expect(program.fragment).toBeNull()
      expect(gl.attachShader).not.toHaveBeenCalledWith()
      expect(gl.detachShader).toHaveBeenCalledWith(programid, shaderid)
    })

    it('allow to replace a fragment shader of the program', function () {
      const gl = webglmock.create()
      const programid = Symbol()
      const shaderid = Symbol()
      const shaderid2 = Symbol()

      gl.createShader.mockReturnValueOnce(shaderid)
      gl.createShader.mockReturnValueOnce(shaderid2)
      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)
      const shader = new GLShader.Fragment(gl)
      Object.defineProperty(shader, 'type', { value: gl.FRAGMENT_SHADER })
      const shader2 = new GLShader.Fragment(gl)
      Object.defineProperty(shader2, 'type', { value: gl.FRAGMENT_SHADER })

      program.fragment = shader

      gl.attachShader.mockClear()
      gl.detachShader.mockClear()

      program.fragment = shader2

      expect(program.fragment).toBe(shader2)
      expect(gl.attachShader).toHaveBeenCalledWith(programid, shaderid2)
      expect(gl.detachShader).toHaveBeenCalledWith(programid, shaderid)
    })
  })

  describe('#get logs', function () {
    it('return program info logs', function () {
      const gl = webglmock.create()
      const programid = Symbol()

      gl.createProgram.mockReturnValueOnce(programid)
      gl.getProgramInfoLog.mockReturnValueOnce('logs')

      const program = new GLProgram(gl)

      expect(program.logs).toBe('logs')
      expect(gl.getProgramInfoLog).toHaveBeenCalledWith(programid)
    })
  })

  describe('#link', function () {
    function init (gl, programid) {
      const fragmentid = Symbol()
      const vertexid = Symbol()

      gl.createShader.mockReturnValueOnce(fragmentid)
      gl.createShader.mockReturnValueOnce(vertexid)
      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)
      const fragment = new GLShader.Fragment(gl)
      Object.defineProperty(fragment, 'type', { value: gl.FRAGMENT_SHADER })
      fragment.compile = jest.fn()
      const vertex = new GLShader.Vertex(gl)
      Object.defineProperty(vertex, 'type', { value: gl.VERTEX_SHADER })
      vertex.compile = jest.fn()

      program.fragment = fragment
      program.vertex = vertex

      return program
    }

    it('link the program', function () {
      const gl = webglmock.create()
      const programid = Symbol()
      const program = init(gl, programid)
      gl.getProgramParameter.mockReturnValueOnce(true)

      program.link()

      expect(program.linked).toBeTruthy()
      expect(gl.linkProgram).toHaveBeenCalledWith(programid)
      expect(program.vertex.compile).toHaveBeenCalled()
      expect(program.fragment.compile).toHaveBeenCalled()
    })

    it('only link the program once', function () {
      const gl = webglmock.create()
      const programid = Symbol()
      const program = init(gl, programid)
      gl.getProgramParameter.mockReturnValueOnce(true)

      program.link()
      gl.linkProgram.mockClear()
      program.link()
      expect(gl.linkProgram).not.toHaveBeenCalled()
    })

    it('throw an error if the link operation fail', function () {
      const gl = webglmock.create()
      const programid = Symbol()
      const program = init(gl, programid)
      gl.getProgramParameter.mockReturnValueOnce(false)

      expect(_ => program.link()).toThrow()
    })
  })

  describe('#use', function () {
    function init (gl, programid) {
      const fragmentid = Symbol()
      const vertexid = Symbol()

      gl.createShader.mockReturnValueOnce(fragmentid)
      gl.createShader.mockReturnValueOnce(vertexid)
      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)
      const fragment = new GLShader.Fragment(gl)
      Object.defineProperty(fragment, 'type', { value: gl.FRAGMENT_SHADER })
      fragment.compile = jest.fn()
      const vertex = new GLShader.Vertex(gl)
      Object.defineProperty(vertex, 'type', { value: gl.VERTEX_SHADER })
      vertex.compile = jest.fn()

      program.fragment = fragment
      program.vertex = vertex

      return program
    }

    it('use the program', function () {
      const gl = webglmock.create()
      const programid = Symbol()
      const program = init(gl, programid)
      gl.getProgramParameter.mockReturnValueOnce(true)

      program.use()

      expect(gl.linkProgram).toHaveBeenCalled()
      expect(gl.useProgram).toHaveBeenCalledWith(programid)
    })
  })

  describe('#destroy', function () {
    it('use the program', function () {
      const gl = webglmock.create()
      const programid = Symbol()
      const fragmentid = Symbol()
      const vertexid = Symbol()

      gl.createShader.mockReturnValueOnce(fragmentid)
      gl.createShader.mockReturnValueOnce(vertexid)
      gl.createProgram.mockReturnValueOnce(programid)

      const program = new GLProgram(gl)
      const fragment = new GLShader.Fragment(gl)
      Object.defineProperty(fragment, 'type', { value: gl.FRAGMENT_SHADER })
      const vertex = new GLShader.Vertex(gl)
      Object.defineProperty(vertex, 'type', { value: gl.VERTEX_SHADER })

      program.fragment = fragment
      program.vertex = vertex

      program.destroy()

      expect(gl.detachShader).toHaveBeenCalledTimes(2)
      expect(gl.deleteProgram).toHaveBeenCalledWith(programid)
    })
  })
})
