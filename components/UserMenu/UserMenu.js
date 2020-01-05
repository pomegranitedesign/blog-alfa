import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserMenuItem from './UserMenuItem'
import { withRouter } from 'next/router'
import styles from './UserMenu.css'

class UserMenu extends Component {
  onClick = (e) => {
    e.defaultPrevented && e.preventDefault()
    this.props.onClose && this.props.onClose()
    const href = e.target.getAttribute('href')
    if (href && href.length) {
      if (href === '/auth/logout/') { // TODO outdated for blog
        this.props.onLogout()
      } else {
        this.props.router.push(e.target.getAttribute('href'))
      }
    }
  }

  render() {
    const { items, centered } = this.props
    return (
      <nav className={`Wrapper ${ centered ? 'Centered' : '' }`}>
        <ul className='List'>
          {items.map((item, index) => (
            <UserMenuItem
              onClick={this.onClick}
              item={item}
              key={`usermenu.${index}`}
              centered={centered}
            />
          ))}
        </ul>
        <style jsx>{styles}</style>
      </nav>
    )
  }
}

UserMenu.propTypes = {
  items: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func,
  centered: PropTypes.bool
}

export default withRouter(UserMenu)
