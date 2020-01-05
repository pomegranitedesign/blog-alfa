import React from 'react'
import { NotFound } from '../components/NotFound'
import { NextSeo } from 'next-seo'

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    return (
      <>
        <NextSeo
          noindex={true}
        />
        {this.props.statusCode === 404 && <NotFound/>}
        {this.props.statusCode === 410 && <p style={{ textAlign: 'center', marginTop: 20 }}>This page was deleted.</p>}
      </>
    )
  }
}

export default Error
