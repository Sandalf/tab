import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

import { validateUsername } from 'js/utils/utils'

class UsernameField extends React.Component {
  constructor(props) {
    super(props)
    this.inputElem = null
    this.state = {
      username: null,
      validationErrorMessage: null,
    }
  }

  hasValue() {
    return !!(
      this.inputElem &&
      this.inputElem.value &&
      this.inputElem.value.trim()
    )
  }

  getValue() {
    if (this.hasValue()) {
      return this.inputElem.value.trim()
    }
    return null
  }

  setErrorMessage(message) {
    this.setState({
      validationErrorMessage: message,
    })
  }

  validate() {
    if (this.hasValue()) {
      const username = this.inputElem.value.trim()

      const { isValid, reason } = validateUsername(username)
      if (!isValid) {
        switch (reason) {
          case 'TOO_SHORT': {
            this.setErrorMessage('Must be at least two characters.')
            break
          }
          case 'TOO_LONG': {
            this.setErrorMessage('Must be shorter than 30 characters.')
            break
          }
          case 'NO_SPACES': {
            this.setErrorMessage('Cannot contain spaces.')
            break
          }
          case 'NO_AT_SIGN': {
            this.setErrorMessage('Should not contain "@".')
            break
          }
          default: {
            this.setErrorMessage('Username is invalid.')
            break
          }
        }
      } else {
        this.setErrorMessage(null)
      }
      return isValid
    } else {
      this.setErrorMessage('Must be at least two characters.')
      return false
    }
  }

  render() {
    const { usernameDuplicate, otherError, ...otherProps } = this.props
    const { validationErrorMessage } = this.state
    const errMessage = usernameDuplicate
      ? 'Username is already taken. Please choose another.'
      : otherError
      ? 'There was an error saving your username. Please try again later.'
      : validationErrorMessage
    return (
      <TextField
        id={'username-input'}
        data-test-id={'username-field-text-input'}
        inputRef={input => {
          this.inputElem = input
        }}
        {...otherProps}
        error={!!errMessage}
        helperText={errMessage}
      />
    )
  }
}

UsernameField.propTypes = {
  usernameDuplicate: PropTypes.bool,
  otherError: PropTypes.bool,
}

UsernameField.defaultProps = {
  usernameDuplicate: false,
  otherError: false,
}

export default UsernameField
