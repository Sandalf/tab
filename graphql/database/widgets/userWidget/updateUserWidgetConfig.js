import UserWidgetModel from './UserWidgetModel'
import { DatabaseConditionalCheckFailedException } from '../../../utils/exceptions'

/**
 * Update widget data.
 * @param {object} userContext - The user authorizer object.
 * @param {string} userId - The user id.
 * @param {string} widgetId - The widget id.
 * @param {Object} config - The new widget config.
 * @return {Promise<Widget>}  Returns a promise that resolves into a
 * Widget.
 */
export default async (userContext, userId, widgetId, config) => {
  let userWidget
  try {
    userWidget = await UserWidgetModel.update(userContext, {
      userId,
      widgetId,
      config,
    })
  } catch (e) {
    // The item likely does not exist. This might happen when a
    // user modifies the config of a widget they've never used.
    // Try to create the widget.
    if (e.code === DatabaseConditionalCheckFailedException.code) {
      try {
        userWidget = await UserWidgetModel.create(userContext, {
          userId,
          widgetId,
          config,
        })
      } catch (err) {
        throw err
      }
    } else {
      throw e
    }
  }
  return userWidget
}
