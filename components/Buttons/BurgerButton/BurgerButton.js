import React from 'react'
import burgerIcon from './assets/burger.svg'
const BurgerButton = (props) =>
  <>
    <div onClick={props.onClick} className='BurgerButton'/>

    {/*language=SCSS*/}
    <style jsx>
      {`
        .BurgerButton {
          float: right;
          border: none;
          width: 18px;
          height: 14px;
          margin-right: 20px;
          background: url('${burgerIcon}') no-repeat top left;
        }
      `}
    </style>
  </>

export default BurgerButton
