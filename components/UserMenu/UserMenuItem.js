import React from 'react'
import Link from 'next/link'
import Overview from './assets/Overview.svg'
import Settings from './assets/Settings.svg'
import Logout from './assets/Logout.svg'
import Notifications from './assets/Notifications.svg'
import Cart from './assets/Cart.svg'
import styles from './UserMenuItem.css'

const UserMenuItem = ({ item, onClick, centered }) => {
  const MenuItemExternalLink = (link, label) => (
    <a href={link} className='ItemLink'>{label}</a>
  )
  const MenuItemLink = (link, label) => {
    return (
      <Link href={link}>
        <a onClick={onClick} className='ItemLink'>{label}</a>
      </Link>)
  }
  const MenuItemLabel = (label) => (
    <span className='ItemLink' onClick={onClick}>
        {label}
    </span>
  )
  const MenuItem = (item) => {
    if (!item.link) {
      return MenuItemLabel(item.label)
    }
    if (item.external) {
      return MenuItemExternalLink(item.link, item.label)
    }
    return MenuItemLink(item.link, item.label)
  }
  return (
    <li className={`Item 
        ${item.icon} 
        ${item.icon && 'ItemIcon'}
        ${!item.icon && centered && 'Centered'} 
        ${!item.icon && !centered && 'WithoutIcon'} 
    `}>
      {MenuItem(item)}

      <style jsx global>{styles}
      </style>
      {/*language=SCSS*/}
      <style jsx global>
        {`
           .Overview {
                background-image: url('${Overview}');
            }
            .Settings {
              background-image: url('${Settings}');
              background-position: 1px top;
            }
            .Logout {
              background-image: url('${Logout}');
              background-position: 2px top;
            }
            .Cart {
              background-image: url('${Cart}');
              //background-position: 3px top;
            }
            .Notifications {
              background: url('${Notifications}') no-repeat top left;
              //background-position: 3px top;
            }
            .Centered {
                text-align: center;
                padding-left: 0;
            }
            html[data-is-mobile="true"] {
              .WithoutIcon {
                  margin-left: 40px;
              }
            }
        `}
      </style>
    </li>
  )
}
export default UserMenuItem
