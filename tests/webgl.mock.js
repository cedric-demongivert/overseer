export function createWebGLMock (jest) {
  const isWebGLRenderingContext = Symbol('isWebGLRenderingContext')
  const keys = new Set([
    'activeTexture', 'attachShader', 'bindAttribLocation', 'bindBuffer',
    'bindFramebuffer', 'bindRenderbuffer', 'bindTexture', 'blendColor',
    'blendEquation', 'blendEquationSeparate', 'blendFunc', 'blendFuncSeparate',
    'bufferData', 'bufferSubData', 'checkFramebufferStatus', 'clear',
    'clearColor', 'clearDepth', 'clearStencil', 'colorMask', 'commit',
    'compileShader', 'compressedTexImage2D', 'compressedTexSubImage2D',
    'copyTexImage2D', 'copyTexSubImage2D', 'createBuffer', 'createFramebuffer',
    'createProgram', 'createRenderbuffer', 'createShader', 'createTexture',
    'cullFace', 'deleteBuffer', 'deleteFramebuffer', 'deleteProgram',
    'deleteRenderbuffer', 'deleteShader', 'deleteTexture', 'depthFunc',
    'depthMask', 'depthRange', 'detachShader', 'disable',
    'disableVertexAttribArray', 'drawArrays', 'drawElements', 'enable',
    'enableVertexAttribArray', 'finish', 'flush', 'framebufferRenderbuffer',
    'framebufferTexture2D', 'frontFace', 'generateMipmap', 'getActiveAttrib',
    'getActiveUniform', 'getAttachedShaders', 'getAttribLocation',
    'getBufferParameter', 'getContextAttributes', 'getError', 'getExtension',
    'getFramebufferAttachmentParameter', 'getParameter', 'getProgramInfoLog',
    'getProgramParameter', 'getRenderbufferParameter', 'getShaderInfoLog',
    'getShaderParameter', 'getShaderPrecisionFormat', 'getShaderSource',
    'getSupportedExtensions', 'getTexParameter', 'getUniform',
    'getUniformLocation', 'getVertexAttrib', 'getVertexAttribOffset', 'hint',
    'isBuffer', 'isContextLost', 'isEnabled', 'isFramebuffer', 'isProgram',
    'isRenderbuffer', 'isShader', 'isTexture', 'lineWidth', 'linkProgram',
    'pixelStorei', 'polygonOffset', 'readPixels', 'renderbufferStorage',
    'sampleCoverage', 'scissor', 'shaderSource', 'stencilFunc',
    'stencilFuncSeparate', 'stencilMask', 'stencilMaskSeparate', 'stencilOp',
    'stencilOpSeparate', 'texImage2D', 'texParameterf', 'texParameterfi',
    'texSubImage2D', 'uniform1f', 'uniform1fv', 'uniform1i', 'uniform1iv',
    'uniform2f', 'uniform2fv', 'uniform2i', 'uniform2iv', 'uniform3f',
    'uniform3fv', 'uniform3i', 'uniform3iv', 'uniform4f', 'uniform4fv',
    'uniform4i', 'uniform4iv', 'uniformMatrix2fv', 'uniformMatrix3fv',
    'uniformMatrix4fv', 'useProgram', 'validateProgram', 'vertexAttrib1f',
    'vertexAttrib1fv', 'vertexAttrib2f', 'vertexAttrib2fv', 'vertexAttrib3f',
    'vertexAttrib3fv', 'vertexAttrib4f', 'vertexAttrib4fv',
    'vertexAttribPointer', 'viewport'
  ])

  class WebGLRenderingContext {
    static [Symbol.hasInstance] (instance) {
      return instance[isWebGLRenderingContext]
    }

    get [isWebGLRenderingContext] () {
      return true
    }
  }

  WebGLRenderingContext.DEPTH_BUFFER_BIT = 0x00000100
  WebGLRenderingContext.STENCIL_BUFFER_BIT = 0x00000400
  WebGLRenderingContext.COLOR_BUFFER_BIT = 0x00004000
  WebGLRenderingContext.POINTS = 0x0000
  WebGLRenderingContext.LINES = 0x0001
  WebGLRenderingContext.LINE_LOOP = 0x0002
  WebGLRenderingContext.LINE_STRIP = 0x0003
  WebGLRenderingContext.TRIANGLES = 0x0004
  WebGLRenderingContext.TRIANGLE_STRIP = 0x0005
  WebGLRenderingContext.TRIANGLE_FAN = 0x0006
  WebGLRenderingContext.ZERO = 0
  WebGLRenderingContext.ONE = 1
  WebGLRenderingContext.SRC_COLOR = 0x0300
  WebGLRenderingContext.ONE_MINUS_SRC_COLOR = 0x0301
  WebGLRenderingContext.SRC_ALPHA = 0x0302
  WebGLRenderingContext.ONE_MINUS_SRC_ALPHA = 0x0303
  WebGLRenderingContext.DST_ALPHA = 0x0304
  WebGLRenderingContext.ONE_MINUS_DST_ALPHA = 0x0305
  WebGLRenderingContext.DST_COLOR = 0x0306
  WebGLRenderingContext.ONE_MINUS_DST_COLOR = 0x0307
  WebGLRenderingContext.SRC_ALPHA_SATURATE = 0x0308
  WebGLRenderingContext.FUNC_ADD = 0x8006
  WebGLRenderingContext.BLEND_EQUATION = 0x8009
  WebGLRenderingContext.BLEND_EQUATION_RGB = 0x8009
  WebGLRenderingContext.BLEND_EQUATION_ALPHA = 0x883D
  WebGLRenderingContext.FUNC_SUBTRACT = 0x800A
  WebGLRenderingContext.FUNC_REVERSE_SUBTRACT = 0x800B
  WebGLRenderingContext.BLEND_DST_RGB = 0x80C8
  WebGLRenderingContext.BLEND_SRC_RGB = 0x80C9
  WebGLRenderingContext.BLEND_DST_ALPHA = 0x80CA
  WebGLRenderingContext.BLEND_SRC_ALPHA = 0x80CB
  WebGLRenderingContext.CONSTANT_COLOR = 0x8001
  WebGLRenderingContext.ONE_MINUS_CONSTANT_COLOR = 0x8002
  WebGLRenderingContext.CONSTANT_ALPHA = 0x8003
  WebGLRenderingContext.ONE_MINUS_CONSTANT_ALPHA = 0x8004
  WebGLRenderingContext.BLEND_COLOR = 0x8005
  WebGLRenderingContext.ARRAY_BUFFER = 0x8892
  WebGLRenderingContext.ELEMENT_ARRAY_BUFFER = 0x8893
  WebGLRenderingContext.ARRAY_BUFFER_BINDING = 0x8894
  WebGLRenderingContext.ELEMENT_ARRAY_BUFFER_BINDING = 0x8895
  WebGLRenderingContext.STREAM_DRAW = 0x88E0
  WebGLRenderingContext.STATIC_DRAW = 0x88E4
  WebGLRenderingContext.DYNAMIC_DRAW = 0x88E8
  WebGLRenderingContext.BUFFER_SIZE = 0x8764
  WebGLRenderingContext.BUFFER_USAGE = 0x8765
  WebGLRenderingContext.CURRENT_VERTEX_ATTRIB = 0x8626
  WebGLRenderingContext.FRONT = 0x0404
  WebGLRenderingContext.BACK = 0x0405
  WebGLRenderingContext.FRONT_AND_BACK = 0x0408
  WebGLRenderingContext.CULL_FACE = 0x0B44
  WebGLRenderingContext.BLEND = 0x0BE2
  WebGLRenderingContext.DITHER = 0x0BD0
  WebGLRenderingContext.STENCIL_TEST = 0x0B90
  WebGLRenderingContext.DEPTH_TEST = 0x0B71
  WebGLRenderingContext.SCISSOR_TEST = 0x0C11
  WebGLRenderingContext.POLYGON_OFFSET_FILL = 0x8037
  WebGLRenderingContext.SAMPLE_ALPHA_TO_COVERAGE = 0x809E
  WebGLRenderingContext.SAMPLE_COVERAGE = 0x80A0
  WebGLRenderingContext.NO_ERROR = 0
  WebGLRenderingContext.INVALID_ENUM = 0x0500
  WebGLRenderingContext.INVALID_VALUE = 0x0501
  WebGLRenderingContext.INVALID_OPERATION = 0x0502
  WebGLRenderingContext.OUT_OF_MEMORY = 0x0505
  WebGLRenderingContext.CW = 0x0900
  WebGLRenderingContext.CCW = 0x0901
  WebGLRenderingContext.LINE_WIDTH = 0x0B21
  WebGLRenderingContext.ALIASED_POINT_SIZE_RANGE = 0x846D
  WebGLRenderingContext.ALIASED_LINE_WIDTH_RANGE = 0x846E
  WebGLRenderingContext.CULL_FACE_MODE = 0x0B45
  WebGLRenderingContext.FRONT_FACE = 0x0B46
  WebGLRenderingContext.DEPTH_RANGE = 0x0B70
  WebGLRenderingContext.DEPTH_WRITEMASK = 0x0B72
  WebGLRenderingContext.DEPTH_CLEAR_VALUE = 0x0B73
  WebGLRenderingContext.DEPTH_FUNC = 0x0B74
  WebGLRenderingContext.STENCIL_CLEAR_VALUE = 0x0B91
  WebGLRenderingContext.STENCIL_FUNC = 0x0B92
  WebGLRenderingContext.STENCIL_FAIL = 0x0B94
  WebGLRenderingContext.STENCIL_PASS_DEPTH_FAIL = 0x0B95
  WebGLRenderingContext.STENCIL_PASS_DEPTH_PASS = 0x0B96
  WebGLRenderingContext.STENCIL_REF = 0x0B97
  WebGLRenderingContext.STENCIL_VALUE_MASK = 0x0B93
  WebGLRenderingContext.STENCIL_WRITEMASK = 0x0B98
  WebGLRenderingContext.STENCIL_BACK_FUNC = 0x8800
  WebGLRenderingContext.STENCIL_BACK_FAIL = 0x8801
  WebGLRenderingContext.STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802
  WebGLRenderingContext.STENCIL_BACK_PASS_DEPTH_PASS = 0x8803
  WebGLRenderingContext.STENCIL_BACK_REF = 0x8CA3
  WebGLRenderingContext.STENCIL_BACK_VALUE_MASK = 0x8CA4
  WebGLRenderingContext.STENCIL_BACK_WRITEMASK = 0x8CA5
  WebGLRenderingContext.VIEWPORT = 0x0BA2
  WebGLRenderingContext.SCISSOR_BOX = 0x0C10
  WebGLRenderingContext.COLOR_CLEAR_VALUE = 0x0C22
  WebGLRenderingContext.COLOR_WRITEMASK = 0x0C23
  WebGLRenderingContext.UNPACK_ALIGNMENT = 0x0CF5
  WebGLRenderingContext.PACK_ALIGNMENT = 0x0D05
  WebGLRenderingContext.MAX_TEXTURE_SIZE = 0x0D33
  WebGLRenderingContext.MAX_VIEWPORT_DIMS = 0x0D3A
  WebGLRenderingContext.SUBPIXEL_BITS = 0x0D50
  WebGLRenderingContext.RED_BITS = 0x0D52
  WebGLRenderingContext.GREEN_BITS = 0x0D53
  WebGLRenderingContext.BLUE_BITS = 0x0D54
  WebGLRenderingContext.ALPHA_BITS = 0x0D55
  WebGLRenderingContext.DEPTH_BITS = 0x0D56
  WebGLRenderingContext.STENCIL_BITS = 0x0D57
  WebGLRenderingContext.POLYGON_OFFSET_UNITS = 0x2A00
  WebGLRenderingContext.POLYGON_OFFSET_FACTOR = 0x8038
  WebGLRenderingContext.TEXTURE_BINDING_2D = 0x8069
  WebGLRenderingContext.SAMPLE_BUFFERS = 0x80A8
  WebGLRenderingContext.SAMPLES = 0x80A9
  WebGLRenderingContext.SAMPLE_COVERAGE_VALUE = 0x80AA
  WebGLRenderingContext.SAMPLE_COVERAGE_INVERT = 0x80AB
  WebGLRenderingContext.COMPRESSED_TEXTURE_FORMATS = 0x86A3
  WebGLRenderingContext.DONT_CARE = 0x1100
  WebGLRenderingContext.FASTEST = 0x1101
  WebGLRenderingContext.NICEST = 0x1102
  WebGLRenderingContext.GENERATE_MIPMAP_HINT = 0x8192
  WebGLRenderingContext.BYTE = 0x1400
  WebGLRenderingContext.UNSIGNED_BYTE = 0x1401
  WebGLRenderingContext.SHORT = 0x1402
  WebGLRenderingContext.UNSIGNED_SHORT = 0x1403
  WebGLRenderingContext.INT = 0x1404
  WebGLRenderingContext.UNSIGNED_INT = 0x1405
  WebGLRenderingContext.FLOAT = 0x1406
  WebGLRenderingContext.DEPTH_COMPONENT = 0x1902
  WebGLRenderingContext.ALPHA = 0x1906
  WebGLRenderingContext.RGB = 0x1907
  WebGLRenderingContext.RGBA = 0x1908
  WebGLRenderingContext.LUMINANCE = 0x1909
  WebGLRenderingContext.LUMINANCE_ALPHA = 0x190A
  WebGLRenderingContext.UNSIGNED_SHORT_4_4_4_4 = 0x8033
  WebGLRenderingContext.UNSIGNED_SHORT_5_5_5_1 = 0x8034
  WebGLRenderingContext.UNSIGNED_SHORT_5_6_5 = 0x8363
  WebGLRenderingContext.FRAGMENT_SHADER = 0x8B30
  WebGLRenderingContext.VERTEX_SHADER = 0x8B31
  WebGLRenderingContext.MAX_VERTEX_ATTRIBS = 0x8869
  WebGLRenderingContext.MAX_VERTEX_UNIFORM_VECTORS = 0x8DFB
  WebGLRenderingContext.MAX_VARYING_VECTORS = 0x8DFC
  WebGLRenderingContext.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D
  WebGLRenderingContext.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C
  WebGLRenderingContext.MAX_TEXTURE_IMAGE_UNITS = 0x8872
  WebGLRenderingContext.MAX_FRAGMENT_UNIFORM_VECTORS = 0x8DFD
  WebGLRenderingContext.SHADER_TYPE = 0x8B4F
  WebGLRenderingContext.DELETE_STATUS = 0x8B80
  WebGLRenderingContext.LINK_STATUS = 0x8B82
  WebGLRenderingContext.VALIDATE_STATUS = 0x8B83
  WebGLRenderingContext.ATTACHED_SHADERS = 0x8B85
  WebGLRenderingContext.ACTIVE_UNIFORMS = 0x8B86
  WebGLRenderingContext.ACTIVE_ATTRIBUTES = 0x8B89
  WebGLRenderingContext.SHADING_LANGUAGE_VERSION = 0x8B8C
  WebGLRenderingContext.CURRENT_PROGRAM = 0x8B8D
  WebGLRenderingContext.NEVER = 0x0200
  WebGLRenderingContext.LESS = 0x0201
  WebGLRenderingContext.EQUAL = 0x0202
  WebGLRenderingContext.LEQUAL = 0x0203
  WebGLRenderingContext.GREATER = 0x0204
  WebGLRenderingContext.NOTEQUAL = 0x0205
  WebGLRenderingContext.GEQUAL = 0x0206
  WebGLRenderingContext.ALWAYS = 0x0207
  WebGLRenderingContext.KEEP = 0x1E00
  WebGLRenderingContext.REPLACE = 0x1E01
  WebGLRenderingContext.INCR = 0x1E02
  WebGLRenderingContext.DECR = 0x1E03
  WebGLRenderingContext.INVERT = 0x150A
  WebGLRenderingContext.INCR_WRAP = 0x8507
  WebGLRenderingContext.DECR_WRAP = 0x8508
  WebGLRenderingContext.VENDOR = 0x1F00
  WebGLRenderingContext.RENDERER = 0x1F01
  WebGLRenderingContext.VERSION = 0x1F02
  WebGLRenderingContext.NEAREST = 0x2600
  WebGLRenderingContext.LINEAR = 0x2601
  WebGLRenderingContext.NEAREST_MIPMAP_NEAREST = 0x2700
  WebGLRenderingContext.LINEAR_MIPMAP_NEAREST = 0x2701
  WebGLRenderingContext.NEAREST_MIPMAP_LINEAR = 0x2702
  WebGLRenderingContext.LINEAR_MIPMAP_LINEAR = 0x2703
  WebGLRenderingContext.TEXTURE_MAG_FILTER = 0x2800
  WebGLRenderingContext.TEXTURE_MIN_FILTER = 0x2801
  WebGLRenderingContext.TEXTURE_WRAP_S = 0x2802
  WebGLRenderingContext.TEXTURE_WRAP_T = 0x2803
  WebGLRenderingContext.TEXTURE_2D = 0x0DE1
  WebGLRenderingContext.TEXTURE = 0x1702
  WebGLRenderingContext.TEXTURE_CUBE_MAP = 0x8513
  WebGLRenderingContext.TEXTURE_BINDING_CUBE_MAP = 0x8514
  WebGLRenderingContext.TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515
  WebGLRenderingContext.TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516
  WebGLRenderingContext.TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517
  WebGLRenderingContext.TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518
  WebGLRenderingContext.TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519
  WebGLRenderingContext.TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A
  WebGLRenderingContext.MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C
  WebGLRenderingContext.TEXTURE0 = 0x84C0
  WebGLRenderingContext.TEXTURE1 = 0x84C1
  WebGLRenderingContext.TEXTURE2 = 0x84C2
  WebGLRenderingContext.TEXTURE3 = 0x84C3
  WebGLRenderingContext.TEXTURE4 = 0x84C4
  WebGLRenderingContext.TEXTURE5 = 0x84C5
  WebGLRenderingContext.TEXTURE6 = 0x84C6
  WebGLRenderingContext.TEXTURE7 = 0x84C7
  WebGLRenderingContext.TEXTURE8 = 0x84C8
  WebGLRenderingContext.TEXTURE9 = 0x84C9
  WebGLRenderingContext.TEXTURE10 = 0x84CA
  WebGLRenderingContext.TEXTURE11 = 0x84CB
  WebGLRenderingContext.TEXTURE12 = 0x84CC
  WebGLRenderingContext.TEXTURE13 = 0x84CD
  WebGLRenderingContext.TEXTURE14 = 0x84CE
  WebGLRenderingContext.TEXTURE15 = 0x84CF
  WebGLRenderingContext.TEXTURE16 = 0x84D0
  WebGLRenderingContext.TEXTURE17 = 0x84D1
  WebGLRenderingContext.TEXTURE18 = 0x84D2
  WebGLRenderingContext.TEXTURE19 = 0x84D3
  WebGLRenderingContext.TEXTURE20 = 0x84D4
  WebGLRenderingContext.TEXTURE21 = 0x84D5
  WebGLRenderingContext.TEXTURE22 = 0x84D6
  WebGLRenderingContext.TEXTURE23 = 0x84D7
  WebGLRenderingContext.TEXTURE24 = 0x84D8
  WebGLRenderingContext.TEXTURE25 = 0x84D9
  WebGLRenderingContext.TEXTURE26 = 0x84DA
  WebGLRenderingContext.TEXTURE27 = 0x84DB
  WebGLRenderingContext.TEXTURE28 = 0x84DC
  WebGLRenderingContext.TEXTURE29 = 0x84DD
  WebGLRenderingContext.TEXTURE30 = 0x84DE
  WebGLRenderingContext.TEXTURE31 = 0x84DF
  WebGLRenderingContext.ACTIVE_TEXTURE = 0x84E0
  WebGLRenderingContext.REPEAT = 0x2901
  WebGLRenderingContext.CLAMP_TO_EDGE = 0x812F
  WebGLRenderingContext.MIRRORED_REPEAT = 0x8370
  WebGLRenderingContext.FLOAT_VEC2 = 0x8B50
  WebGLRenderingContext.FLOAT_VEC3 = 0x8B51
  WebGLRenderingContext.FLOAT_VEC4 = 0x8B52
  WebGLRenderingContext.INT_VEC2 = 0x8B53
  WebGLRenderingContext.INT_VEC3 = 0x8B54
  WebGLRenderingContext.INT_VEC4 = 0x8B55
  WebGLRenderingContext.BOOL = 0x8B56
  WebGLRenderingContext.BOOL_VEC2 = 0x8B57
  WebGLRenderingContext.BOOL_VEC3 = 0x8B58
  WebGLRenderingContext.BOOL_VEC4 = 0x8B59
  WebGLRenderingContext.FLOAT_MAT2 = 0x8B5A
  WebGLRenderingContext.FLOAT_MAT3 = 0x8B5B
  WebGLRenderingContext.FLOAT_MAT4 = 0x8B5C
  WebGLRenderingContext.SAMPLER_2D = 0x8B5E
  WebGLRenderingContext.SAMPLER_CUBE = 0x8B60
  WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_ENABLED = 0x8622
  WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_SIZE = 0x8623
  WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_STRIDE = 0x8624
  WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_TYPE = 0x8625
  WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_NORMALIZED = 0x886A
  WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_POINTER = 0x8645
  WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889F
  WebGLRenderingContext.IMPLEMENTATION_COLOR_READ_TYPE = 0x8B9A
  WebGLRenderingContext.IMPLEMENTATION_COLOR_READ_FORMAT = 0x8B9B
  WebGLRenderingContext.COMPILE_STATUS = 0x8B81
  WebGLRenderingContext.LOW_FLOAT = 0x8DF0
  WebGLRenderingContext.MEDIUM_FLOAT = 0x8DF1
  WebGLRenderingContext.HIGH_FLOAT = 0x8DF2
  WebGLRenderingContext.LOW_INT = 0x8DF3
  WebGLRenderingContext.MEDIUM_INT = 0x8DF4
  WebGLRenderingContext.HIGH_INT = 0x8DF5
  WebGLRenderingContext.FRAMEBUFFER = 0x8D40
  WebGLRenderingContext.RENDERBUFFER = 0x8D41
  WebGLRenderingContext.RGBA4 = 0x8056
  WebGLRenderingContext.RGB5_A1 = 0x8057
  WebGLRenderingContext.RGB565 = 0x8D62
  WebGLRenderingContext.DEPTH_COMPONENT16 = 0x81A5
  WebGLRenderingContext.STENCIL_INDEX8 = 0x8D48
  WebGLRenderingContext.DEPTH_STENCIL = 0x84F9
  WebGLRenderingContext.RENDERBUFFER_WIDTH = 0x8D42
  WebGLRenderingContext.RENDERBUFFER_HEIGHT = 0x8D43
  WebGLRenderingContext.RENDERBUFFER_INTERNAL_FORMAT = 0x8D44
  WebGLRenderingContext.RENDERBUFFER_RED_SIZE = 0x8D50
  WebGLRenderingContext.RENDERBUFFER_GREEN_SIZE = 0x8D51
  WebGLRenderingContext.RENDERBUFFER_BLUE_SIZE = 0x8D52
  WebGLRenderingContext.RENDERBUFFER_ALPHA_SIZE = 0x8D53
  WebGLRenderingContext.RENDERBUFFER_DEPTH_SIZE = 0x8D54
  WebGLRenderingContext.RENDERBUFFER_STENCIL_SIZE = 0x8D55
  WebGLRenderingContext.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8CD0
  WebGLRenderingContext.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 0x8CD1
  WebGLRenderingContext.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8CD2
  WebGLRenderingContext.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8CD3
  WebGLRenderingContext.COLOR_ATTACHMENT0 = 0x8CE0
  WebGLRenderingContext.DEPTH_ATTACHMENT = 0x8D00
  WebGLRenderingContext.STENCIL_ATTACHMENT = 0x8D20
  WebGLRenderingContext.DEPTH_STENCIL_ATTACHMENT = 0x821A
  WebGLRenderingContext.NONE = 0
  WebGLRenderingContext.FRAMEBUFFER_COMPLETE = 0x8CD5
  WebGLRenderingContext.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8CD6
  WebGLRenderingContext.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8CD7
  WebGLRenderingContext.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8CD9
  WebGLRenderingContext.FRAMEBUFFER_UNSUPPORTED = 0x8CDD
  WebGLRenderingContext.FRAMEBUFFER_BINDING = 0x8CA6
  WebGLRenderingContext.RENDERBUFFER_BINDING = 0x8CA7
  WebGLRenderingContext.MAX_RENDERBUFFER_SIZE = 0x84E8
  WebGLRenderingContext.INVALID_FRAMEBUFFER_OPERATION = 0x0506
  WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL = 0x9240
  WebGLRenderingContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241
  WebGLRenderingContext.CONTEXT_LOST_WEBGL = 0x9242
  WebGLRenderingContext.UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243
  WebGLRenderingContext.BROWSER_DEFAULT_WEBGL = 0x9244

  let beforeMock

  function mocked () {
    return window.WebGLRenderingContext &&
           window.WebGLRenderingContext instanceof WebGLRenderingContext
  }

  function mock () {
    if (!mocked()) {
      beforeMock = window.WebGLRenderingContext
      window.WebGLRenderingContext = WebGLRenderingContext
    }
  }

  function unmock () {
    if (mocked()) {
      delete window.WebGLRenderingContext
      window.WebGLRenderingContext = beforeMock
    }
  }

  function create () {
    if (!mocked()) { mock }

    return new Proxy(new Map(), {
      get (target, name, receiver) {
        if (name === isWebGLRenderingContext) {
          return true
        }

        if (!keys.has(name)) {
          if (name in WebGLRenderingContext) {
            return WebGLRenderingContext[name]
          } else {
            return {}[name]
          }
        }

        if (!target.has(name)) {
          target.set(name, jest.fn())
        }

        return target.get(name)
      },

      has (target, name) {
        return typeof name === 'string'
      }
    })
  }

  return { mock, unmock, mocked, create }
}
