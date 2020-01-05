const { SitemapStream, streamToPromise } = require('sitemap')

const posts = require('./posts')

const smStream = new SitemapStream({
  hostname: 'https://blog.farmtogether.com',
  cacheTime: 0 // 600 sec - cache purge period
})

const setup = async (opts) => {
  const Posts = await posts()
  for (let i = 0; i < Posts.length; i += 1) {
    const post = Posts[i]
    smStream.write({
      url: `/${post.slug}/`,
      img: post.img,
      lastmodISO: post.lastModified
    })
  }
  smStream.end()
  opts.server.get('/sitemap.xml', ({}, res) => {
    streamToPromise(smStream)
      .then((sm) => {
        res.header('Content-Type', 'application/xml')
        res.send(sm)
      })
      .catch(console.error)
  })
}

module.exports = setup
