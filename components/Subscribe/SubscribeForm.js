import React from 'react'
import TextField from '@material-ui/core/TextField'
import { createUseStyles } from 'react-jss'

import { Error } from '../Icons/Error'
import { isEmail } from '../../utils/validators'
import Tooltip from './assets/Tooltip.svg'
import styles from './SubscribeForm.css'
import submitImg from './assets/submit.svg'

const useStyles = createUseStyles({
  textField: {
    width: '100%',

    '& input': {
      width: '100%',
      fontSize: 16
    },

    '& label': {
      fontSize: 14
    }
  }
})

class SubscribeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      submitted: false,
      invalidEmail: false
    }
  }

  onChange = e => {
    const { value } = e.target
    const { invalidEmail } = this.state
    if (invalidEmail) {
      const valid = isEmail(value)
      this.setState({ email: value, invalidEmail: !valid, submitted: valid })
    } else {
      this.setState({ email: value })
    }
  }
  onSubmit = () => {
    const { email } = this.state
    if (isEmail(email)) {
      this.props.onSubmit(email)
    } else {
      this.setState({ submitted: false, invalidEmail: true })
    }
  }

  render() {
    const { invalidEmail, submitted } = this.state
    return (
      <div className="Container">
        <div className="Form">
          <div style={{ padding: 35 }}>
            <span style={{ display: 'flex', color: '#606477', marginBottom: -12, fontSize: 14 }}>
              Newsletter
            </span>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StyledTextField
                variant="standard"
                onChange={this.onChange}
                type="email"
                name="email"
                placeholder="Add your email to subscribe"
              />

              <img
                src={submitImg}
                alt="Submit image"
                style={{ marginLeft: 25, cursor: 'pointer' }}
                onClick={this.onSubmit}
              />
            </div>

            {invalidEmail && (
              <div className="InvalidEmail">
                <div className="ErrorIcon">
                  <Error />
                </div>
                <div className="ErrorMessage">Please enter valid email address</div>
              </div>
            )}
          </div>
        </div>

        <style jsx>{styles}</style>
        {/*language=SCSS*/}
        <style jsx>
          {`
            .InvalidEmail {
              background-image: url('${Tooltip}');
            }
          `}
        </style>
      </div>
    )
  }
}

const StyledTextField = ({ variant, onChange, type, name, label, helperText }) => {
  const { textField } = useStyles()

  return (
    <TextField
      variant={variant}
      className={textField}
      onChange={onChange}
      type={type}
      name={name}
      label={label}
      helperText={helperText}
    />
  )
}

export default SubscribeForm
