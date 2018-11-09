
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Paper from '@material-ui/core/Paper'
import {
  alternateAccentColor
} from 'js/theme/default'
import HeartDonationCampaign from 'js/components/Campaign/HeartDonationCampaignContainer'

class CampaignBase extends React.Component {
  render () {
    const {
      isCampaignLive
      // user
    } = this.props
    if (!isCampaignLive) {
      return null
    }

    // Hardcode campaign component here when running one.
    const CAMPAIGN_START_TIME_ISO = '2018-11-09T23:00:00.000Z'
    const CAMPAIGN_END_TIME_ISO = '2018-11-23T20:00:00.000Z'
    const currentCampaign = (
      <HeartDonationCampaign
        user={this.props.user}
        campaignStartDatetime={moment(CAMPAIGN_START_TIME_ISO)}
        campaignEndDatetime={moment(CAMPAIGN_END_TIME_ISO)}
      />
    )

    if (!currentCampaign) {
      return (
        <span
          style={{ display: 'none' }}
          data-test-id={'campaign-root'}
        />
      )
    }

    return (
      <div
        style={{
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          pointerEvents: 'none'
        }}
        data-test-id={'campaign-root'}
      >
        <Paper
          elevation={1}
          style={{
            pointerEvents: 'all',
            width: 400,
            margin: 0,
            marginBottom: 100,
            padding: 0,
            background: '#FFF',
            border: 'none'
          }}
        >
          <div
            style={{
              width: '100%',
              height: 3,
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              backgroundColor: alternateAccentColor
            }} />
          {currentCampaign}
        </Paper>
      </div>
    )
  }
}

CampaignBase.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  isCampaignLive: PropTypes.bool
}

CampaignBase.defaultProps = {
  isCampaignLive: false
}

export default CampaignBase
