import React, { Component, createRef } from 'react'
import { Popover } from '../../../../components/Popover'
import { UserMenu } from '../../../../components/UserMenu'
import { withRouter } from 'next/router'
import ArrowDropDown from '../../../Icons/ArrowDropDown/ArrowDropDown'
import styles from './Signed.css'

const userMenu = [
  { label: 'Overview', link: 'https://farmtogether.com/user/portfolio', icon: 'Overview' },
  { label: 'Account settings', link: 'https://farmtogether.com/user/settings', icon: 'Settings' },
  { label: 'Log out', link: 'https://farmtogether.com/auth/logout', icon: 'Logout' }
]

class Signed extends Component {

  state = {
    showUserMenu: false
  }

  constructor(props) {
    super(props)
    this.userMenu = createRef()
  }

  onClosePopover = (el) => {
    const { target } = el.props
    if (target === this.userMenu.current) {
      this.setState({ showUserMenu: false })
    }
  }

  showUserMenu = () => {
    this.setState({ showUserMenu: !this.state.showUserMenu })
  }

  onCloseUserMenu = () => {
    this.setState({ showUserMenu: false })
  }

  onLogout = () => {
    this.props.onLogout && this.props.onLogout()
  }

  render() {
    const {
      userData
    } = this.props
    const { showUserMenu } = this.state
    return (
      <aside className='Box'>
        <span className='UserPic'>
          {userData
            ? `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`
            : '  '}
        </span>
        <span
          className='UserName'
          onClick={this.showUserMenu}
          ref={this.userMenu}
        >
          {userData
            ? `${userData.firstName} ${userData.lastName}`
            : 'Loading data'}
        </span>
        <span className='ArrowIcon'><ArrowDropDown/></span>
        {showUserMenu ? (
          <Popover
            width={280}
            position="center"
            target={this.userMenu.current}
            onClose={this.onClosePopover}
          >
            <UserMenu items={userMenu} onClose={this.onCloseUserMenu} onLogout={this.onLogout}/>
          </Popover>
        ) : (
          undefined
        )}
        <style jsx>{styles}</style>
      </aside>
    )
  }
}

export default withRouter(Signed)
