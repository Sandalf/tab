/* eslint-env jest */

jest.mock('js/components/Search/fetchBingSearchResults')
jest.mock('js/components/Search/fetchCodefuelSearchResults')
jest.mock('js/utils/search-utils')

beforeEach(() => {
  process.env.REACT_APP_WHICH_APP = 'search'
  process.env.NODE_ENV = 'production'
  const { setWindowLocation } = require('js/utils/test-utils')
  setWindowLocation({
    pathname: '/search',
  })
  const { getSearchProvider } = require('js/utils/search-utils')
  getSearchProvider.mockReturnValue('bing')
})

afterEach(() => {
  jest.clearAllMocks()
  jest.resetModules()
})

afterAll(() => {
  delete process.env.REACT_APP_WHICH_APP
})

describe('searchQuery entry point: CodeFuel prefetching', () => {
  beforeEach(() => {
    const { getSearchProvider } = require('js/utils/search-utils')
    getSearchProvider.mockReturnValue('codefuel')
  })

  it('calls prefetchSearchResults on load', () => {
    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchCodefuelSearchResults')
    require('searchQuery')
    expect(prefetchSearchResults).toHaveBeenCalled()
  })

  it('calls prefetchSearchResults on load if the location pathname has a trailing slash', () => {
    const { setWindowLocation } = require('js/utils/test-utils')
    setWindowLocation({
      pathname: '/search/',
    })
    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchCodefuelSearchResults')
    require('searchQuery')
    expect(prefetchSearchResults).toHaveBeenCalled()
  })

  it('does not call prefetchSearchResults on load if the location pathname is not /search', () => {
    const { setWindowLocation } = require('js/utils/test-utils')
    setWindowLocation({
      pathname: '/search/settings/',
    })
    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchCodefuelSearchResults')
    require('searchQuery')
    expect(prefetchSearchResults).not.toHaveBeenCalled()
  })

  it('does not throw if prefetchSearchResults throws', () => {
    // Suppress expected console error.
    jest.spyOn(console, 'error').mockImplementationOnce(() => {})

    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchCodefuelSearchResults')
    prefetchSearchResults.mockImplementationOnce(() => {
      throw new Error('Eek!')
    })
    require('searchQuery')
  })

  it('logs errors to console', () => {
    // Suppress expected console error.
    const consoleErrSpy = jest
      .spyOn(console, 'error')
      .mockImplementationOnce(() => {})

    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchCodefuelSearchResults')
    const mockErr = new Error('Eek!')
    prefetchSearchResults.mockImplementationOnce(() => {
      throw mockErr
    })
    require('searchQuery')
    expect(consoleErrSpy).toHaveBeenCalledWith(new Error('Eek!'))
  })

  it('does not call prefetchSearchResults when REACT_APP_WHICH_APP == "newtab"', () => {
    process.env.REACT_APP_WHICH_APP = 'newtab'
    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchCodefuelSearchResults')
    require('searchQuery')
    expect(prefetchSearchResults).not.toHaveBeenCalled()
  })

  it('does not call prefetchSearchResults when REACT_APP_WHICH_APP is undefined', () => {
    delete process.env.REACT_APP_WHICH_APP
    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchCodefuelSearchResults')
    require('searchQuery')
    expect(prefetchSearchResults).not.toHaveBeenCalled()
  })

  it('does not call prefetchSearchResults when NODE_ENV is not "production"', () => {
    process.env.NODE_ENV = 'development'
    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchCodefuelSearchResults')
    require('searchQuery')
    expect(prefetchSearchResults).not.toHaveBeenCalled()
  })
})

describe('searchQuery entry point: Bing prefetching', () => {
  it('calls prefetchSearchResults on load', () => {
    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchBingSearchResults')
    require('searchQuery')
    expect(prefetchSearchResults).toHaveBeenCalled()
  })

  it('calls prefetchSearchResults on load if the location pathname has a trailing slash', () => {
    const { setWindowLocation } = require('js/utils/test-utils')
    setWindowLocation({
      pathname: '/search/',
    })
    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchBingSearchResults')
    require('searchQuery')
    expect(prefetchSearchResults).toHaveBeenCalled()
  })

  it('does not call prefetchSearchResults on load if the location pathname is not /search', () => {
    const { setWindowLocation } = require('js/utils/test-utils')
    setWindowLocation({
      pathname: '/search/settings/',
    })
    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchBingSearchResults')
    require('searchQuery')
    expect(prefetchSearchResults).not.toHaveBeenCalled()
  })

  it('does not throw if prefetchSearchResults throws', () => {
    // Suppress expected console error.
    jest.spyOn(console, 'error').mockImplementationOnce(() => {})

    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchBingSearchResults')
    prefetchSearchResults.mockImplementationOnce(() => {
      throw new Error('Eek!')
    })
    require('searchQuery')
  })

  it('logs errors to console', () => {
    // Suppress expected console error.
    const consoleErrSpy = jest
      .spyOn(console, 'error')
      .mockImplementationOnce(() => {})

    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchBingSearchResults')
    const mockErr = new Error('Eek!')
    prefetchSearchResults.mockImplementationOnce(() => {
      throw mockErr
    })
    require('searchQuery')
    expect(consoleErrSpy).toHaveBeenCalledWith(new Error('Eek!'))
  })

  it('does not call prefetchSearchResults when REACT_APP_WHICH_APP == "newtab"', () => {
    process.env.REACT_APP_WHICH_APP = 'newtab'
    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchBingSearchResults')
    require('searchQuery')
    expect(prefetchSearchResults).not.toHaveBeenCalled()
  })

  it('does not call prefetchSearchResults when REACT_APP_WHICH_APP is undefined', () => {
    delete process.env.REACT_APP_WHICH_APP
    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchBingSearchResults')
    require('searchQuery')
    expect(prefetchSearchResults).not.toHaveBeenCalled()
  })

  it('does not call prefetchSearchResults when NODE_ENV is not "production"', () => {
    process.env.NODE_ENV = 'development'
    const {
      prefetchSearchResults,
    } = require('js/components/Search/fetchBingSearchResults')
    require('searchQuery')
    expect(prefetchSearchResults).not.toHaveBeenCalled()
  })
})
