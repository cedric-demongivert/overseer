import { VertexShader, FragmentShader, Program } from '@overseer/components'

export const vertex = VertexShader.instanciate()
vertex.source = require('@shaders/grid/grid.vert').default

export const fragment = FragmentShader.instanciate()
fragment.source = require('@shaders/grid/square.frag').default

export const program = Program.instanciate()
program.vertex = vertex
program.fragment = fragment
