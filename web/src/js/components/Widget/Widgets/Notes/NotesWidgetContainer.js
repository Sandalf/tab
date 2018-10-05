import {
  createFragmentContainer,
  graphql
} from 'react-relay'

import NotesWidget from './NotesWidgetComponent'

export default createFragmentContainer(NotesWidget, {
  widget: graphql`
    fragment NotesWidgetContainer_widget on Widget {
      id
      name
      enabled
      visible
      data
      type
    }
  `,
  user: graphql`
    fragment NotesWidgetContainer_user on User {
      id
    }
  `
})
