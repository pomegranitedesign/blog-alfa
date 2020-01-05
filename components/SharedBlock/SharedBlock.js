import React from 'react'
import { Linkedin } from '../Icons/Linkedin'
import { Facebook } from '../Icons/Facebook'
import { Mail } from '../Icons/Mail'
import styles from './SharedBlock.css'

class SharedBlock extends React.Component {
  getSocialLink = (type, slug, title = '', excerpt = '') => {
    const url = `https://blog.farmtogether.com/${slug}/`
    switch (type) {
      case 'Facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`
      case 'Linkedin':
        return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=&summary=&source=`
      case 'Mail':
        const body = `${excerpt} \n\n» ${url}`
        return `mailto:info@farmtogether.com?subject=${encodeURIComponent(
          title
        )}&body=${encodeURIComponent(body)}`
    }
  }

  render() {
    return (
      <div className="SharingBlock">
        <div className="SharingBlockHeading">Share</div>
        <div className="SharingBlockButtons">
          <a href={this.getSocialLink('Linkedin', post.slug)} target="_blank">
            <Linkedin />
          </a>
          <a href={this.getSocialLink('Facebook', post.slug)} target="_blank">
            <Facebook />
          </a>
          <a href={this.getSocialLink('Mail', post.slug, post.title, post.excerpt)}>
            <Mail />
          </a>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

export default SharedBlock
