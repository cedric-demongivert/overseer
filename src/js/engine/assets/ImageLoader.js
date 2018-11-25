const document = window.document

/**
* Loader for images.
*/
export class ImageLoader {
  /**
  * Load an image.
  *
  * @return {Promise} A promise that resolve with the image component or reject with an error message.
  */
  static load (url) {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img')
      img.src = url

      img.addEventListener('load', $event => {
        resolve(img)
      })

      img.addEventListener('error', $event => {
        reject($event)
      })

      /*
      img.addEventListener('progress', $event => {

      })
      */
    })
  }
}
