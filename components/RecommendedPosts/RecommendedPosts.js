import React from 'react'
import PostList from '../PostList/PostList'

class RecommendedPosts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  async componentDidMount() {
    const { post: { published_at, slug } } = this.props
    const d = new Date(published_at)
    let publishedAt = d.getUTCFullYear() + '-' +
      ('0' + (d.getUTCMonth() + 1)).slice(-2) + '-' +
      ('0' + d.getUTCDate()).slice(-2) + ' ' +
      ('0' + d.getUTCHours()).slice(-2) + ':' +
      ('0' + d.getUTCMinutes()).slice(-2) + ':' +
      ('0' + d.getUTCSeconds()).slice(-2)
    let order = 'published_at desc'
    let filter = encodeURIComponent('slug:-' + slug + '+published_at:' + '<=' + '\'' + publishedAt + '\'')
    const responsePrev = await fetch(`${process.env.BLOG_API_URL}/ghost/api/v2/content/posts/?key=7278f27c24e14815f219317c97&include=authors&limit=1&filter=${filter}&order=${order}`)
    const prevPost = await responsePrev.json()
    order = 'published_at asc'
    filter = encodeURIComponent('slug:-' + slug + '+published_at:' + '>' + '\'' + publishedAt + '\'')
    const responseNext = await fetch(`${process.env.BLOG_API_URL}/ghost/api/v2/content/posts/?key=7278f27c24e14815f219317c97&include=authors&limit=1&filter=${filter}&order=${order}`)
    const nextPost = await responseNext.json()
    const posts = []
    if (prevPost['posts'].length) {
      posts.push(prevPost['posts'][0])
    }
    if (nextPost['posts'].length) {
      posts.push(nextPost['posts'][0])
    }
    this.setState({ posts })
  }

  render() {
    const { posts } = this.state
    return (<PostList posts={posts}/>)
  }
}

export default RecommendedPosts
