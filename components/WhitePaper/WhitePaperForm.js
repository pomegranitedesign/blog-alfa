import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { createUseStyles } from 'react-jss'

import { isEmail } from '../../utils/validators'
import styles from './WhitePaperForm.css'

// JSS styles
const useStyles = createUseStyles({
  textField: {
    '& label': {
      fontSize: 14
    },

    '& input': {
      fontSize: 16,
      width: '100%'
    }
  },

  button: {
    width: '100%',

    '& button': {
      marginTop: 25,
      height: 60,
      background: '#FFBF47',
      color: '#ffffff',
      boxShadow: '0 20px 40px 0 rgba(255, 191, 71, 0.35)',
      fontSize: 15
    }
  }
})

class WhitePaperForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      emailValid: true,
      submitted: true
    }
  }

  onChange = e => {
    const { name, value, email } = e.target
    this.setState({ [name]: value })
    if (!isEmail(email)) {
      this.setState({ submitted: false, emailValid: false })
    } else {
      TextField
      TextField
      TextField
      this.props.submit({ firstName, lastName, email })
    }
  }
  onBlur = () => {
    const { email } = this.state
    const valid = isEmail(email)
    this.setState({ submitted: valid, emailValid: valid })
  }

  render() {
    const { firstName, lastName, email, emailValid, submitted } = this.state
    return (
      <div className="Container">
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <StyledTextField
            name="firstName"
            className="Input"
            label="First Name"
            onChange={this.onChange}
            value={firstName}
          />

          <StyledTextField
            name="lastName"
            className="Input"
            label="Last Name"
            onChange={this.onChange}
            value={lastName}
          />

          {!emailValid && <span className="Error">Please enter valid email address</span>}
          <StyledTextField
            name="email"
            className={`Input ${!emailValid && 'InputError'}`}
            label="Email"
            onBlur={this.onBlur}
            onChange={this.onChange}
            value={email}
          />
        </div>

        <StyledButton
          variant="contained"
          color="primary"
          disabled={!submitted}
          className="Btn"
          onClick={this.onSubmit}
        >
          Download White Paper
        </StyledButton>

        <style jsx>{styles} </style>
      </div>
    )
  }
}

const StyledTextField = ({ name, className, label, onBlur, onChange, value }) => {
  const { textField } = useStyles()

  return (
    <TextField
      name={name}
      className={textField}
      label={label}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
    />
  )
}

const StyledButton = ({ variant, color, disabled, className, onClick }) => {
  const { button } = useStyles()

  return (
    <div className={button}>
      <Button
        variant={variant}
        color={color}
        disabled={disabled}
        className={button}
        onClick={onClick}
      >
        Download White Paper
      </Button>
    </div>
  )
}

export default WhitePaperForm
