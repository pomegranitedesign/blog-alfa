import * as React from 'react'
import { getFullDate } from '../../utils/date'
import readingTime from '../../utils/reading-time'
import Link from 'next/link'
import styles from './FeaturedPost.css'

const FeaturedPost = ({ post }) => (
  <div className='FeaturedPostPreview'>
    <Link href={`/${post.slug}/`}>
      <a className='ArticleImageLink'>
        <div
          style={{ backgroundImage: 'url(' + post['feature_image'] + ')' }}
          className='FeaturedPostPreviewImageContainer ImageContainer'/>
      </a>
    </Link>
    <Link href={`/${post.slug}/`}>
      <a className='ArticleContainerLink'>
        <div className='FeaturedPostPreviewInnerContainer'>
          <div className='PostInfo FeaturedPostPreviewPostInfo'>
            <div>
              <time dateTime={post['published_at']}>{getFullDate(post['published_at'])} · {readingTime(post)}</time>
            </div>
          </div>
          <div className='FeaturedPostPreviewHeading'>
            {post.title}
          </div>
          <div className='FeaturedPostPreviewText'>
            {post.excerpt}
          </div>
        </div>
      </a>
    </Link>
    <style jsx>{styles}</style>
  </div>
)
export default FeaturedPost
