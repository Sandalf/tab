/* eslint-env jest */

import redis from 'redis'
import { handler } from '../handler'

jest.mock('bluebird')

// Using "Async" methods created by Bluebird.
// Manual mocking because of problems with automock:
// https://github.com/facebook/jest/issues/8983
const mockRedisClient = {
  getAsync: jest.fn(),
  setAsync: jest.fn(),
  incrAsync: jest.fn(),
  incrbyAsync: jest.fn(),
  quitAsync: jest.fn(),
}

jest.mock('redis', () => ({
  createClient: jest.fn(() => mockRedisClient),
}))

const getMockEventObj = (data = { operation: 'GET', key: 'foo' }) => ({
  body: JSON.stringify(data),
})

beforeEach(() => {
  process.env.REDIS_HOST = 'some-fake.host'
  process.env.REDIS_PORT = '6379'
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Redis Lambda handler', () => {
  it('connects the client with the expected host and port', async () => {
    expect.assertions(1)
    const eventData = getMockEventObj()
    await handler(eventData)
    expect(redis.createClient).toHaveBeenCalledWith({
      host: 'some-fake.host',
      port: '6379',
    })
  })

  it('returns a 200 error when successful', async () => {
    expect.assertions(1)
    const eventData = getMockEventObj()
    const response = await handler(eventData)
    expect(response).toEqual({
      statusCode: 200,
      body: expect.any(String),
    })
  })

  it('returns an error if body is not provided', async () => {
    expect.assertions(1)
    const eventData = {
      ...getMockEventObj(),
      body: undefined,
    }
    const response = await handler(eventData)
    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        code: 'NO_DATA',
        message: 'No data provided in the request body.',
      }),
    })
  })

  it('returns an error if body.operation is not provided', async () => {
    expect.assertions(1)
    const eventData = getMockEventObj({
      key: 'foo',
      // missing "operation" property
    })
    const response = await handler(eventData)
    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        code: 'MISSING_OPERATION',
        message: 'The request body did not include an "operation" value.',
      }),
    })
  })

  it('returns an error if the body.operation is not supported', async () => {
    expect.assertions(1)
    const eventData = getMockEventObj({
      key: 'foo',
      operation: 'EVALSHA', // unsupported Redis operation
    })
    const response = await handler(eventData)
    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        code: 'UNSUPPORTED_OPERATION',
        message: 'The provided "operation" value is not supported.',
      }),
    })
  })

  it('quits the client', async () => {
    expect.assertions(1)
    const eventData = getMockEventObj()
    await handler(eventData)
    expect(mockRedisClient.quitAsync).toHaveBeenCalledTimes(1)
  })

  it('calls INCR and returns the value as expected', async () => {
    expect.assertions(2)
    const eventData = getMockEventObj({
      operation: 'INCR',
      key: 'my-thing',
    })
    mockRedisClient.incrAsync.mockResolvedValueOnce(1234)
    const response = await handler(eventData)
    expect(mockRedisClient.incrAsync).toHaveBeenCalledWith('my-thing')
    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        data: 1234,
      }),
    })
  })

  it('throws if no key is provided to the INCR operation', async () => {
    expect.assertions(1)
    const eventData = getMockEventObj({
      operation: 'INCR',
      // no key
    })
    const response = await handler(eventData)
    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        code: 'MISSING_KEY',
        message: 'The "key" property is required for this operation.',
      }),
    })
  })

  it('calls INCRBY and returns the value as expected', async () => {
    expect.assertions(2)
    const eventData = getMockEventObj({
      operation: 'INCRBY',
      key: 'my-incrby-thing',
      amountToAdd: 120,
    })
    mockRedisClient.incrbyAsync.mockResolvedValueOnce(490)

    const response = await handler(eventData)
    expect(mockRedisClient.incrbyAsync).toHaveBeenCalledWith(
      'my-incrby-thing',
      120
    )
    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        data: 490,
      }),
    })
  })

  it('throws if no key is provided to the INCRBY operation', async () => {
    expect.assertions(1)
    const eventData = getMockEventObj({
      operation: 'INCRBY',
      // no key
      amountToAdd: 120,
    })
    mockRedisClient.incrbyAsync.mockResolvedValueOnce(490)

    const response = await handler(eventData)
    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        code: 'MISSING_KEY',
        message: 'The "key" property is required for this operation.',
      }),
    })
  })

  it('throws if no amountToAdd is provided to the INCRBY operation', async () => {
    expect.assertions(1)
    const eventData = getMockEventObj({
      operation: 'INCRBY',
      key: 'my-incrby-thing',
      // amountToAdd: 120, // missing
    })
    mockRedisClient.incrbyAsync.mockResolvedValueOnce(490)

    const response = await handler(eventData)
    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        code: 'MISSING_ADDITIONAL_DATA',
        message: 'Additional data is required for this operation.',
      }),
    })
  })

  it('calls GET and returns the value as expected', async () => {
    expect.assertions(2)
    const eventData = getMockEventObj({
      operation: 'GET',
      key: 'optimism',
    })
    mockRedisClient.getAsync.mockResolvedValueOnce('optimism is the key!')
    const response = await handler(eventData)
    expect(mockRedisClient.getAsync).toHaveBeenCalledWith('optimism')
    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        data: 'optimism is the key!',
      }),
    })
  })

  it('throws if no key is provided to the GET operation', async () => {
    expect.assertions(1)
    const eventData = getMockEventObj({
      operation: 'GET',
      // no key
    })
    const response = await handler(eventData)
    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        code: 'MISSING_KEY',
        message: 'The "key" property is required for this operation.',
      }),
    })
  })

  it('calls console.error and returns a 500 code if something unexpected goes wrong', async () => {
    expect.assertions(2)
    const eventData = getMockEventObj({
      operation: 'GET',
      key: 'optimism',
    })

    // Mock some error.
    mockRedisClient.getAsync.mockRejectedValueOnce('oh no!')

    // Suppress expected console log.
    const mockConsoleErr = jest
      .spyOn(console, 'error')
      .mockImplementationOnce(() => {})

    const response = await handler(eventData)
    expect(mockConsoleErr).toHaveBeenCalledWith('oh no!')
    expect(response).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        code: 'UNKNOWN_ERROR',
        message: 'An unknown error occurred.',
      }),
    })
  })
})
