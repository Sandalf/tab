import {
  commitMutation,
  graphql
} from 'react-relay'

const mutation = graphql`
  mutation LogUserRevenueMutation($input: LogUserRevenueInput!) {
    logUserRevenue(input: $input) {
      success
    }
  }
`

function commit (environment, userId, revenue = null, dfpAdvertiserId = null,
  encodedRevenue = null, aggregationOperation = null, tabId = null) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          userId,
          revenue,
          dfpAdvertiserId,
          encodedRevenue,
          aggregationOperation,
          tabId
        }
      }
    }
  )
}

export default commit
