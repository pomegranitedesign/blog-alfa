import React from 'react'
import Button from '@material-ui/core/Button'
import { createUseStyles } from 'react-jss'

import img from './assets/images.svg'
import styles from './WhitePaperView.css'

// JSS Styles
const useStyles = createUseStyles({
  button: {
    paddingLeft: 38,
    paddingRight: 38,
    background: '#ffbf47',
    borderRadius: 5,
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 40,
    color: '#BF851A',
    border: 'none',
    outline: 'none',
    height: 50,
    cursor: 'pointer',
    fontFamily: 'Montserrat, sans-serif',
    position: 'relative',

    '&::before': {
      content: "''",
      width: '100%',
      height: '1px',
      background: '#BF851A',
      position: 'absolute',
      bottom: 0
    }
  },

  buttonWrapper: {
    width: 220,
    marginTop: 20,
    marginBottom: 40
  }
})

const WhitePaperView = ({ direction, onShowForm }) => {
  const { button, buttonWrapper } = useStyles()

  return (
    <div className={`Container ${direction === 'horizontal' && 'ContainerHorizontal'}`}>
      <div className={`Text ${direction === 'horizontal' && 'TextHorizontal'}}`}>
        <h3 className="Header">Free White Paper</h3>
        <p className="Description">Learn more about farmland investing</p>
      </div>

      <div className={buttonWrapper}>
        <Button style={{ color: '#BF851A' }} className={button} onClick={onShowForm}>
          Download White Paper
        </Button>
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
}

export default WhitePaperView
