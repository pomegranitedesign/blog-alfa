import React from 'react'
import closeIcon from './assets/close.svg'

const CloseButton = (props) =>
  <>
    <div onClick={props.onClick} className='CloseButton'/>
    {/*language=SCSS*/}
    <style jsx>
      {`
        .CloseButton {
            float: right;
            border: none;
            width: 18px;
            height: 14px;
            margin-right: 20px;
            background: url('${closeIcon}') no-repeat top left;
            background-size:contain;
        }
      `}
    </style>
  </>
export default CloseButton
