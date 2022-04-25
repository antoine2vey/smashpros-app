import { InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tournaments: relayStylePagination()
      }
    },
    Tournament: {
      fields: {
        participants: relayStylePagination()
      }
    }
  }
})