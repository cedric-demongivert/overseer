import 'babel-polyfill'

import {
  OverseerScreen,
  Manager,
  Viewport,
  OrthographicCamera2D,
  Entity
} from './engine'

const overseer = new OverseerScreen(document.getElementById('app'))

const manager = new Manager()

// initialisation : vue
const view = new Entity(manager)

const viewport = view.create(Viewport)
viewport.width = overseer.width
viewport.height = overseer.height
viewport.left = 0
viewport.bottom = 0
viewport.setBackground(0.98, 0.98, 0.98)

window.addEventListener('resize', function updateTargetSize () {
  viewport.width = overseer.width
  viewport.height = overseer.height
  viewport.left = 0
  viewport.bottom = 0
})

const camera = view.create(OrthographicCamera2D)
camera.right = overseer.width / 40
camera.top = overseer.height / 40
camera.left = 0
camera.bottom = 0
camera.unit = '1cm'
camera.setCenter(0, 0)

viewport.camera = camera

window.addEventListener('resize', function updateTargetSize () {
  camera.right = overseer.width / 40
  camera.top = overseer.height / 40
  camera.left = 0
  camera.bottom = 0
})

/*
// initialisation : vue
const view = new Entity(manager)

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
const mesh = new Entity(manager)

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
const grid = new Entity(manager)

Object.assign(grid.create(SquareGrid), {
  camera: view.get(OrthographicCamera2D)
})

// Rendering
overseer.manager = manager
*/

overseer.map = manager

const clock = {
  seconds: 0,
  delta: 0,
  previous: null
}

function tick (time) {
  clock.seconds = time / 1000
  clock.delta = clock.previous == null ? clock.seconds : clock.seconds - clock.previous
  clock.previous = clock.seconds

  manager.update(clock.delta)
  overseer.render()

  window.requestAnimationFrame(tick)
}

window.requestAnimationFrame(tick)
