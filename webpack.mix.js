const mix = require('laravel-mix')

mix.disableNotifications()
   .webpackConfig({
     'module': {
       'rules': [
         {
           'test': /\.vert|\.frag$/i,
           'use': 'raw-loader'
         }
       ]
     }
   })
   .ts('sources/typescript/index.tsx', 'distribution')
   .sass('sources/scss/app.scss', 'distribution')
   //.copy('LICENSE.md', 'distribution')
   .copy('package.json', 'distribution')
   .copy('README.md', 'distribution')
   .copy('assets/index.html', 'distribution/index.html')
   .copy('assets/images', 'distribution/images')
   .setPublicPath('distribution')
   .sourceMaps(true)
