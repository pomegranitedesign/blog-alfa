import React from 'react'
import { Subscribe } from '../components/Subscribe'
import FeaturedPost from '../components/FeaturedPost/FeaturedPost'
import { WhitePaper } from '../components/WhitePaper'
import StickyBox from 'react-sticky-box'
import fetch from 'isomorphic-unfetch'
import { LatestPosts } from '../components/LatestPosts'
import { LazyLoadComponent } from 'react-lazy-load-image-component'

class Index extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const featuredResponse = await fetch(
      `${process.env.BLOG_API_URL}/ghost/api/v2/content/posts/?key=7278f27c24e14815f219317c97&filter=featured:true`,
      { mode: 'cors' }
    )
    const featuredList = await featuredResponse.json()
    const latestResponse = await fetch(
      `${process.env.BLOG_API_URL}/ghost/api/v2/content/posts/?key=7278f27c24e14815f219317c97&filter=featured:false`
    )
    const latestList = await latestResponse.json()
    return {
      id,
      featured: featuredList['posts'].length > 0 ? featuredList['posts'][0] : null,
      latest: latestList['posts'].length > 0 ? latestList['posts'] : null
    }
  }

  render() {
    const { featured, latest, isMobile } = this.props
    return (
      <div className="Wrapper">
        <div className="GlobalContainer">
          <div className="TwoColumnLayoutWrapper">
            <div className="MainColumn">
              {featured && <FeaturedPost post={featured} />}
              <h2 className="PostPreviewListHeading">Latest</h2>
              <div className="PostPreviewList">
                <LazyLoadComponent visibleByDefault={!isMobile}>
                  <LatestPosts posts={latest} />
                </LazyLoadComponent>
              </div>
            </div>
            <div className="SideBar">
              {isMobile && (
                <>
                  <WhitePaper />
                  <Subscribe />
                </>
              )}
              {!isMobile && (
                <StickyBox offsetTop={20} mode="stickyTop">
                  <WhitePaper />
                  <Subscribe />
                </StickyBox>
              )}
            </div>
          </div>
        </div>
        {/*language=SCSS*/}
        <style jsx>
          {`
            .PageHeader {
              font-size: 48px;
              letter-spacing: 0.75px;
              color: #9aa1b8;
              margin-bottom: 34px;
              padding-top: 70px;
            }

            .TwoColumnLayoutWrapper {
              display: flex;
              @media screen and (max-width: 800px) {
                flex-direction: column;
              }
            }

            .MainColumn {
              flex-grow: 1;
              max-width: calc(100% - 480px);
              @media screen and (max-width: 800px) {
                max-width: none;
              }
            }

            .SideBar {
              min-width: 450px;
              margin-left: 30px;
              @media screen and (max-width: 1440px) {
                min-width: 380px;
              }
              @media screen and (max-width: 1040px) {
                min-width: 300px;
                margin: 0 auto;
              }
              @media screen and (max-width: 320px) {
                min-width: 250px;
                margin: 0 auto;
              }
            }

            .PostPreviewList {
              padding-bottom: 30px;
            }

            .PostPreviewListHeading {
              text-transform: uppercase;
              font-weight: normal;
              font-size: 18px;
              line-height: 25px;
              color: #9aa1b8;
              margin-bottom: 35px;
              @media (max-width: 800px) {
                margin-bottom: 30px;
              }
            }
          `}
        </style>
      </div>
    )
  }
}

export default Index
