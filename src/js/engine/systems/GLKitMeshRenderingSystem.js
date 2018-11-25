import { System, Component } from '@overseer/engine/ecs'
import { Mesh, Transform, Texture2D } from '@overseer/engine/components'
import { Matrix3f, GLContextualisation } from '@glkit'

/**
* A system that render meshes.
*/
export class GLKitMeshRenderingSystem extends System {
  constructor () {
    this._localToWorld = new Matrix3f()
    this._worldToLocal = new Matrix3f()
    this._worldToViewScale = new Matrix3f()
  }

  /**
  *
  */
  render (context, viewport) {
    if (!viewport.camera) return

    const camera = viewport.camera
    const localToWorld = this._localToWorld
    const worldToLocal = this._worldToLocal
    const worldToViewScale = this._worldToViewScale

    for (const mesh of this.manager.components(Mesh)) {
      const material = this.manager.getComponent(mesh.entity, Material)
      const program = mesh.material.program
      const glProgram = GLContextualisation.of(program, context)
      const glUniforms =  glProgram.uniforms
      const glArrayBuffer = GLContextualisation.of(mesh.geometry.arrayBuffer)
      const glElementArrayBuffer = GLContextualisation.of(mesh.geometry.elementsBuffer)

      const transform = this.manager.getComponent(mesh.entity, Transform)

      (transform) ? localToWorld.copy(transform.localToWorld)
                  : localToWorld.toIdentityMatrix()

      (transform) ? worldToLocal.copy(transform.worldToLocal)
                  : worldToLocal.toIdentityMatrix()

      let worldToView = camera.worldToView
      let viewToWorld = camera.viewToWorld

      if (transform) {
        Transform.applyUnitScale(transform.rootUnit, camera.unit, worldToView)
        Transform.applyUnitScale(camera.unit, transform.rootUnit, viewToWorld)
      }

      glProgram.use()

      if ('localToWorld' in glUniforms) glUniforms.set('localToWorld', localToWorld)
      if ('worldToLocal' in glUniforms) glUniforms.set('worldToLocal', worldToLocal)
      if ('worldToView' in glUniforms) glUniforms.set('worldToView', worldToView)
      if ('viewToWorld' in glUniforms) glUniforms.set('viewToWorld', viewToWorld)


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
