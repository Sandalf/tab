import getMockBingSearchResults from 'js/components/Search/getMockBingSearchResults'
import { getSearchResultCountPerPage } from 'js/utils/search-utils'

/**
 * Call our search API endpoint.
 * @param {String} query - The search query, unencoded.
 * @return {Object}
 */
const fetchBingSearchResults = async (query = null) => {
  if (!query) {
    throw new Error(`Search query must be a non-empty string.`)
  }
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_MOCK_SEARCH_RESULTS === 'true'
  ) {
    // Mock search results, including network delay.
    return new Promise(resolve => {
      setTimeout(() => resolve(getMockBingSearchResults()), 400)
    })
  }
  try {
    const endpoint = process.env.REACT_APP_SEARCH_QUERY_ENDPOINT
    if (!endpoint) {
      throw new Error('Search query endpoint is not defined.')
    }

    // Possible values:
    // Computation, Entities, Images, News, RelatedSearches, SpellSuggestions,
    // TimeZone, Videos, Webpages
    // Add to filters as we support displaying a cateogry.
    const responseFilter = 'Webpages,News'
    const searchURL = `${endpoint}?q=${encodeURI(
      query
    )}&count=${getSearchResultCountPerPage()}&responseFilter=${responseFilter}`
    return fetch(searchURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response
          .json()
          .then(response => response.bing)
          .catch(e => {
            throw e
          })
      })
      .catch(e => {
        throw e
      })
  } catch (e) {
    throw e
  }
}

export default fetchBingSearchResults