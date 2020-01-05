import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'


const userMenu = [
  { label: 'Overview', link: '/user/portfolio', icon: 'overview' },
  { label: 'Account settings', link: '/user/settings', icon: 'settings' },
  { label: 'Log out', link: '/auth/logout', icon: 'logout' }
]


class SignedMobile extends Component {

  state = {
    showCart: false
  }

  onClosePopover = (el) => {
    const { target } = el.props
    if (target === this.cart.current) {
      this.setState({ showCart: false })
    }
  }


  onLogout = () => {
    this.props.onLogout && this.props.onLogout()
  }

  render() {
    const {
      userCountersStore: { cart }
    } = this.props
    return (
      <aside className='Box'>
        <div className='QuickActions'>
          <figure
            className='Cart'
            onClick={this.showCart}
            ref={this.cart}
          >
            <img alt={'cart icon'} src={CartIcon}/>
            {cart > 0 && <span className='ItemsCount'>{cart}</span>}
          </figure>

        </div>
        {/*language=SCSS*/}
        <style jsx>
          {`
            .Box {
              display: flex;
              justify-content: space-between;
              align-content: center;
              align-items: center;
            }

            .UserPic {
              background: rgba(251, 155, 143, 0.2);
              border-radius: 5px;
              width: 5rem;
              height: 5rem;
              margin: 0 20px 0 30px;
              font-size: 1.8rem;
              text-transform: uppercase;
              text-align: center;
              color: #FB9B8F;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .UserName {
              font-size: 1.4rem;
              color: #9AA1B8;
              cursor: pointer;
            }

            .ArrowIcon {
              display: inline-block;
              color: #9aa1b8;
              vertical-align: middle;
            }

            .QuickActions {
              margin-left: 5rem;
              display: flex;
            }

            .Notifications {
              margin-right: 5rem;
              position: relative;
              cursor: pointer;
            }

            .ItemsCount {
              display: flex;
              position: absolute;
              right: -1.5rem;
              top: -1.5rem;
              justify-content: center;
              align-items: center;
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 100%;
              background: #FB9B8F;
              color: #ffffff;
              font-size: 1.3rem;
              box-sizing: border-box;
            }

            .Cart {
              position: relative;
              cursor: pointer;
            }
          `}
        </style>
      </aside>
    )
  }
}

SignedMobile.propTypes = {
  userCountersStore: PropTypes.any.isRequired,
  store: PropTypes.any.isRequired
}

export default withRouter(SignedMobile)
