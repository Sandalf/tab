import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { getWidgetConfig } from 'js/utils/widgets-utils'
import appTheme from 'js/theme/default'

class ClockWidget extends React.Component {
  constructor(props) {
    super(props)

    this.updateClockInterval = 0

    this.state = {
      date: '',
      time: '',
      config: {},
    }
  }

  componentDidMount() {
    const self = this
    this.updateClockInterval = setInterval(() => {
      self.setDateTime(self.state.config)
    }, 1000)

    const { widget } = this.props

    const config = JSON.parse(widget.config)
    const settings = JSON.parse(widget.settings)
    const configuration = getWidgetConfig(config, settings)
    this.setState({
      config: configuration,
    })
    this.setDateTime(configuration)
  }

  componentWillUnmount() {
    clearInterval(this.updateClockInterval)
  }

  setDateTime(config) {
    const format24 = config.format24
    const secondsFormat = config.showSeconds ? ':ss' : ''
    var date = moment().format('dddd, MMMM D')
    var time
    if (format24) {
      // If it's midnight, show two leading zeros
      if (moment().get('hour') === 0) {
        time = moment().format('HH:mm' + secondsFormat)
      } else {
        time = moment().format('H:mm' + secondsFormat)
      }
    } else {
      time = moment().format('h:mm' + secondsFormat)
    }

    this.setState({
      date: date,
      time: time,
    })
  }

  render() {
    const clockContainer = {
      marginBottom: 110,
      pointerEvents: 'none',
      userSelect: 'none',
    }

    const timeStyle = {
      color: '#FFF',
      fontSize: 140,
      fontWeight: 'bold',
      margin: 0,
      lineHeight: '90%',
      fontFamily: appTheme.fontFamily,
    }

    const dateStyle = {
      color: '#FFF',
      fontSize: 28,
      margin: 0,
      fontWeight: 'normal',
      fontFamily: appTheme.fontFamily,
    }

    return (
      <div style={clockContainer}>
        <h1 style={timeStyle} data-test-id={'clock-widget-time'}>
          {this.state.time}
        </h1>
        <h2 style={dateStyle} data-test-id={'clock-widget-date'}>
          {this.state.date}
        </h2>
      </div>
    )
  }
}

ClockWidget.propTypes = {
  widget: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    config: PropTypes.string.isRequired,
    settings: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default ClockWidget
