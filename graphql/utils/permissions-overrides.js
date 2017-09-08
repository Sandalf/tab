
import { get, values } from 'lodash/object'
import { random } from 'lodash/number'

// The names of the different overrides.
export const REWARD_REFERRER_OVERRIDE = 'REWARD_REFERRER_OVERRIDE'

// Make it less likely for somebody to use the override
// string value directly.
const rand = random(10000, 99999)
const validOverridesAppendix = `_CONFIRMED_${rand}`

const validOverrides = {
  [REWARD_REFERRER_OVERRIDE]: `${REWARD_REFERRER_OVERRIDE}${validOverridesAppendix}`
}

/**
 * Return a string that allows overriding model query
 * permissions checks.
 * We must use this *only* in logic that's protected from
 * manipulation from the client side; e.g., we might use
 * it to reward a referring user after a new user signs up
 * because one cannot easily fake a new user creation.
 * @param {string} overrideName - The name of the override
 * @return {string|boolean} An override string, or false
 *   if `overrideName` is not a valid override.
 */
export const getPermissionsOverride = (overrideName) => {
  return get(validOverrides, overrideName, false)
}

export const isValidPermissionsOverride = (override) => {
  return values(validOverrides).indexOf(override) !== -1
}