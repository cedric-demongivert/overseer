import 'babel-polyfill'

import {
  OverseerScreen, Manager, Viewport, Entity, OrthographicCamera2D,
  Texture2D, OverseerGeometry, Program, Material, Mesh, Transform,
  CommonGeometrySystem, SquareGrid
} from '@overseer'

import { ColorRGBA } from '@glkit'

const overseer = new OverseerScreen(document.getElementById('app'))

const map = new Manager()
map.addSystem(new CommonGeometrySystem())

// initialisation : vue
const view = new Entity(map)

Object.assign(view.create(OrthographicCamera2D), {
  left: 0,
  bottom: 0,
  right: overseer.width / 40,
  top: overseer.height / 40,
  unit: '1cm'
})

view.get(OrthographicCamera2D).centerX = 0
view.get(OrthographicCamera2D).centerY = 0

Object.assign(view.create(Viewport), {
  left: 0,
  bottom: 0,
  right: overseer.width,
  top: overseer.height,
  camera: view.get(OrthographicCamera2D),
  background: new ColorRGBA().setHex(0xf0f0f0ff)
})


window.addEventListener('resize', function updateTargetSize () {
  Object.assign(view.get(Viewport), {
    left: 0,
    bottom: 0,
    right: overseer.width,
    top: overseer.height
  })

  Object.assign(view.get(OrthographicCamera2D), {
    left: 0,
    bottom: 0,
    right: overseer.width / 40,
    top: overseer.height / 40
  })

  view.get(OrthographicCamera2D).centerX = 0
  view.get(OrthographicCamera2D).centerY = 0
})

// initialisation : mesh
const mesh = new Entity(map)

Object.assign(mesh.create(Texture2D), {
  wrapS: Texture2D.CLAMP_TO_EDGE,
  wrapT: Texture2D.CLAMP_TO_EDGE,
  mignificationFilter: Texture2D.LINEAR,
  magnificationFilter: Texture2D.LINEAR,
  content: document.getElementById('texture')
})

mesh.create(OverseerGeometry.Quad)

Object.assign(mesh.create(Transform), {
  size: [15, 15],
  position: [0, 0, 0],
  unit: '1cm'
})

Object.assign(mesh.create(Program), {
  vertexShader: require('@shaders/texture.vert'),
  fragmentShader: require('@shaders/texture.frag')
})

Object.assign(mesh.create(Material), {
  program: mesh.get(Program)
})

mesh.get(Material).uniforms.colors = mesh.get(Texture2D)

Object.assign(mesh.create(Mesh), {
  material: mesh.get(Material),
  geometry: mesh.get(OverseerGeometry.Quad),
  render: true
})

// initialisation : grille
const grid = new Entity(map)

Object.assign(grid.create(SquareGrid), {
  camera: view.get(OrthographicCamera2D)
})

// Rendering
overseer.map = map

let lastTime = null

function tick (time) {
  const delta = ((lastTime != null) ? time - lastTime : time) / 1000
  map.update(delta)

  //mesh.get(Transform).rotate((delta / 10) * Math.PI)
  view.get(OrthographicCamera2D).unit = view.get(OrthographicCamera2D).unit.multiply(1 + delta / 10)
  overseer.render()
  lastTime = time

  window.requestAnimationFrame(tick)
}

window.requestAnimationFrame(tick)
