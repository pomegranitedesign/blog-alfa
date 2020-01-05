import App from 'next/app'
import React from 'react'
import Header from '../components/Header/Header'
import { Footer } from '../components/Footer'
import Router from 'next/router'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import { logPageView } from '../utils/analytics'
import styles from './app.css'
import fonts from './fonts.css'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../utils/theme'

class BlogApp extends App {
  static async getInitialProps(appContext) {
    let isMobile = false
    if (appContext.ctx.req && 'cloudfront-is-mobile-viewer' in appContext.ctx.req.headers) {
      isMobile = appContext.ctx.req.headers['cloudfront-is-mobile-viewer'] === 'true'
    } else {
      const userAgent = appContext.ctx.req
        ? appContext.ctx.req.headers['user-agent']
        : navigator.userAgent
      const mobileRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i
      isMobile = mobileRE.test(userAgent)
    }
    let appProps = await App.getInitialProps(appContext)
    appContext.ctx.isMobile = isMobile
    const isProduction = process.env.NODE_ENV === 'production' && process.env.STAGING !== '1'
    return {
      ...appProps,
      isMobile,
      isProduction
    }
  }

  constructor(props) {
    super(props)
    this.sectionFocusEl = React.createRef()
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    Router.events.on('routeChangeComplete', this.onRouteChanged)
  }

  onRouteChanged = url => {
    logPageView(url)
    if (this.sectionFocusEl && this.sectionFocusEl.current) {
      this.sectionFocusEl.current.focus()
    }
  }

  render() {
    const { Component, isMobile, pageProps } = this.props
    return (
      <>
        <DefaultSeo {...SEO} />
        <div ref={this.sectionFocusEl} tabIndex={-1} />

        <ThemeProvider theme={theme}>
          <div>
            <Header isMobile={isMobile} />
            <Component isMobile={isMobile} {...pageProps} />
          </div>
          <Footer isMobile={isMobile} />
        </ThemeProvider>
        <style jsx global>
          {fonts}
        </style>
        <style jsx global>
          {styles}
        </style>
      </>
    )
  }
}

export default BlogApp
