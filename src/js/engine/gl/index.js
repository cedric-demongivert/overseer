export { GLContext } from './GLContext'
export { GLType } from './GLType'
export { GLObject } from './GLObject'
export { GLView } from './GLView'
export { GLShader } from './GLShader'
export { GLProgram } from './GLProgram'
export { GLUniforms } from './GLUniforms'

import { GLBuffer } from './GLBuffer'
import { GLArrayBuffer } from './GLArrayBuffer'
import { GLElementArrayBuffer } from './GLElementArrayBuffer'

GLBuffer.Array = GLArrayBuffer
GLBuffer.ElementArray = GLElementArrayBuffer

export { GLBuffer }
export { GLArrayBuffer }
export { GLElementArrayBuffer }

import { GLTexture } from './GLTexture'
import { GLTexture2D } from './GLTexture2D'
import { GLCubeMapTexture } from './GLCubeMapTexture'

GLTexture.Texture2D = GLTexture2D
GLTexture.CubeMap = GLCubeMapTexture

export { GLTexture }
export { GLTexture2D }
export { GLCubeMapTexture }
