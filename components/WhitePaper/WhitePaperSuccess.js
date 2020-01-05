import React from 'react'
import styles from './WhitePaperSuccess.css'
import img from './assets/images.svg'

const WhitePaperSuccess = () => (
  <div className="Container">
    <div className="Heading">Thank You for Your Interest!</div>
    <div className="Description">
      Your white paper is on its way. Please check your inbox in a minute.
    </div>
    <div>
      <img src={img} alt="Images" />
    </div>

    <style jsx>{styles}</style>
    {/*language=SCSS*/}
    <style jsx>
      {`
        .Container {
          background-color: #fffaef;
          border: 10px solid #ffffff;
        }
      `}
    </style>
  </div>
)
export default WhitePaperSuccess
