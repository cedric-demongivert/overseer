import { Pack } from '@cedric-demongivert/gl-tool-collection'

import { Matrix4f } from '@cedric-demongivert/gl-tool-math'
import { Vector4f } from '@cedric-demongivert/gl-tool-math'

import { Entity } from '@cedric-demongivert/gl-tool-ecs'

import { WebGLUniforms } from '@cedric-demongivert/gl-tool-shader'
import { WebGLAttributes } from '@cedric-demongivert/gl-tool-shader'
import { ProgramCollection } from '@cedric-demongivert/gl-tool-shader'
import { WebGLProgramCollection } from '@cedric-demongivert/gl-tool-shader'
import { ProgramIdentifier } from '@cedric-demongivert/gl-tool-shader'
import { ShaderCollection } from '@cedric-demongivert/gl-tool-shader'
import { ShaderIdentifier } from '@cedric-demongivert/gl-tool-shader'
import { ShaderType } from '@cedric-demongivert/gl-tool-shader'

import { WebGLGeometryCollection } from '@cedric-demongivert/gl-tool-buffer'
import { GeometryCollection } from '@cedric-demongivert/gl-tool-buffer'
import { GeometryIdentifier } from '@cedric-demongivert/gl-tool-buffer'
import { WebGLBufferUsage } from '@cedric-demongivert/gl-tool-buffer'

import { OverseerSystem } from '../OverseerSystem'
import { UnitManagementSystem } from '../UnitManagementSystem'
import { WebGLRenderingPass } from '../WebGLRenderingPass'

import { SquareGrid } from '../../components/SquareGrid'
import { Unit } from '../../components/Unit'

import { SquareGridType } from '../../types/SquareGridType'

import { GridGeometry } from './GridGeometry'
import { GridShader } from './GridShader'

const SHADER_CAPACITY : number = 2
const PROGRAM_CAPACITY : number = 1

const VERTEX_SHADER : number = 0
const SQUARE_SHADER : number = 1

const SQUARE_PROGRAM : number = 0

export class WebGLGridRenderingSystem extends OverseerSystem {
  private _unitManagementSystem : UnitManagementSystem

  private _geometryCollection : GeometryCollection
  private _shaderCollection : ShaderCollection
  private _programCollection : ProgramCollection

  private _geometry : GeometryIdentifier
  private readonly _shaders : Pack<ShaderIdentifier>
  private readonly _programs : Pack<ProgramIdentifier>

  private readonly _attributes : WebGLAttributes
  private readonly _uniforms : WebGLUniforms

  private readonly _viewToWorld : Matrix4f
  private readonly _pixelSize : Vector4f

  /**
  * Create a new system that render meshes.
  */
  public constructor () {
    super()
    this._unitManagementSystem = null
    this._geometryCollection = null
    this._shaderCollection = null
    this._programCollection = null

    this._geometry = 0
    this._shaders = Pack.uint32(SHADER_CAPACITY)
    this._programs = Pack.uint32(PROGRAM_CAPACITY)

    this._attributes = new WebGLAttributes()
    this._uniforms = new WebGLUniforms()

    this._viewToWorld = new Matrix4f()
    this._pixelSize = new Vector4f()
  }

  /**
  * @see gltool-ecs/System.initialize
  */
  public initialize () : void {
    this.initializeSystems()
    this.initializeGeometry()
    this.initializeShaders()
    this.initializePrograms()
  }

  /**
  * Load all system required by this grid rendering system.
  */
  private initializeSystems () : void {
    this._unitManagementSystem = this.manager.requireSystem(UnitManagementSystem)
    this._geometryCollection = this.manager.requireSystem(GeometryCollection)
    this._shaderCollection = this.manager.requireSystem(ShaderCollection)
    this._programCollection = this.manager.requireSystem(ProgramCollection)
  }

  /**
  * Load the grid geometry to use for rendering.
  */
  private initializeGeometry () : void {
    const geometryCollection : GeometryCollection = this._geometryCollection

    const geometry : GeometryIdentifier = geometryCollection.create()

    geometryCollection.setFaces(geometry, GridGeometry.FACES)
    geometryCollection.setVertices(geometry, GridGeometry.VERTICES)
    geometryCollection.commit(geometry)

    this._geometry = geometry
  }

  /**
  * Load all shaders required in order to render grids.
  */
  private initializeShaders () : void {
    const shaderCollection : ShaderCollection = this._shaderCollection

    const vertex : ShaderIdentifier = shaderCollection.create(ShaderType.VERTEX)
    const square : ShaderIdentifier = shaderCollection.create(ShaderType.FRAGMENT)

    shaderCollection.setSource(vertex, GridShader.VERTEX)
    shaderCollection.setSource(square, GridShader.SQUARE)

    this._shaders.set(VERTEX_SHADER, vertex)
    this._shaders.set(SQUARE_SHADER, square)
  }

