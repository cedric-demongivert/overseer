import { System, Component } from '@overseer/engine/ecs'

import {
  GLKitGeometryBank,
  GLKitProgramBank,
  GLKitTexture2DBank
} from '@overseer/engine/services'

import { Mesh, Transform, Texture2D } from '@overseer/engine/components'

import { Matrix3f } from '@glkit'

/**
* A system that render meshes.
*/
export class GLKitMeshRenderingSystem extends System {
  /**
  *
  */
  render (gl, viewport) {
    if (!viewport.camera) return

    const camera = viewport.camera

    const textures = this.service(GLKitTexture2DBank.of(gl))
    const buffers = this.service(GLKitGeometryBank.of(gl))
    const programs = this.service(GLKitProgramBank.of(gl))

    for (const mesh of this.manager.components(Mesh)) {
      const program = mesh.material.program
      const glProgram = programs.getProgram(program)
      const glUniforms = programs.getUniforms(program)
      const glArrayBuffer = buffers.getArrayBuffer(mesh.geometry)
      const glElementArrayBuffer = buffers.getElementArrayBuffer(mesh.geometry)

      const transform = this.manager.getComponent(mesh.entity, Transform)
      const localToWorld = (transform) ? transform.localToWorld : Matrix3f.identity
      const worldToLocal = (transform) ? transform.worldToLocal : Matrix3f.identity
      const worldToView = camera.worldToView
      const viewToWorld = camera.viewToWorld

      glProgram.use()

      if ('localToWorld' in glUniforms) glUniforms.localToWorld = localToWorld
      if ('worldToLocal' in glUniforms) glUniforms.worldToLocal = worldToLocal
      if ('worldToView' in glUniforms) glUniforms.worldToView = worldToView
      if ('viewToWorld' in glUniforms) glUniforms.viewToWorld = viewToWorld

      for (const key in mesh.material.uniforms) {
        const value = mesh.material.uniforms[key]

        if (Component.is(value) && value.type === Component.typeof(Texture2D)) {
          glUniforms[key] = textures.get(value)
        } else {
          glUniforms[key] = value
        }
      }

      glProgram.useAttributes(glArrayBuffer, mesh.geometry.format)
      glElementArrayBuffer.bind()

      gl.drawElements(
        gl.TRIANGLES,
        mesh.geometry.faces * 3,
        gl.UNSIGNED_SHORT,
        0
      )
    }
  }
}
