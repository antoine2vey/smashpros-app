import { ApolloClient, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";
import { cache } from "./cache";
import { JwtPayload } from "./contexts/AuthContext";
import { RefreshDocument } from "./generated/graphql";
import decode from 'jwt-decode'
import dayjs from 'dayjs'
import { Platform } from "react-native";

// Reference to prevent infinite querying
let isRequestPending = false

const doRefreshToken = async (refreshToken: string) => {
  return client.mutate<{ refresh: { accessToken: string }}>({
    mutation: RefreshDocument,
    variables: {
      refreshToken
    },
    fetchPolicy: 'no-cache'
  })
}

export const authLink = setContext(async (_, { headers }) => {
  let token = await AsyncStorageLib.getItem('token:access')

  // Check if token is expired
  if (token) {
    const { exp } = decode<JwtPayload>(token)
    const now = dayjs().unix()
    
    if (exp < now) {
      // If expired, set token to null so we can request a new one
      await AsyncStorageLib.removeItem('token:access')
      token = null

      if (!isRequestPending) {
        // Block any request incoming
        isRequestPending = true
        const refreshToken = await AsyncStorageLib.getItem('token:refresh')
        const { data } = await doRefreshToken(refreshToken!)
        token = data!.refresh.accessToken
        await AsyncStorageLib.setItem('token:access', token)
        isRequestPending = false
      }
    }
  }
  
  return {
    headers: {
      ...headers,
      authorization: token || ""
    }
  }
})

const uri = __DEV__ ? Platform.OS === 'ios' ? 'http://127.0.0.1:4000' : "http://10.0.2.2:4000" : ""

export const client = new ApolloClient({
  link: from([
    authLink,
    createUploadLink({ uri })
  ]),
  cache: cache
})