  /**
  * Load all programs required in order to render grids.
  */
  private initializePrograms () : void {
    const programCollection : ProgramCollection = this._programCollection

    const square : ProgramIdentifier = programCollection.create()

    programCollection.setVertexShader(square, this._shaders.get(VERTEX_SHADER))
    programCollection.setFragmentShader(square, this._shaders.get(SQUARE_SHADER))

    this._programs.set(SQUARE_PROGRAM, square)
  }

  /**
  * @see gltool-ecs/System.destroy
  */
  public destroy () : void {
    this.destroyPrograms()
    this.destroyShaders()
    this.destroyGeometry()
    this.destroySystems()
  }

  /**
  * Free all allocated programs.
  */
  private destroyPrograms () : void {
    const programCollection : ProgramCollection = this._programCollection
    const programs : Pack<ProgramIdentifier> = this._programs

    for (let index = 0, size = programs.size; index < size; ++index) {
      programCollection.delete(programs.get(index))
      programs.set(index, 0)
    }
  }

  /**
  * Free all allocated shaders.
  */
  private destroyShaders () : void {
    const shaderCollection : ShaderCollection = this._shaderCollection
    const shaders : Pack<ShaderIdentifier> = this._shaders

    for (let index = 0, size = shaders.size; index < size; ++index) {
      shaderCollection.delete(shaders.get(index))
      shaders.set(index, 0)
    }
  }

  /**
  * Free all allocated geometries.
  */
  private destroyGeometry () : void {
    const geometryCollection : GeometryCollection = this._geometryCollection

    geometryCollection.delete(this._geometry)
    this._geometry = 0
  }

  /**
  * Remove all required systems.
  */
  private destroySystems () : void {
    this._unitManagementSystem = null
    this._geometryCollection = null
    this._shaderCollection = null
    this._programCollection = null
  }

  public computeViewToWorldMatrix (pass : WebGLRenderingPass, unit : Unit) {
    const viewUnit : Unit = this._unitManagementSystem.getUnit(pass.camera.entity)
    const gridUnit : Unit = unit

    this._viewToWorld.copy(pass.camera.data.viewToWorld)
    gridUnit.applyToMatrix(viewUnit, this._viewToWorld)
  }

  public computePixelDimension (pass : WebGLRenderingPass) {
    this._pixelSize.set(
      2.0 / pass.viewport.width,
      2.0 / pass.viewport.height,
      0,
      0
    )

    this._viewToWorld.multiplyWithVector(this._pixelSize)
  }

  public useSquareGridProgram (pass : WebGLRenderingPass, grid : SquareGrid) : void {
    const programs : WebGLProgramCollection = pass.context.programs
    const program : ProgramIdentifier = this._programs.get(SQUARE_PROGRAM)

    programs.bootstrap(program)
    programs.use(program)

    const uniforms : WebGLUniforms = this._uniforms
    const attributes : WebGLAttributes = this._attributes

    uniforms.handle(pass.context.context, programs.getProgram(program))
    attributes.handle(pass.context.context, programs.getProgram(program))

    uniforms.setIfExists('viewToWorld', true, this._viewToWorld.buffer)
    uniforms.setIfExists('unit', grid.unit.buffer)
    uniforms.setIfExists('color', grid.color.buffer)
    uniforms.setIfExists('thickness', grid.thickness)
    uniforms.setIfExists('base', grid.base)
    uniforms.setIfExists('zoom', 0.0)
    uniforms.setIfExists('resolution', pass.viewport.width, pass.viewport.height)
    uniforms.setIfExists('pixelSize', this._pixelSize.x, this._pixelSize.y)
  }

  public useGridGeometry (pass : WebGLRenderingPass) : void {
    const geometries : WebGLGeometryCollection = pass.context.geometries

    geometries.bootstrap(this._geometry, WebGLBufferUsage.STATIC_DRAW)
    geometries.bind(this._geometry)

    const attributes : WebGLAttributes = this._attributes

    for (const field of GridGeometry.FORMAT.fields) {
      if (attributes.attributes.has(field.name)){
        geometries.upload(field, attributes.attributes.get(field.name).location)
      }
    }
  }

  public renderSquareGridWithWebGL (pass : WebGLRenderingPass, grid : SquareGrid, unit : Unit) : void {
    const gl : WebGLRenderingContext = pass.context.context

    this.computeViewToWorldMatrix(pass, unit)
    this.computePixelDimension(pass)
    this.useSquareGridProgram(pass, grid)
    this.useGridGeometry(pass)

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
  }

  /**
  * Render the given entity.
  *
  * @param pass - The rendering pass information.
  * @param entity - An entity to render as a mesh.
  */
  public renderEntityWithWebGL (pass : WebGLRenderingPass, entity : Entity) : void {
    if (this.manager.hasComponent(entity, SquareGridType)) {
      this.renderSquareGridWithWebGL(
        pass,
        this.manager.getComponentOfEntity(entity, SquareGridType).data,
        this._unitManagementSystem.getUnit(entity)
      )
    }
  }
}
