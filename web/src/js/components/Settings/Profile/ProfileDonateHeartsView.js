import React from 'react'
import PropTypes from 'prop-types'
import QueryRendererWithUser from 'js/components/General/QueryRendererWithUser'
import graphql from 'babel-plugin-relay/macro'

import SettingsChildWrapper from 'js/components/Settings/SettingsChildWrapperComponent'
import ProfileDonateHearts from 'js/components/Settings/Profile/ProfileDonateHeartsContainer'
import ErrorMessage from 'js/components/General/ErrorMessage'
import logger from 'js/utils/logger'

class ProfileDonateHeartsView extends React.Component {
  render() {
    const { authUser } = this.props
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <QueryRendererWithUser
          query={graphql`
            query ProfileDonateHeartsViewQuery($userId: String!) {
              app {
                ...ProfileDonateHeartsContainer_app
              }
              user(userId: $userId) {
                ...ProfileDonateHeartsContainer_user
              }
            }
          `}
          variables={{
            userId: authUser.id,
          }}
          render={({ error, props }) => {
            if (error) {
              logger.error(error)
              const errMsg = 'We had a problem loading the Donate Hearts page.'

              // Error will not autohide.
              return <ErrorMessage message={errMsg} />
            }
            const showError = this.props.showError
            const dataLoaded = !!props
            return (
              <SettingsChildWrapper>
                {dataLoaded ? (
                  <ProfileDonateHearts
                    app={props.app}
                    user={props.user}
                    showError={showError}
                  />
                ) : null}
              </SettingsChildWrapper>
            )
          }}
        />
      </div>
    )
  }
}

ProfileDonateHeartsView.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  showError: PropTypes.func.isRequired,
}

ProfileDonateHeartsView.defaultProps = {}

export default ProfileDonateHeartsView
