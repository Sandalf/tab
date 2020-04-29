import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import environment from 'js/relay-env'
import UsernameField from 'js/components/General/UsernameField'
import SetUsernameMutation from 'js/mutations/SetUsernameMutation'
import { setUsernameInLocalStorage } from 'js/authentication/user'
import { checkIfEmailVerified } from 'js/authentication/helpers'
import logger from 'js/utils/logger'
import { SEARCH_APP, TAB_APP } from 'js/constants'

class EnterUsernameForm extends React.Component {
  constructor(props) {
    super(props)
    this.usernameFieldRef = null
    this.state = {
      usernameDuplicate: false,
      otherError: false,
      savingUsernameInProgress: false,
    }
  }

  componentDidMount() {
    // See if the user verified their email address so that we can
    // log the verification. It would be better to user a cloud
    // function for this, or at least an official callback from the
    // Firebase SDK, but Firebase does not yet support one. See:
    // https://stackoverflow.com/q/43503377
    // We also do this on the email verification screen, but it
    // may fail if Firebase is slow to update, so we're adding it
    // here to reduce the frequency that we fail to log the
    // verification.
    checkIfEmailVerified()
  }

  submit(e) {
    const usernameValid = this.usernameFieldRef.validate()
    const username = this.usernameFieldRef.getValue()
    this.setState({
      usernameDuplicate: false,
      otherError: false,
    })
    if (usernameValid) {
      this.setState({
        savingUsernameInProgress: true,
      })
      SetUsernameMutation(
        environment,
        this.props.user.id,
        username,
        this.onMutationCompleted.bind(this),
        this.onMutationError.bind(this)
      )
    }
  }

  onMutationCompleted(response) {
    const { onCompleted } = this.props
    this.setState({
      savingUsernameInProgress: false,
    })
    const data = response.setUsername

    // Handle server-side validation errors.
    if (!data.user) {
      data.errors.forEach(err => {
        // Username already exists
        if (err.code === 'USERNAME_DUPLICATE') {
          this.setState({
            usernameDuplicate: true,
          })
          // Some other error
        } else {
          this.setState({
            otherError: true,
          })
        }
      })
      return
    }

    // Username saved successfully. Set the username in localStorage
    // and redirect to the app.
    setUsernameInLocalStorage(data.user.username)

    // Go to the app.
    onCompleted()
  }

  onMutationError(response) {
    // TODO: show better error message to the user
    console.error('Error saving username:')
    logger.error(response)
    this.setState({
      savingUsernameInProgress: false,
      otherError: true,
    })
  }

  handleKeyPress(e) {
    if (this.state.savingUsernameInProgress) {
      return
    }

    if (e.key === 'Enter') {
      this.submit()
    }
  }

  render() {
    const { app } = this.props
    return (
      <Paper
        elevation={1}
        style={{
          padding: 24,
          backgroundColor: '#FFF',
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          Choose a username
        </span>
        <UsernameField
          data-test-id={'enter-username-form-username-field'}
          ref={elem => {
            this.usernameFieldRef = elem
          }}
          usernameDuplicate={this.state.usernameDuplicate}
          otherError={this.state.otherError}
          onKeyPress={this.handleKeyPress.bind(this)}
          label={`Username for ${
            app === SEARCH_APP ? 'Search for a Cause' : 'Tab for a Cause'
          }`}
          style={{
            display: 'block',
            width: 280,
            minHeight: 84,
            marginTop: 20,
          }}
          fullWidth
          autoFocus
        />
        <span
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 4,
          }}
        >
          <Button
            data-test-id={'enter-username-form-button'}
            color={'primary'}
            variant={'contained'}
            disabled={this.state.savingUsernameInProgress}
            onClick={this.submit.bind(this)}
            style={{ minWidth: 96 }}
          >
            {this.state.savingUsernameInProgress ? 'Saving...' : 'Next'}
          </Button>
        </span>
      </Paper>
    )
  }
}

EnterUsernameForm.propTypes = {
  app: PropTypes.oneOf([TAB_APP, SEARCH_APP]).isRequired,
  onCompleted: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
}

EnterUsernameForm.defaultProps = {
  app: TAB_APP,
}

export default EnterUsernameForm
