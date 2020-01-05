import React from 'react'
import { track } from '../../utils/analytics'

const bg = require('./assets/bg.png')

function WebinarBar() {
  const onTrack = () => {
    track('LinerClick', { category: 'User', 'label': 'AlmondWebinar' })
  }
  return (
    <>
      <a onClick={onTrack} target='_blank'
         href='https://zoom.us/webinar/register/2115617436370/WN_WZz_X69HR2G5LimaTf1sCQ'>
        <header className='webinar-bar'>
          <div className='text'>Join us July 2nd – learn about our latest investment opportunity</div>
        </header>
        {/*language=SCSS*/}
        <style jsx>
          {`
            .webinar-bar {
              width: 100%;
              display: flex;
              z-index: 1100;
              align-items: center;
              box-sizing: border-box;
              flex-shrink: 0;
              flex-direction: column;
              position: static;
              padding: 14px 0 14px 0;
              transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
              @media screen and (max-width: 768px) {
                padding: 8px 0 8px 0;
              }
            }

            .text {
              font-weight: 500;
              font-size: 14px;
              line-height: 17px;
              letter-spacing: 0.583333px;
              color: #FFFFFF;
              @media screen and (max-width: 768px) {
                font-size: 10px;
                line-height: 12px;
                padding-left: 28px;
              }
            }
          `}
        </style>
        {/*language=SCSS*/}
        <style jsx>
          {`
            .webinar-bar {
              background: url('${bg}'), linear-gradient(182.09deg, #FB9B8F 0%, #FEC762 100%);
            }
           
          `}
        </style>
      </a>
    </>
  )
}

export default WebinarBar
