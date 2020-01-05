import React from 'react'
import { Schedule } from '../../components/Icons/Schedule'
import { getFullDate } from '../../utils/date'
import readingTime from '../../utils/reading-time'
import { RecommendedPosts } from '../../components/RecommendedPosts'
import { NextSeo } from 'next-seo'
import fetch from 'isomorphic-unfetch'
import { WhitePaper } from '../../components/WhitePaper'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import StickyBox from 'react-sticky-box'
import { NotFound } from '../../components/NotFound'
import { BlogJsonLd } from 'next-seo'
import styles from './post.css'
import { withRouter } from 'next/router'


class BlogPost extends React.Component {
  static async getInitialProps({ res, query: { id } }) {
    const url = `${process.env.BLOG_API_URL}/ghost/api/v2/content/posts/slug/${encodeURI(id)}/?key=7278f27c24e14815f219317c97&include=authors`
    const response = await fetch(url)
    const post = await response.json()
    if (post['posts'] && post['posts'].length > 0) {
      return { id, post: post['posts'][0] }
    }
    if (res) {
      res.statusCode = 404
    }
    return { id, post: null }
  }


  getAuthorName = (data) => {
    if (data.authors.length === 1) {
      if (data['primary_author']) {
        return data['primary_author']['name']
      }
    } else {
      const result = data.authors.map((item) => item.name)
      return result.join(', ')
    }
  }


  render() {
    const { post } = this.props
    const { asPath } = this.props.router
    let canonical = ''
    const url = `https://blog.farmtogether.com/${post.slug}/`
    if (asPath !== '/' && asPath.substr(-1) !== '/') {
      canonical = url
    }
    return (
      <>
        {post !== null ?
          <>
            <NextSeo title={post.title}
                     description={post.excerpt}
                     canonical={canonical}
                     author={this.getAuthorName(post)}
                     openGraph={{
                       title: post.title,
                       description: post.excerpt,
                       images: [
                         {
                           url: post['feature_image']
                         }
                       ],
                       url: url
                     }}
            />
            <BlogJsonLd
              url={`https://blog.farmtogether.com/${post.slug}`}
              title={post.title}
              images={[
                post['feature_image']
              ]}
              datePublished={post['published_at']}
              dateModified={post['updated_at']}
              authorName={this.getAuthorName(post)}
              description={post.excerpt}
            />
            <div className='PostPage'>
              <div className='GlobalContainer'>
                <div className='ThreeColumnLayoutWrapper'>
                  <div className='MainColumn'>
                    <div className='Post'>
                      <img src={post['feature_image']}
                           className='ImagePost' alt={post.title}/>
                      <div className='PostBody'>
                        <div className='PostInfo FeaturedPostPreviewPostInfo'>
                          <time dateTime={post['published_at']}>
                            {getFullDate(post['published_at'])} · {readingTime(post)}
                          </time>
                        </div>
                        <div className='PostHeading'>
                          {post.title}
                        </div>

                        <div className='PostContent' dangerouslySetInnerHTML={{ __html: post.html }}>
                        </div>
                        <div className='EndingLine'/>
                        <div className='Author'>
                          {this.getAuthorName(post)}
                        </div>
                      </div>
                    </div>
                    <div className='PostPreviewListHeading'>
                      Recommended
                    </div>
                    <LazyLoadComponent>
                      <RecommendedPosts post={post}/>
                    </LazyLoadComponent>
                  </div>
                  <StickyBox offsetTop={20} mode='stickyTop'>
                    <div className='SideBar'>
                      <WhitePaper label={post.title}/>
                    </div>
                  </StickyBox>
                </div>
              </div>
            </div>
          </> : <NotFound/>
        }
        <style jsx global>{styles}</style>
        { /*language=SCSS*/}
        <style jsx>
          {`

          `}
        </style>
      </>
    )
  }
}

export default withRouter(BlogPost)
