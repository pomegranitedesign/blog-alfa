import React from 'react'
import Link from 'next/link'
import { Button } from '../../components/Button'
import bg from './assets/bg_404_small.png'
import styles from './NotFound.css'

const NotFound = (props) => {
  const redirectTime = 10 // TODO come from props?

  const descriptionText = (
    <span>
      The requested page does not exist. {!props.isMobile && `We will try to automatically redirect you to our home page in ${redirectTime} seconds.`}<br/><br/>
      Please go to the FarmTogether home page by clicking the button below.
    </span>
  )

  return (
    <main className='Box'>
      <h1 className='Title'>404</h1>
      <h2 className='SubTitle'>Page Not Found</h2>
      <p className='Description'>{descriptionText}</p>
      <Link href="/"><a className='Home'><Button label='Home Page'/></a></Link>
      <style jsx>{styles}</style>
      {/*language=SCSS*/}
      <style jsx>
        {`
          .Box {
            @media screen and (max-width: 800px) {
              background: url("${bg}") no-repeat center bottom;
            }
          }
        `}
      </style>
    </main>
  )
}

export default NotFound
