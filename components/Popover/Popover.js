import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

class Popover extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.className = `${this.props.className || ''} ${'PopoverBox'}`
    if (this.props.position === 'center') {
      this.el.className += ' PopoverBoxCenter'
    }
    this.content = document.createElement('div')
    this.content.className = 'PopoverContent'
    this.onBodyClick = this.onBodyClick.bind(this)
  }

  onBodyClick(e) {
    const pos = this.calculatePosition()
    const isInner =
      e.clientX >= pos.left &&
      e.clientX <= pos.left + pos.width &&
      e.clientY >= pos.top &&
      e.clientY <= pos.top + pos.height
    if (e.target === this.el || isInner) {

    } else {
      this.props.onClose && this.props.onClose(this)
    }
  }

  componentDidMount() {
    const pos = this.calculatePosition()
    this.el.style = `left:${pos.left}px;top:${pos.top}px;width:${this.props.width || 350}px`
    this.el.appendChild(this.content)
    document.body.appendChild(this.el)
    if (document.addEventListener !== undefined) {
      document.addEventListener('click', this.onBodyClick)
    } else {
      document.attachEventListener('click', this.onBodyClick)
    }
  }

  calculatePosition() {
    const boundries = this.props.target.getBoundingClientRect()
    const scroll =
      document.documentElement.scrollTop || document.body.scrollTop
    const width = this.props.width || 350
    const height = this.el.getBoundingClientRect().height
    let left = boundries.x - width + boundries.width + 30
    let top = boundries.y + boundries.height + 50 + scroll
    if (this.props.position === 'center') {
      left = boundries.x + boundries.width / 2 - width / 2
    }
    return {
      left,
      top,
      width,
      height
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
    if (document.removeEventListener !== undefined) {
      document.removeEventListener('click', this.onBodyClick)
    } else {
      document.removeEventListener('click', this.onBodyClick)
    }
  }

  render() {
    return createPortal(this.props.children, this.content)
  }
}

Popover.propTypes = {
  width: PropTypes.number,
  target: PropTypes.any.isRequired,
  onClose: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right', 'center'])
}

export default Popover
