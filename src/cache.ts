import { gql, InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { merge } from 'lodash'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tournaments: relayStylePagination(),
        users: relayStylePagination()
      }
    },
    Tournament: {
      fields: {
        participants: relayStylePagination()
      }
    },
    Crew: {
      fields: {
        members: {
          merge(_, incoming) {
            return incoming
          }
        },
        waiting_members: {
          merge(_, incoming) {
            return incoming
          }
        }
      }
    }
  }
})
