import {
  goTo,
  goToLogin,
  replaceUrl,
  authMessageURL,
  enterUsernameURL,
  missingEmailMessageURL,
  verifyEmailURL
} from 'navigation/navigation'
import {
  isInIframe
} from 'web-utils'

/**
 * Based on the user object, determine if we need to redirect
 * to an authentication page to.
 * @param {object} user - The user object for the app.
 * @param {string} user.id - The user's ID
 * @param {string} user.email - The user's email
 * @param {string} user.username - The user's username
 * @param {boolean} user.isAnonymous - Whether the user is anonymous
 * @param {boolean} user.emailVerified - Whether the user has verified their email
 */
export const checkAuthStateAndRedirectIfNeeded = user => {
  // If the user is not fully logged in, redirect to the
  // appropriate auth page.
  // User is not logged in.
  if (!user || !user.id) {
    // If the page is in an iframe (e.g. the user opened it via an iframed
    // new tab), authentication may not work correctly. Show an intermediary
    // page that will open a non-iframed auth page.
    if (isInIframe()) {
      goTo(authMessageURL)
    } else {
      goToLogin()
    }
  // If the user does not have an email address, show a message
  // asking them to sign in with a different method.
  } else if (!user.email) {
    replaceUrl(missingEmailMessageURL)
  // User is logged in but their email is not verified.
  } else if (!user.emailVerified) {
    replaceUrl(verifyEmailURL)
  // User is logged in but has not set a username.
  } else if (!user.username) {
    replaceUrl(enterUsernameURL)
  }
}
