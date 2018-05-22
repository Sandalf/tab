/* eslint-env jest */

beforeEach(() => {
  // Mock CMP
  window.__cmp = jest.fn((command, version, callback) => {
    // Documenting available commands for Quantcast CMP.
    // https://quantcast.zendesk.com/hc/en-us/articles/360003814853-Technical-Implementation-Guide
    // IAB standard docs:
    // https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md#what-api-will-need-to-be-provided-by-the-cmp-
    switch (command) {
      case 'displayConsentUi':
        break
      case 'getConfig':
        break
      case 'getCurrentVendorConsents':
        break
      case 'getConsentData':
        break
      case 'getPublisherConsents':
        break
      case 'getCurrentPublisherConsents':
        break
      case 'getVendorConsents':
        break
      case 'getVendorList':
        break
      case 'init':
        break
      case 'initConfig':
        break
      case 'runConsentUiCallback':
        break
      case 'saveConsents':
        break
      case 'setConsentUiCallback':
        break
      default:
        throw new Error('Invalid CMP command')
    }
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

afterAll(() => {
  delete window.__cmp
})

describe('consentManagement', () => {
  it('calls the CMP as expected to get the consent string', async () => {
    // Mock the CMP callback for getting vendor consents
    window.__cmp.mockImplementation((command, version, callback) => {
      if (command === 'getVendorConsents') {
        /* eslint-disable-next-line standard/no-callback-literal */
        callback({
          gdprApplies: true,
          hasGlobalConsent: false,
          metadata: 'abcdefghijklm', // consent string
          purposeConsents: { 1: true, 2: false, 3: true },
          vendorConsents: { 1: true, 2: false, 3: true }
        })
      }
    })
    const getConsentString = require('../consentManagement').getConsentString
    const consentString = await getConsentString()
    expect(consentString).toEqual('abcdefghijklm')
  })

  it('returns null if the CMP throws an error', async () => {
    window.__cmp.mockImplementation(() => {
      throw new Error('CMP made a mistake!')
    })

    // Mute expected console error
    jest.spyOn(console, 'error').mockImplementationOnce(() => {})

    const getConsentString = require('../consentManagement').getConsentString
    const consentString = await getConsentString()
    expect(consentString).toBeNull()
  })
})
