import { GLBuffer } from './GLBuffer'
import { GLArrayBuffer } from './GLArrayBuffer'
import { GLElementArrayBuffer } from './GLElementArrayBuffer'

GLBuffer.Array = GLArrayBuffer
GLBuffer.ElementArray = GLElementArrayBuffer
GLBuffer.Vertex = GLArrayBuffer
GLBuffer.Indices = GLElementArrayBuffer

export { GLBuffer }
export { GLArrayBuffer }
export { GLElementArrayBuffer }
