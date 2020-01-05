import * as React from 'react'

const ArrowDropDown = () => (
  <svg className='Icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M7 10l5 5 5-5z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
    {/*language=SCSS*/}
    <style jsx>
      {`
        .Icon {
          fill: currentColor;
          width: 1em;
          height: 1em;
          display: inline-block;
          transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          user-select: none;
          flex-shrink: 0;
          font-size: 24px;
        }
      `}
    </style>
  </svg>
)

export default ArrowDropDown

