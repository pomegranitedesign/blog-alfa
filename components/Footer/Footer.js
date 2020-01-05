import React, { Component } from 'react'
import Facebook from './assets/Facebook.svg'
import FacebookHover from './assets/Facebook_hover.svg'
import Linkedin from './assets/Linkedin.svg'
import LinkedinHover from './assets/Linkedin_hover.svg'
import Instagram from './assets/Instagram.svg'
import InstagramHover from './assets/Instagram_hover.svg'
import Twitter from './assets/Twitter.svg'
import TwitterHover from './assets/Twitter_hover.svg'
import styles from './Footer.css'

export class Footer extends Component {
  links = [
    [
      {
        title: 'How it Works',
        link: 'https://farmtogether.com/how-it-works'
      },
      {
        title: 'Blog',
        link: '/'
      },
      {
        title: 'FAQ',
        link: 'https://farmtogether.com/help/faq'
      },
      {
        title: 'Terms of use',
        link: 'https://farmtogether.com/help/terms'
      }
    ],
    [
      {
        title: 'Privacy policy',
        link: 'https://farmtogether.com/help/privacy'
      },
      {
        title: 'Disclosures',
        link: 'https://farmtogether.com/help/disclosures'
      },
      {
        title: 'Electronic Communications Disclosure',
        link: 'https://farmtogether.com/help/communication'
      },
      {
        title: 'Electronic Fund Transfers Disclosure',
        link: 'https://farmtogether.com/help/transfer'
      }
    ]
  ]
  social = [
    {
      icon: 'Linkedin',
      link: 'https://www.linkedin.com/company/farmtogether',
      title: 'Linkedin'
    },
    {
      icon: 'Facebook',
      link: 'https://www.facebook.com/farmtogetherhq',
      title: 'Facebook'
    },
    {
      icon: 'Instagram',
      link: 'https://www.instagram.com/farmtogetherhq/',
      title: 'Instagram'
    },
    {
      icon: 'Twitter',
      link: 'https://twitter.com/FarmTogetherhq',
      title: 'Twitter'
    }
  ]

  render() {
    const { isMobile } = this.props
    let updatedLinks = this.links
    if (isMobile) {
      updatedLinks = [[].concat(this.links[0]).concat(this.links[1])]
    }
    return (
      <footer className='Box'>
        <nav className='Nav'>
          {updatedLinks.map((links, index) => (
            <ul className='List' key={`Links.${index}`}>
              {links.map((link, index) => (
                <li key={`link.${index}`} className='ListItem'>
                    <a href={`${link.link}`} className='Link'>{link.title}</a>
                </li>
              ))}
            </ul>
          ))}
        </nav>
        <div className='SocialBlock'>
          <p>
            +1 904 404 5902 <span>|</span> <a onClick={this.onScheduleCallClick}
                                              href='https://calendly.com/artem-mil/15min?utm_source=site'
                                              target='_blank' rel="noopener noreferrer">Schedule a Call</a>
          </p>
          <p>
            <a href="mailto:info@farmtogether.com">info@farmtogether.com</a>
          </p>
          <p>
            995 Market Street, San Francisco, CA
          </p>
          <ul className='SocialList'>
            {this.social.map((item, index) => (
              <li key={`social.${index}`} className='SocialListItem'>
                <a
                  href={`${item.link}`}
                  title={item.title}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={item.icon}/>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='Copyright'>
          &copy;&nbsp;{new Date().getFullYear()} FarmTogether Inc.
        </div>
        <style jsx>{styles}</style>
        {/*language=SCSS*/}
        <style jsx>
          {`
            .Facebook {
              background: url('${Facebook}') no-repeat top left;
            }
            .Facebook:hover {
              background: url('${FacebookHover}') no-repeat top left;
            }
            .Linkedin {
              background: url('${Linkedin}') no-repeat top left;
            }
            .Linkedin:hover {
              background: url('${LinkedinHover}') no-repeat top left;
            }
            .Instagram {
              background: url('${Instagram}') no-repeat top left;
            }
            .Instagram:hover {
              background: url('${InstagramHover}') no-repeat top left;
            }
            .Twitter {
              background: url('${Twitter}') no-repeat top left;
            }
            .Twitter:hover {
              background: url('${TwitterHover}') no-repeat top left;
            }
          `}
        </style>
      </footer>
    )
  }
}
