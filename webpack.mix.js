var mix = require('laravel-mix')
var path = require('path')

mix.webpackConfig({
  resolve: {
    alias: {
      '@shaders': path.resolve(__dirname, './src/shaders'),
      '@glkit': path.resolve(__dirname, './src/js/glkit'),
      '@overseer': path.resolve(__dirname, './src/js/overseer')
    },
    extensions: ['.js', '.json', '.jsx', '.css', '.sass', '.frag', '.vert']
  },
  module: {
    rules: [
      {
        test: /\.vert|\.frag$/i,
        use: 'raw-loader'
      }
    ]
  }
})
.js('src/js/index.js', 'dist')
.sass('src/scss/app.scss', 'dist')
.copy('assets/index.html', 'dist')
.setPublicPath('dist')
.sourceMaps(true)
.disableNotifications()
