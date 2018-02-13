var mix = require('laravel-mix')

mix.webpackConfig({
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
.copy('assets/images', 'dist/images')
.setPublicPath('dist')
.sourceMaps(true)
.disableNotifications()
