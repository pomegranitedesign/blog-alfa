import * as React from 'react'
import { getFullDate } from '../../utils/date'
import Link from 'next/link'
import readingTime from '../../utils/reading-time'
import styles from './PostList.css'

const PostList = ({ posts }) => {
  return (
    <>
      {posts.map((item, index) => {
        return (<div className='PostPreview' key={index}>
          <Link href={`/${item.slug}/`}>
            <a className='ArticleImageLink'>
              <div
                style={{ backgroundImage: `url(${item['feature_image']})` }}
                className='PostPreviewImageContainer ImageContainer'/>
            </a>
          </Link>
          <Link href={`/${item.slug}/`}>
            <a className='ArticleContainerLink'>
              <div className='PostPreviewInnerContainer'>
                <div className='PostInfo PostPreviewPostInfo'>
                  <div className="post-info__text">
                    <time
                      dateTime={item['published_at']}>{getFullDate(item['published_at'])} · {readingTime(item)}</time>
                  </div>
                </div>
                <div className='PostPreviewHeading'>
                  {item.title}
                </div>
                <div className='PostPreviewText'>
                  {item['excerpt']}
                </div>
              </div>
            </a>
          </Link>
        </div>)
      })}
      <style jsx>{styles}</style>
    </>
  )
}

export default PostList
