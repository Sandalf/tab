/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import {
  getMockBingComputationResult,
  getMockBingNewsArticleResult,
  getMockBingTextAdResult,
  getMockBingTimeZoneResult,
  getMockBingWebPageResult,
} from 'js/utils/test-utils-search'
import ComputationSearchResult from 'js/components/Search/ComputationSearchResult'
import NewsSearchResults from 'js/components/Search/NewsSearchResults'
import TextAdSearchResult from 'js/components/Search/TextAdSearchResult'
import TimeZoneSearchResult from 'js/components/Search/TimeZoneSearchResult'
import WebPageSearchResult from 'js/components/Search/WebPageSearchResult'
import VideoSearchResults from 'js/components/Search/VideoSearchResults'

jest.mock('js/components/Search/ComputationSearchResult')
jest.mock('js/components/Search/NewsSearchResults')
jest.mock('js/components/Search/TextAdSearchResult')
jest.mock('js/components/Search/TimeZoneSearchResult')
jest.mock('js/components/Search/WebPageSearchResult')
jest.mock('js/components/Search/VideoSearchResults')

const getMockProps = () => ({
  type: 'SomeType',
  itemData: {
    some: 'data',
  },
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('SearchResultItem: no item', () => {
  it('renders without error', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'WebPages'
    shallow(<SearchResultItem {...mockProps} />)
  })

  it('returns null if the search result type is not one we support', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'NotARealType'
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).type()).toBeNull()
  })
})

describe('SearchResultItem: web page item', () => {
  it('renders a WebPageSearchResult when providing a web page data object', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'WebPages'
    mockProps.itemData = getMockBingWebPageResult()
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).type()).toEqual(WebPageSearchResult)
  })

  it('does not strip HTML from the display URL for a WebPageSearchResult', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'WebPages'
    mockProps.itemData = getMockBingWebPageResult({
      displayUrl: '<b>www.example.com</b>',
    })
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).prop('item').displayUrl).toEqual(
      '<b>www.example.com</b>'
    )
  })

  it('does not strip HTML from the name for a WebPageSearchResult', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'WebPages'
    mockProps.itemData = getMockBingWebPageResult({
      name: 'The <b>Tastiest</b> <i>Tacos</i>!!1',
    })
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).prop('item').name).toEqual(
      'The <b>Tastiest</b> <i>Tacos</i>!!1'
    )
  })

  it('does not strip HTML from the snippet for a WebPageSearchResult', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'WebPages'
    mockProps.itemData = getMockBingWebPageResult({
      snippet:
        "This <b>really awesome</b> website is definitely what you're looking for.",
    })
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).prop('item').snippet).toEqual(
      "This <b>really awesome</b> website is definitely what you're looking for."
    )
  })

  it('passes extra props to the child', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'WebPages'
    mockProps.itemData = getMockBingWebPageResult()
    mockProps.extraThingy = 'hi'
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).prop('extraThingy')).toEqual('hi')
  })
})

describe('SearchResultItem: computation result', () => {
  it('renders a ComputationSearchResult when providing a computation data object', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'Computation'
    mockProps.itemData = getMockBingComputationResult()
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).type()).toEqual(ComputationSearchResult)
  })

  it('passes extra props to the child', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'Computation'
    mockProps.itemData = getMockBingComputationResult()
    mockProps.extraThingy = 'hi'
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).prop('extraThingy')).toEqual('hi')
  })
})

describe('SearchResultItem: time zone result', () => {
  it('renders a TimeZoneSearchResult when providing a computation data object', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'TimeZone'
    mockProps.itemData = getMockBingTimeZoneResult()
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).type()).toEqual(TimeZoneSearchResult)
  })

  it('passes extra props to the child', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'TimeZone'
    mockProps.itemData = getMockBingTimeZoneResult()
    mockProps.extraThingy = 'hi'
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).prop('extraThingy')).toEqual('hi')
  })
})

describe('SearchResultItem: news items', () => {
  it('renders a NewsSearchResults when providing a news data object', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'News'
    mockProps.itemData = [
      getMockBingNewsArticleResult(),
      getMockBingNewsArticleResult(),
    ]
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).type()).toEqual(NewsSearchResults)
  })

  it('does not strip HTML from the description for a NewsSearchResults', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'News'
    mockProps.itemData = [
      getMockBingNewsArticleResult({
        description:
          'Something <b>truly incredible</b> and newsworthy happened!',
      }),
      getMockBingNewsArticleResult(),
    ]
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).prop('newsItems')[0].description).toEqual(
      'Something <b>truly incredible</b> and newsworthy happened!'
    )
  })

  it('does not strip HTML from the name for a NewsSearchResults', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'News'
    mockProps.itemData = [
      getMockBingNewsArticleResult({
        name: 'An <b>Incredible</b> Event in NYC',
      }),
      getMockBingNewsArticleResult(),
    ]
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).prop('newsItems')[0].name).toEqual(
      'An <b>Incredible</b> Event in NYC'
    )
  })

  it('passes extra props to the child', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'News'
    mockProps.itemData = [
      getMockBingNewsArticleResult(),
      getMockBingNewsArticleResult(),
    ]
    mockProps.extraThingy = 'hi'
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).prop('extraThingy')).toEqual('hi')
  })
})

describe('SearchResultItem: ad items', () => {
  it('renders a TextAdSearchResult when providing a text ad data object', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'Ads'
    mockProps.itemData = getMockBingTextAdResult()
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).type()).toEqual(TextAdSearchResult)
  })

  it("returns null if we don't support the ad type", () => {
    // Suppress expected console log.
    jest.spyOn(console, 'error').mockImplementationOnce(() => {})

    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'Ads'
    mockProps.itemData = {
      _type: 'Ads/SomeFancyAd',
    }
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).type()).toBeNull()
  })

  it('passes extra props to the child', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'Ads'
    mockProps.itemData = getMockBingTextAdResult()
    mockProps.extraThingy = 'hi'
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).prop('extraThingy')).toEqual('hi')
  })
})

describe('SearchResultItem: video items', () => {
  it('renders a VideoSearchResults when providing a news data object', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'Videos'
    mockProps.itemData = [
      getMockBingNewsArticleResult(),
      getMockBingNewsArticleResult(),
    ]
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).type()).toEqual(VideoSearchResults)
  })

  it('passes extra props to the child', () => {
    const SearchResultItem = require('js/components/Search/SearchResultItem')
      .default
    const mockProps = getMockProps()
    mockProps.type = 'Videos'
    mockProps.itemData = [
      getMockBingNewsArticleResult(),
      getMockBingNewsArticleResult(),
    ]
    mockProps.extraThingy = 'hi'
    const wrapper = shallow(<SearchResultItem {...mockProps} />)
    expect(wrapper.at(0).prop('extraThingy')).toEqual('hi')
  })
})
