import { GLTexture } from './GLTexture'
import { GLTexture2D } from './GLTexture2D'
import { GLCubeMapTexture } from './GLCubeMapTexture'

GLTexture.Texture2D = GLTexture2D
GLTexture.CubeMap = GLCubeMapTexture

export { GLTexture }
export { GLTexture2D }
export { GLCubeMapTexture }
