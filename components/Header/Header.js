import React, { Component } from 'react'
import Menu from './Menu/Menu'
import MenuMobile from './Menu/MenuMobile'
import { withRouter } from 'next/router'
import Logo from '../Logo/Logo'
import styles from './Header.css'
import { CloseButton } from '../Buttons/CloseButton'
import { BurgerButton } from '../Buttons/BurgerButton'

class Header extends Component {
  timeoutTimer = null

  constructor(props) {
    super(props)
    this.state = {
      isAuthorized: false,
      user: {},
      lastScrollTop: 0,
      hideHeader: false,
      showMenu: false
    }
  }

  async componentDidMount() {
    const { isMobile } = this.props
    if (window.addEventListener !== undefined) {
      window.addEventListener('storage', this.listenToken)
    } else {
      window.attachListener('storage', this.listenToken)
    }
    if (isMobile) {
      document.addEventListener('scroll', this.handleScroll)
    }
    await this.login()
  }

  componentWillUnmount() {
    const { isMobile } = this.props
    if (isMobile) {
      document.removeEventListener('scroll', this.handleScroll)
    }
  }

  async login() {
    const token = window.localStorage.getItem('authToken')
    const expires = window.localStorage.getItem('authExpires')
    if (token && expires) {
      if (this.timeoutTimer !== null) {
        clearTimeout(this.timeoutTimer)
      }
      const expiresDate = new Date(expires)
      const now = new Date()
      const expiresDateInUtc = new Date(expiresDate.getTime() + expiresDate.getTimezoneOffset() * 60000)
      const currentTimeInUtc = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
      const diff = expiresDateInUtc.getTime() - currentTimeInUtc.getTime()
      if (diff > 0) {
        this.timeoutTimer = setTimeout(() => this.logout(), diff)
        try {
          const response = await fetch(`${process.env.API_URL}/user/info`, { headers: { Authorization: token } })
          const user = await response.json()
          if (response.ok) {
            this.setState({ user, isAuthorized: true })
          }
        } catch (e) {

        }
      } else {
        this.logout()
      }
    } else {
      this.logout()
    }
  }

  listenToken = async (e) => {
    const { key } = e
    if (key === 'authToken' || key === 'authExpires') {
      await this.login()
    }
  }

  logout() {
    clearTimeout(this.timeoutTimer)
    this.setState({ user: {}, isAuthorized: false })
  }

  handleScroll = () => {
    let st = window.pageYOffset
    const { lastScrollTop } = this.state
    if (Math.abs(lastScrollTop - st) <= 5) {
      return
    }
    if (st > lastScrollTop && st > 55) {
      this.setState({ hideHeader: true })
    } else if (st + window.innerHeight < document.body.scrollHeight) {
      this.setState({ hideHeader: false })
    }
    this.setState({ lastScrollTop: st })
  }

  closeMenu = () => this.setState({ showMenu: false })
  openMenu = () => this.setState({ showMenu: true })

  render() {
    const { isMobile } = this.props
    const { isAuthorized, user, hideHeader } = this.state
    const menuParams = {
      isSigned: isAuthorized,
      userData: user,
      showMenu: this.state.showMenu
    }
    return (
      <section className={`Header ${hideHeader ? 'HeaderHide' : ''}`}>
        <figure className='Logo'>
          <a href="https://farmtogether.com"><Logo isMobile={isMobile}/></a>
        </figure>
        {isMobile ? <MenuMobile {...menuParams} /> : <Menu {...menuParams} />}

        {isMobile &&
        <>
          {!this.state.showMenu
            ? <BurgerButton onClick={() => this.openMenu(this)}/>
            : <CloseButton onClick={() => this.closeMenu(this)}/>
          }
        </>
        }

        <style jsx>{styles}</style>
      </section>
    )
  }
}

export default withRouter(Header)
