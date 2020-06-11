import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash/object'
import logger from 'js/utils/logger'
import SearchResultsBing from 'js/components/Search/SearchResultsBing'
// import fetchBingSearchResults from 'js/components/Search/fetchBingSearchResults'
import { isReactSnapClient } from 'js/utils/search-utils'
import { getCurrentUser } from 'js/authentication/user'
import LogSearchMutation from 'js/mutations/LogSearchMutation'
import { makePromiseCancelable } from 'js/utils/utils'
// import { setBingClientID } from 'js/utils/local-user-data-mgr'

const fetchCodefuelSearchResults = async () => {
  // TODO
  console.log('Fetch search results.')
  return {}
}

class SearchResultsQueryBing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResultsData: null,
      queryInProgress: false,
      queryReturned: false,
      unexpectedSearchError: false,
      mounted: false, // i.e. we've mounted to a real user, not pre-rendering
    }
    this.cancelablePromise = null
  }

  componentDidMount() {
    const { query } = this.props

    // Fetch a query if one exists on mount.
    if (query) {
      this.getSearchResults()
    }

    // Mark that we've mounted for a real user. In other words, this
    // is not React Snap prerendering.
    if (!isReactSnapClient()) {
      this.setState({
        mounted: true,
      })
    }
  }

  componentWillUnmount() {
    if (this.cancelablePromise && this.cancelablePromise.cancel) {
      this.cancelablePromise.cancel()
    }
  }

  componentDidUpdate(prevProps) {
    // Fetch search results if a query exists and either the page
    // or query has changed.
    if (
      this.props.query &&
      (this.props.page !== prevProps.page ||
        this.props.query !== prevProps.query)
    ) {
      this.getSearchResults()
    }
  }

  async getSearchResults() {
    const { page, query, searchSource } = this.props
    if (!query) {
      return
    }

    // Log the search event.
    // We're not passing the user as a prop to this component because
    // we don't want to delay the component mount.
    getCurrentUser().then(user => {
      if (user && user.id) {
        LogSearchMutation({
          userId: user.id,
          ...(searchSource && { source: searchSource }),
        })
      }
    })

    // Reset state of search results.
    this.setState({
      queryInProgress: true,
      queryReturned: false,
      unexpectedSearchError: false,
    })

    try {
      this.cancelablePromise = makePromiseCancelable(
        fetchCodefuelSearchResults({
          query,
          ...(page && { page }),
        })
      )
      const searchResults = await this.cancelablePromise.promise

      // TODO: handle errors
      // const searchErrors = get(searchResults, 'bing.errors', [])

      this.setState({
        queryInProgress: false,
        queryReturned: true,
        searchResultsData: searchResults,
        // unexpectedSearchError: searchErrors.length > 0,
      })

      // Log any errors.
      // if (searchErrors.length) {
      //   searchErrors.forEach(err => {
      //     logger.error(err)
      //   })
      // }
    } catch (e) {
      if (e && e.isCanceled) {
        return
      }
      this.setState({
        queryInProgress: false,
        queryReturned: true,
        unexpectedSearchError: true,
      })
      logger.error(e)
    }
  }

  // TODO: modify for Codefuel
  /**
   * Restructure the raw search results data into search sections with
   * each item's full data.
   * @param {Object} data - The search results data returned from the API
   * @return {Object} searchData - The restructured search results data
   * @return {Object} searchData.resultsCount - The estimated number of webpages
   *   in results
   * @return {Object} searchData.results
   * @return {Array<SearchResultItem>} searchData.results.pole - Search result items in
   *   the "pole"(i.e. most prominent) display position.
   * @return {Array<SearchResultItem>} searchData.results.mainline - Search result items
   *   in the "mainline" (i.e. second-most-prominent) display position.
   * @return {Array<SearchResultItem>} searchData.results.sidebar - Search result items
   *   in the "sidebar" (i.e. less prominent) display position.
   * The SearchResultItem has a structure of:
   *   {String} SearchResultItem.type - The type of search result (e.g. WebPages, News, Videos).
   *   {String} SearchResultItem.key - A unique key for this search result item
   *   {Object} SearchResultItem.value - The raw data for this search result item as
   *.    returned by the API.
   */
  restructureSearchResultsData(data) {
    const searchResultSections = ['pole', 'mainline', 'sidebar']
    const restructuredData = {
      instrumentation: get(data, 'instrumentation', null),
      results: searchResultSections.reduce((newData, sectionName) => {
        // Get the ranked list for this section.
        const rankingItems = get(
          data,
          `rankingResponse.${sectionName}.items`,
          []
        )

        // For each ranked item, get the actual data for that item.
        // https://github.com/Azure-Samples/cognitive-services-REST-api-samples/blob/master/Tutorials/Bing-Web-Search/public/js/script.js#L168
        newData[sectionName] = rankingItems
          .map(itemRankingData => {
            const typeName =
              itemRankingData.answerType[0].toLowerCase() +
              itemRankingData.answerType.slice(1)

            // https://github.com/Azure-Samples/cognitive-services-REST-api-samples/blob/master/Tutorials/Bing-Web-Search/public/js/script.js#L172
            let itemData
            switch (typeName) {
              case 'ads': {
                itemData = get(
                  data,
                  `${typeName}.value[${itemRankingData.resultIndex}]`
                )
                break
              }
              case 'computation': {
                itemData = get(data, typeName)
                break
              }
              case 'news': {
                itemData = get(data, `${typeName}.value`)
                break
              }
              case 'timeZone': {
                itemData = get(data, typeName)
                break
              }
              case 'webPages': {
                itemData = get(
                  data,
                  `${typeName}.value[${itemRankingData.resultIndex}]`
                )
                break
              }
              case 'videos': {
                itemData = get(data, `${typeName}.value`)
                break
              }
              default: {
                itemData = get(
                  data,
                  `${typeName}.value[${itemRankingData.resultIndex}]`
                )
              }
            }

            // Return null if we couldn't find the result item data.
            if (!(itemRankingData.answerType && itemData)) {
              return null
            }
            return {
              type: itemRankingData.answerType,
              key: itemData.id
                ? `${itemRankingData.answerType}-${itemData.id}`
                : itemRankingData.answerType,
              value: itemData,
            }
          })
          // Filter null item data.
          .filter(itemData => !!itemData)
        return newData
      }, {}),
      resultsCount: get(data, 'webPages.totalEstimatedMatches'),
    }
    return restructuredData
  }

  changePage(newPageIndex) {
    const { onPageChange, page } = this.props
    if (newPageIndex === page) {
      return
    }
    onPageChange(newPageIndex)

    // Scroll to the top of the page.
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }

  render() {
    const { page, query } = this.props
    const {
      queryInProgress,
      queryReturned,
      searchResultsData,
      unexpectedSearchError,
    } = this.state
    const restructuredData = this.restructureSearchResultsData(
      get(searchResultsData, 'bing')
    )

    // Whether there are no search results for whatever reason.
    const isEmptyQuery = this.state.mounted && !query
    return (
      // TODO: modify for Codefuel
      <SearchResultsBing
        data={restructuredData}
        isEmptyQuery={isEmptyQuery}
        isError={unexpectedSearchError}
        isQueryInProgress={queryInProgress}
        query={query}
        queryReturned={queryReturned}
        onPageChange={this.changePage.bind(this)}
        page={page}
      />
    )
  }
}

SearchResultsQueryBing.propTypes = {
  query: PropTypes.string,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  searchSource: PropTypes.string,
}

SearchResultsQueryBing.defaultProps = {
  page: 1,
  style: {},
}

export default SearchResultsQueryBing
