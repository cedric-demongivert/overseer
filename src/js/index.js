import 'babel-polyfill'

import {
  OverseerScreen,
  Manager,
  UUIDv4Entity as Entity,
  RenderingTarget
} from '@overseer'

import {
  ColorRGBA
} from '@glkit'

const overseer = new OverseerScreen(document.getElementById('app'))

const map = new Manager()
const entity = new Entity(map)

entity.create(RenderingTarget)
const renderingTarget = entity.get(RenderingTarget)

renderingTarget.set({
  startX: 0,
  startY: 0,
  width: overseer.width,
  height: overseer.height,
  background: new ColorRGBA().setHex(0xf0f0f0ff)
})

window.addEventListener('resize', function updateTargetSize () {
  renderingTarget.set({
    width: overseer.width,
    height: overseer.height
  })
})

overseer.map = map
overseer.render()
