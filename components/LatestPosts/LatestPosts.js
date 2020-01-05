import React from 'react'
import PostList from '../PostList/PostList'

class LatestPosts extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { posts } = this.props
    return (
      <>
        {posts && <PostList posts={posts}/>}
      </>
    )
  }
}

export default LatestPosts
