import React, { Component, createRef } from 'react'
import { PopoverMobile } from '../../../components/Popover'
import { withRouter } from 'next/router'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import UserMenu from '../../UserMenu/UserMenu'
import styles from './MenuMobile.css'
import { Delimiter } from '../../Delimiter'

const learnMenu = [
  { label: 'About us', link: 'https://farmtogether.com/about' },
  { label: 'FAQ', link: 'https://farmtogether.com/help/faq' }
]

const investMenu = [
  { label: 'Investment Offerings', link: 'https://farmtogether.com/marketplace' }
]

const logoutMenu = [
  { label: 'Log Out', link: 'https://farmtogether.com/auth/logout', icon: 'Logout' }
]

const userMenu = [
  { label: 'Overview', link: 'https://farmtogether.com/user/portfolio', icon: 'Overview' },
  { label: 'Account settings', link: 'https://farmtogether.com/user/settings', icon: 'Settings' },
  { label: 'Notifications', link: 'https://farmtogether.com/user/notifications', icon: 'Notifications' }
]


const howItWorksMenu = [
  { label: 'How it works', link: 'https://farmtogether.com/how-it-works/', external: true }
]
const learnMenuExtended = [...howItWorksMenu, ...learnMenu]
const allMenu = [...learnMenu, ...investMenu, ...howItWorksMenu]

class Menu extends Component {

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.menuLink = createRef()
    this.onMenuClose = this.onMenuClose.bind(this)
    this.showLearn = this.showLearn.bind(this)
  }

  onClick(e) {
    e.defaultPrevented && e.preventDefault()
    this.props.router.push('/signup')
  }

  onLogout() {
    this.props.onLogout && this.props.onLogout()
  }

  showLearn(e) {
    e.defaultPrevented && e.preventDefault()
    this.setState({ showMenu: true })
    disableBodyScroll(this.menuLink.current)
  }

  onMenuClose(e) {
    this.setState({ showMenu: false })
    clearAllBodyScrollLocks()
  }

  getLabel() {
    const currentItem = allMenu.filter(item => item.link === this.props.router.pathname)
    return currentItem.length && currentItem[0].label || 'Menu'
  }

  render() {
    const { showMenu, isSigned } = this.props
    return (
      <div className='Menu'>
        <nav className='Nav'>
          <ul className='NavList'>
            <li className='NavListItem' key={`menuitem.learn`}>
              <span
                className='MenuLink'
                ref={this.menuLink}
                onClick={this.showLearn}
              >
                {/*{this.getLabel()}*/}
              </span>
            </li>
          </ul>
          {showMenu &&
          <PopoverMobile target={this.menuLink.current} onClose={this.onMenuClose}
                         close={false} title=' '>

            {isSigned && <UserMenu items={investMenu} onClose={this.onMenuClose} showCurrent={true}/>}

            <UserMenu items={learnMenuExtended} onClose={this.onMenuClose} showCurrent={false} centered={!isSigned}/>
            <Delimiter/>

            {isSigned && <UserMenu items={userMenu} onClose={this.onMenuClose} showCurrent={true}/>}

            {isSigned
              ? <UserMenu items={logoutMenu} onClose={this.onMenuClose} showCurrent={true}/>
              : <div className='Login'>
                <a href="https://farmtogether.com/signup" className='Button btn_login'>Sign Up</a>
                <a href="https://farmtogether.com/auth/signin" className='Button Button_yellow btn_login'>Login</a>
              </div>
            }
          </PopoverMobile>
          }
        </nav>
        <style jsx>{styles}</style>

        {/*language=SCSS*/}
        <style jsx>
          {`
            .Centered {
              text-align: center;
            }
          `}
        </style>
      </div>
    )
  }
}

export default withRouter(Menu)
