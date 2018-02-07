import 'babel-polyfill'

import {
  OverseerScreen, Manager, Viewport, Entity, OrthographicCamera2D
} from '@overseer'
import { ColorRGBA } from '@glkit'

const overseer = new OverseerScreen(document.getElementById('app'))

const map = new Manager()
const entity = new Entity(map)

entity.create(Viewport)
entity.create(OrthographicCamera2D)

const viewport = entity.get(Viewport)
const camera = entity.get(OrthographicCamera2D)

Object.assign(viewport, {
  left: 0,
  bottom: 0,
  right: overseer.width,
  top: overseer.height,
  camera,
  background: new ColorRGBA().setHex(0xf0f0f0ff)
})

Object.assign(camera, {
  left: 0,
  bottom: 0,
  right: overseer.width / 40,
  top: overseer.height / 40
})

window.addEventListener('resize', function updateTargetSize () {
  Object.assign(viewport, {
    left: 0,
    bottom: 0,
    right: overseer.width,
    top: overseer.height
  })

  Object.assign(camera, {
    left: 0,
    bottom: 0,
    right: overseer.width / 40,
    top: overseer.height / 40
  })
})

overseer.map = map

let lastTime = null

function tick (time) {
  map.update((lastTime != null) ? lastTime - time : time)
  overseer.render()
  lastTime = time

  window.requestAnimationFrame(tick)
}

window.requestAnimationFrame(tick)
