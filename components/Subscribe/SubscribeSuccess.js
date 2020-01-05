import React from 'react'
import SuccessImage from './assets/SuccessImage.svg'
import styles from './SubscribeSuccess.css'

const SubscribeSuccess = _ => (
  <div className="Container">
    <div style={{ padding: 35, width: '100%' }}>
      <span style={{ color: '#606477', marginBottom: -12, fontSize: 14, display: 'flex' }}>
        You've Subscribed
      </span>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="Description">We’ll keep you informed on any farmland related updates.</div>
        <img src={SuccessImage} alt="Success" style={{ padding: 0, margin: 0 }} />
      </div>
    </div>

    <style jsx>{styles}</style>
    <style jsx>
      {`
        .Container {
        }
      `}
    </style>
  </div>
)

export default SubscribeSuccess
