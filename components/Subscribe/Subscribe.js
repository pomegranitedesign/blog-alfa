import React from 'react'
import SubscribeForm from './SubscribeForm'
import SubscribeSuccess from './SubscribeSuccess'
import { track } from '../../utils/analytics'
import styles from './Subscribe.css'

class Subscribe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      state: 'form'
    }
  }

  onSubmit = async email => {
    track('Blog Subscribed', { category: 'User', email })
    await fetch(`${process.env.API_URL}/blog/subscribe`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    this.setState({ state: 'success' })
  }

  render() {
    const { state } = this.state
    return (
      <div className="Box">
        {state === 'form' && <SubscribeForm onSubmit={this.onSubmit} />}
        {state === 'success' && <SubscribeSuccess />}
        <style jsx>{styles}</style>
      </div>
    )
  }
}

export default Subscribe
