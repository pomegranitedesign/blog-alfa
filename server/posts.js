const fetch = require('node-fetch')

const posts = async () => {
  const response = await fetch(`https://ghost.farmtogether.com/ghost/api/v2/content/posts/?key=7278f27c24e14815f219317c97&limit=all`)
  const list = await response.json()
  return list['posts'].map((item, i) => {
    const last = new Date(item['updated_at'])
    return {
      name: `Post ${i}`,
      img: { url: item['feature_image'], caption: item['title'] },
      lastModified: last.toISOString(),
      slug: item['slug']
    }
  })
}

module.exports = posts
