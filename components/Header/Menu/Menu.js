import React, { Component, createRef } from 'react'
import { Popover } from '../../../components/Popover'
import { UserMenu } from '../../../components/UserMenu'
import ArrowDropDown from '../../Icons/ArrowDropDown/ArrowDropDown'
import Signed from './Signed/Signed'
import styles from './Menu.css'

const menu = [
  {
    title: 'Investment Offerings',
    path: 'https://farmtogether.com/marketplace',
    protected: true
  },
  {
    title: 'how it works',
    path: 'https://farmtogether.com/how-it-works',
    protected: false
  }

]

const learn = [
  { label: 'About us', link: 'https://farmtogether.com/about' },
  { label: 'FAQ', link: 'https://farmtogether.com/help/faq' },
  { label: 'Blog', link: 'https://blog.farmtogether.com', external: true }
]

class Menu extends Component {
  state = {
    showLearnMenu: false
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.learnLink = createRef()
    this.onLearnClose = this.onLearnClose.bind(this)
    this.showLearn = this.showLearn.bind(this)
  }

  onClick(e) {
    e.defaultPrevented && e.preventDefault()
    this.props.router.push('/signup')
  }

  onLogout() {
    this.props.onLogout && this.props.onLogout()
  }

  handleScrollOutside = (e) => {
    e.stopPropagation()
    if (this.state.showLearnMenu) {
      this.setState({ showLearnMenu: false })
    }
  }

  showLearn(e) {
    e.defaultPrevented && e.preventDefault()
    this.setState({ showLearnMenu: true }, () => {
      document.addEventListener('wheel', this.handleScrollOutside)
    })
  }

  onLearnClose(e) {
    this.setState({ showLearnMenu: false }, () => {
      document.removeEventListener('wheel', this.handleScrollOutside)
    })

  }

  render() {
    const { isSigned, userData } = this.props
    const { showLearnMenu } = this.state
    return (
      <div className='Menu'>
        <nav className='Nav'>
          <ul className='NavList'>
            {menu.map(
              (item, index) =>
                !item.protected || (item.protected && isSigned) ? (
                  <li className='NavListItem' key={`menuitem.${index}`}>
                    <a href={`${item.path}`}>{item.title}</a>
                  </li>
                ) : (
                  undefined
                )
            )}
            <li className='NavListItem' key={`menuitem.learn`}>
              <span
                className='NavItem LearnLink'
                ref={this.learnLink}
                onClick={this.showLearn}
              >
                Learn
              </span>
              <span className='ArrowIcon'><ArrowDropDown/></span>
            </li>
          </ul>
          {showLearnMenu ? (
            <Popover
              width={130}
              position="center"
              target={this.learnLink.current}
              onClose={this.onLearnClose}
            >
              <UserMenu items={learn} onClose={this.onLearnClose}/>
            </Popover>
          ) : (
            undefined
          )}
        </nav>
        {isSigned ? (
          <div className='Login'>
            <Signed
              onLogout={this.onLogout}
              userData={userData}
            />
          </div>
        ) : (
          <div className='Login'>
            <a href="https://farmtogether.com/auth/signin" className='LoginLink'>login</a>
            <a href="https://farmtogether.com/signup" className='Button'>Sign Up</a>
          </div>
        )}
        <style jsx>{styles}
        </style>
      </div>
    )
  }
}

Menu.propTypes = {}

export default Menu
