import 'babel-polyfill'

import {
  OverseerScreen,
  Manager,
  UUIDv4Entity as Entity,
  RenderingArea
} from './overseer'

const overseer = new OverseerScreen(document.getElementById('app'))

const map = new Manager()
const renderingArea = new Entity(map)

renderingArea.create(RenderingArea, {
  startX: 0,
  startY: 0,
  width: 100,
  height: 100,
  background: 0x000000
})

overseer.map = map
overseer.render()
