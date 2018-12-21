import { System } from '@overseer/engine/ecs'
import { Mesh, Transform } from '@overseer/engine/components'
import { Matrix3f } from '@cedric-demongivert/gl-tool-math'
import { GLContextualisation } from '@cedric-demongivert/gl-tool-core'

/**
* A system that render meshes.
*/
export class GLToolMeshRenderingSystem extends System {
  constructor () {
    super()
    this._localToWorld = new Matrix3f()
    this._worldToLocal = new Matrix3f()
    this._worldToView = new Matrix3f()
    this._viewToWorld = new Matrix3f()
  }

  /**
  *
  */
  render (context, viewport) {
    if (!viewport.camera) return

    const camera = viewport.camera

    const unscaledWorldToView = camera.worldToView
    const unscaledViewToWorld = camera.viewToWorld
    const localToWorld = this._localToWorld
    const worldToLocal = this._worldToLocal
    const worldToView = this._worldToView
    const viewToWorld = this._viewToWorld

    for (const mesh of this.manager.getComponentsOfType(Mesh)) {
      const entity = this.manager.getEntityOfComponent(mesh)
      const material = mesh.material
      const program = material.program
      const geometry = mesh.geometry

      const glProgram = program.contextualisation(context)
      const glUniforms =  glProgram.uniforms
      const glVertices = geometry.vertexBuffer.contextualisation(context)
      const glFaces = geometry.faceBuffer.contextualisation(context)

      worldToView.copy(unscaledWorldToView)
      viewToWorld.copy(unscaledViewToWorld)

      if (this.manager.hasComponent(entity, Transform)) {
        const transform = this.manager.getComponent(entity, Transform)
        localToWorld.copy(transform.localToWorld)
        worldToLocal.copy(transform.worldToLocal)
        //Transform.applyUnitScale(transform.root.unit, camera.unit, worldToView)
        //Transform.applyUnitScale(camera.unit, transform.root.unit, viewToWorld)
      } else {
        localToWorld.toIdentity()
        worldToLocal.toIdentity()
      }

      glProgram.use()

      glUniforms.setIfExists('localToWorld', false, localToWorld.buffer)
                .setIfExists('worldToLocal', false, worldToLocal.buffer)
                .setIfExists('worldToView', false, worldToView.buffer)
                .setIfExists('viewToWorld', false, viewToWorld.buffer)

      if (!glVertices.synchronized) glVertices.synchronize()
      if (!glFaces.synchronized) glFaces.synchronize()

      glVertices.uploadTo(glProgram)
      glFaces.bind()

      context.drawElements(
        context.TRIANGLES,
        glFaces.descriptor.size * 3,
        context.UNSIGNED_SHORT,
        0
      )
    }
  }
}
