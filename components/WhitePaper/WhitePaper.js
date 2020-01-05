import React from 'react'
import WhitePaperView from './WhitePaperView'
import WhitePaperForm from './WhitePaperForm'
import WhitePaperSuccess from './WhitePaperSuccess'
import Router from 'next/router'
import { utmParse } from '../../utils/utm-parse'
import { track } from '../../utils/analytics'
import styles from './WhitePaper.css'

class WhitePaper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      state: 'view'
    }
  }

  onShowForm = () => {
    this.setState({ state: 'form' })
  }
  onSubmit = async data => {
    const { label } = this.props
    let guestId = ''
    let utm = utmParse(Router.router.asPath)
    if (Object.entries(utm).length === 0 && utm.constructor === Object) {
      utm = { source: 'direct_blog' }
    }
    if (window.analytics) {
      guestId = window.analytics.user().anonymousId()
    }
    track('WhitePaper Download', {
      category: 'User',
      ...data,
      utm,
      url: window.location.href,
      label
    })
    await fetch(`${process.env.API_URL}/whitepaper`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        segmentGuid: guestId,
        utm: utm,
        url: window.location.href
      })
    })
    this.setState({ state: 'success' })
  }

  render() {
    const { direction } = this.props
    const { state } = this.state
    return (
      <div className="Box">
        {state === 'view' && <WhitePaperView direction={direction} onShowForm={this.onShowForm} />}
        {state === 'form' && <WhitePaperForm submit={this.onSubmit} />}
        {state === 'success' && <WhitePaperSuccess />}
        <style jsx>{styles}</style>
      </div>
    )
  }
}

WhitePaper.defaultProps = {
  label: 'Blog'
}
export default WhitePaper
