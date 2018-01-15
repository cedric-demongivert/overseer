import 'babel-polyfill'

import {
  OverseerScreen,
  Manager,
  UUIDv4Entity as Entity,
  Viewport
} from '@overseer'

import {
  ColorRGBA
} from '@glkit'

const overseer = new OverseerScreen(document.getElementById('app'))

const map = new Manager()
const entity = new Entity(map)

entity.create(Viewport)
const viewport = entity.get(Viewport)

Object.assign(viewport, {
  startX: 0,
  startY: 0,
  width: overseer.width,
  height: overseer.height,
  background: new ColorRGBA().setHex(0xf0f0f0ff)
})

window.addEventListener('resize', function updateTargetSize () {
  viewport.set({
    width: overseer.width,
    height: overseer.height
  })
})

overseer.map = map
overseer.render()
