import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

import AccountView from 'js/components/Settings/Account/AccountView'
import ProfileDonateHearts from 'js/components/Settings/Profile/ProfileDonateHeartsView'
import SearchProfileInviteFriend from 'js/components/Search/Settings/SearchProfileInviteFriendView'
import SettingsMenuItem from 'js/components/Settings/SettingsMenuItem'
import SettingsPage from 'js/components/Settings/SettingsPageComponent'
import withUser from 'js/components/General/withUser'
import { SEARCH_APP } from 'js/constants'
import {
  goTo,
  searchAccountURL,
  searchBaseURL,
  searchDonateHeartsURL,
  searchInviteFriendsURL,
} from 'js/navigation/navigation'

const styles = theme => ({
  list: {
    marginLeft: 14,
  },
  listSubheader: {
    paddingLeft: 14,
  },
})

const SearchSettingsPage = props => {
  const { authUser, classes } = props
  return (
    <SettingsPage
      onClose={() => {
        goTo(searchBaseURL)
      }}
      sidebarContent={({ showError }) => (
        <List className={classes.list}>
          <ListSubheader disableSticky className={classes.listSubheader}>
            Your Profile
          </ListSubheader>
          <SettingsMenuItem key={'donate'} to={searchDonateHeartsURL}>
            Donate Hearts
          </SettingsMenuItem>
          <SettingsMenuItem key={'invite'} to={searchInviteFriendsURL}>
            Invite Friends
          </SettingsMenuItem>
          <Divider />
          <SettingsMenuItem key={'account'} to={searchAccountURL}>
            Account
          </SettingsMenuItem>
        </List>
      )}
      mainContent={({ showError }) => (
        <Switch>
          <Route
            exact
            path="/search/profile/donate/"
            render={props => (
              <ProfileDonateHearts
                {...props}
                authUser={authUser}
                showError={showError}
              />
            )}
          />
          <Route
            exact
            path="/search/profile/invite/"
            render={props => (
              <SearchProfileInviteFriend
                {...props}
                authUser={authUser}
                showError={showError}
              />
            )}
          />
          <Route
            exact
            path="/search/account/"
            render={props => (
              <AccountView
                {...props}
                authUser={authUser}
                showError={showError}
              />
            )}
          />
          {/* Redirect any incorrect paths */}
          <Redirect from="/search/profile/*" to="/search/profile/donate/" />
          <Redirect from="/search/account/*" to="/search/account/" />
        </Switch>
      )}
    />
  )
}

SearchSettingsPage.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(
  withUser({ app: SEARCH_APP, createUserIfPossible: false })(SearchSettingsPage)
)
