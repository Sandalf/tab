import { get, set } from 'lodash/object'
import {
  SEARCH_PROVIDER_BING,
  SEARCH_PROVIDER_CODEFUEL,
  SEARCH_PROVIDER_YAHOO,
} from 'js/constants'
import { getUrlParameters } from 'js/utils/utils'
import { detectSupportedBrowser } from 'js/utils/detectBrowser'
import {
  CHROME_BROWSER,
  FIREFOX_BROWSER,
  SEARCH_SRC_CHROME_EXTENSION,
  SEARCH_SRC_FIREFOX_EXTENSION,
} from 'js/constants'

// Returns whether react-snap is the one running the app.
// This is useful to adjust what we want to prerender.
// https://github.com/stereobooster/react-snap/issues/245#issuecomment-414347911
export const isReactSnapClient = () => {
  try {
    return navigator.userAgent === 'ReactSnap'
  } catch (e) {
    return false
  }
}

/**
 * Return which search provider to use.
 * @return {String} The search provider name, either 'bing' or 'yahoo'.
 */
export const getSearchProvider = () => {
  const envSearchProvider = process.env.REACT_APP_SEARCH_PROVIDER
  switch (envSearchProvider) {
    case SEARCH_PROVIDER_BING:
      return SEARCH_PROVIDER_BING
    case SEARCH_PROVIDER_CODEFUEL:
      return SEARCH_PROVIDER_CODEFUEL
    case SEARCH_PROVIDER_YAHOO:
      return SEARCH_PROVIDER_YAHOO
    default:
      return SEARCH_PROVIDER_CODEFUEL
  }
}

/**
 * Whether to enable pagination buttons for Bing search results.
 * @return {Boolean} Whether to show pagination buttons.
 */
export const showBingPagination = () => true

/**
 * Get how many search results to fetch per page.
 * @return {Number} The count of search results per page.
 */
export const getSearchResultCountPerPage = () => 10

/**
 * Add width and height parameters to a Bing thumbnail URL so we
 * fetch an image whose dimensions will fill the desired space.
 * See:
 * https://docs.microsoft.com/en-us/azure/cognitive-services/bing-entities-search/resize-and-crop-thumbnails
 * @param {String} thumbnailURL - The Bing thumbnail image URL
 * @param {Object} desiredDimensions - The width and height of the
 *   space we want to fill.
 * @param {Number} desiredDimensions.width
 * @param {Number} desiredDimensions.height
 * @return {String} The thumbnail URL with width and height specified
 *   in the URL parameters.
 */
export const getBingThumbnailURLToFillDimensions = (
  thumbnailURL,
  desiredDimensions
) => {
  // If we're missing any required data, don't modify the
  // thumbnail URL.
  if (
    !(desiredDimensions && desiredDimensions.width && desiredDimensions.height)
  ) {
    return thumbnailURL
  }

  var finalURL
  try {
    const url = new URL(thumbnailURL)
    url.searchParams.set('w', desiredDimensions.width)
    url.searchParams.set('h', desiredDimensions.height)

    // Crop the image using "smart ratio" cropping.
    url.searchParams.set('c', 7)
    finalURL = url.href
  } catch (e) {
    // Fall back on just appending params manually if the browser doesn't
    // support URLSearchParams.
    finalURL = `${thumbnailURL}&w=${desiredDimensions.width}&h=${
      desiredDimensions.height
    }&c=7`
  }

  return finalURL
}

/**
 * Clip text to max characters at the most recent word break,
 * adding ellipses.
 * @param {String} text - The text to clip
 * @param {Number} maxCharacters - The maximum number of characters
 *   to allow, excluding ellipses
 * @return {String} The new text, clipped if it exceeded the max
 *   characters, or unchanged if it had fewer.
 */
export const clipTextToNearestWord = (text, maxCharacters) => {
  if (!(text && text.length)) {
    return text
  }
  if (maxCharacters >= text.length) {
    return text
  }

  // How many characters we should clip *below* the max character
  // limit. For example, if there is no whitespace at all, we
  // shouldn't return an empty string. Likewise, we probably want
  // to cut a long word in half rather than return very little text.
  const MAX_EXTRA_CHARS_CLIPPED = 8

  // The whitespace nearest to the index of maxCharacters.
  const indexOfPrevWhitespace = text.lastIndexOf(' ', maxCharacters)
  const indexToClip =
    indexOfPrevWhitespace < 1 ||
    maxCharacters - indexOfPrevWhitespace > MAX_EXTRA_CHARS_CLIPPED
      ? maxCharacters
      : indexOfPrevWhitespace
  return `${text.substring(0, indexToClip)} ...`
}

/**
 * Determine if the search browser extension is currently
 * installed in the browser. This is a best-guess of whether
 * the extension is installed, because we don't support
 * messaging the extension directly. See:
 * https://github.com/gladly-team/search-extensions/pull/12
 * We implemented extension messaging here:
 * https://github.com/gladly-team/tab/pull/646
 * However, we removed it here due to the extension permission
 * warnings:
 * https://github.com/gladly-team/tab/pull/653
 * @return {Promise<Boolean>} Whether the extension is installed
 */
export const isSearchExtensionInstalled = async () => {
  // If we already detected the extension, just return true.
  const detectedExtPreviously = !!get(
    window,
    'searchforacause.extension.isInstalled'
  )
  if (detectedExtPreviously) {
    return true
  }

  // Do our best to guess whether the extension is installed
  // based on the search "src" URL parameter.
  const urlParams = getUrlParameters()
  const searchSrc = urlParams.src
  const browser = detectSupportedBrowser()
  const isSearchFromExt =
    (browser === CHROME_BROWSER && searchSrc === SEARCH_SRC_CHROME_EXTENSION) ||
    (browser === FIREFOX_BROWSER && searchSrc === SEARCH_SRC_FIREFOX_EXTENSION)

  // If there is no search query, let's say the extension is
  // installed even if we're not sure. This avoids showing the
  // "Add extension" button at inopportune times, like right after
  // we send the user to the search page after sign-in without any
  // URL parameter values set.
  const hasSearchQuery = !!urlParams.q
  const isInstalled = !hasSearchQuery || isSearchFromExt
  if (isInstalled) {
    set(window, 'searchforacause.extension.isInstalled', true)
  }
  return isInstalled
}

/**
 * Get the "window.searchforacause" global variable.
 * @return {Object}
 */
export const getSearchGlobal = () => {
  const searchforacause = window.searchforacause || {
    // Deprecated.
    search: {
      fetchedOnPageLoad: false,
      YPAErrorOnPageLoad: null,
    },
    // We rely on this in the SearchResultsQueryBing component.
    // It allows us to fetch search results before loading all of
    // the app JS.
    queryRequest: {
      // The status of any request to get search results data.
      // One of: 'NONE', 'IN_PROGRESS', 'COMPLETE'
      status: 'NONE',
      // Whether our app already used the search response data here
      // to render results. Our app can display these results if
      // "displayedResults" == false, "status" == "COMPLETE", and
      // "responseData" !== null.
      displayedResults: false,
      // Response data from the search results request.
      responseData: null,
    },
    extension: {
      // Whether the browser extension is installed, to the best
      // of our knowledge.
      isInstalled: false,
    },
  }
  // We're not running in global scope, so make sure to
  // assign to the window.
  if (!window.searchforacause) {
    window.searchforacause = searchforacause
  }
  return searchforacause
}
