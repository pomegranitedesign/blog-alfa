import { Component } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import Back from './assets/Back.svg'
import Cross from './assets/Cross.png'
import styles from './PopoverMobile.css'

class PopoverMobile extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.className = `${this.props.className || ''} ${'PopoverMobileBox'}`
    this.content = document.createElement('div')
    this.content.className = 'PopoverMobileContent'
  }

  onTouchStart = (e) => {
    e.defaultPrevented && e.preventDefault()
  }

  componentDidMount() {
    this.el.appendChild(this.content)
    document.body.appendChild(this.el)
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
  }

  render() {
    const { back, title, close } = this.props
    return <>
      {
        createPortal(
          <div className='wrapper' onTouchStart={this.onTouchStart}>
            <div className='header'>
              {back && <div onClick={() => this.props.onClose(this)} className='back'/>}
              {title && <h2 className='title'>{title}</h2>}
              {close && <div onClick={() => this.props.onClose(this)} className='close'/>}
            </div>
            {this.props.children}
          </div>, this.content)
      }
      <style jsx global>{styles}</style>
      {/*language=SCSS*/}
      <style jsx global>
        {`
          .back {
            background: url('${Back}') no-repeat center center;
          }

          .close {
            background: url('${Cross}') no-repeat center center;
          }
        `}
      </style>
    </>
  }
}

PopoverMobile.propTypes = {
  target: PropTypes.any.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string,
  back: PropTypes.bool,
  close: PropTypes.bool
}

export default PopoverMobile
