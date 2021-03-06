// home.js
import Cosmic from 'cosmicjs'
module.exports = (app, config, partials) => {
  app.get('/', (req, res) => {
    Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET } }, (err, response) => {
      res.locals.cosmic = response
      const blurb_items = res.locals.cosmic.object.home.metafield.blurbs.children
      blurb_items.forEach((item, i) => {
        item.children.forEach((item_child, i) => {
          if (item_child.type === 'file') {
            item_child.imgix_url = 'https://cosmicjs.imgix.net/' + item_child.value
          }
        })
      })
      res.locals.page = response.object.home
      return res.render('index.html', {
        partials
      })
    })
  })
}
