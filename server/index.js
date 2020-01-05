const express = require('express')
const next = require('next')
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
const posts = require('./posts')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

app.prepare().then(async () => {
  const server = express()
  let sitemap
  server.disable('x-powered-by')
  server.use(express.static('static'))
  //server.get('/', (req, res) => ssrCache({ req, res, pagePath: '/' }))
  /* server.get('/service-worker.js', (req, res) => {
     return app.serveStatic(req, res, './.next/service-worker.js')
   })*/
  server.get('/sitemap.xml', async function(req, res) {
    res.header('Content-Type', 'application/xml')
    res.header('Content-Encoding', 'gzip')
    // if we have a cached entry send it
    if (sitemap) {
      res.send(sitemap)
      return
    }
    try {
      const smStream = new SitemapStream({ hostname: 'https://blog.farmtogether.com/', cacheTime: 0 })
      const pipeline = smStream.pipe(createGzip())
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

      streamToPromise(pipeline).then(sm => sitemap = sm)
      pipeline.pipe(res).on('error', (e) => {
        throw e
      })
    } catch (e) {
      console.error(e)
      res.status(500).end()
    }
  })
  server.get('/author/:id/', (req, res) => {
    res.status(410)
    return app.render(req, res, '/_error')
  })
  server.get('/tag/:id/', (req, res) => {
    res.status(410)
    return app.render(req, res, '/_error')
  })
  server.get('/not-found', (req, res) => {
    return app.render(req, res, '/not-found')
  })
  server.get('/:id', (req, res) => {
    const queryParams = { id: req.params.id }
    const pagePath = '/blog/post'
    return app.render(req, res, pagePath, queryParams)
  })

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
