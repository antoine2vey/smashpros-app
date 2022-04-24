import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useRefreshMutation } from "../generated/graphql";

type Props = {
  children: React.ReactNode
}

export type JwtPayload = {
  exp: number
  iat: number
  userId: string
  userRoles: string[]
}

export const AuthContext = createContext<{
  ready: boolean
  loggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  guest: boolean
}>({
  ready: false,
  loggedIn: false,
  setLoggedIn: () => {},
  guest: true,
})

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const { getItem: getAccessToken, setItem, removeItem: removeAccessToken } = useAsyncStorage('token:access')
  const { getItem: getRefreshToken, removeItem: removeRefreshToken } = useAsyncStorage('token:refresh')
  const [ready, setReady] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const guest = true
  const [refresh, { error }] = useRefreshMutation({
    onError: async (err) => {
      // If we end up here, token is not in cache anymore, means we have to get disconnected,
      // remove all tokens and log user out
      await removeAccessToken()
      await removeRefreshToken()
      setLoggedIn(false)
    }
  })

  // Refresh token
  async function doRefresh() {
    const refreshToken = await getRefreshToken()
    
    return refresh({
      variables: {
        refreshToken: refreshToken!
      }
    })
  }

  useEffect(() => {
    async function init() {
      // await removeRefreshToken()
      // await removeAccessToken()

      const accessToken = await getAccessToken()
      // Check if we have a token
      if (accessToken) {
        const { exp } = decode<JwtPayload>(accessToken)
        const now = dayjs().unix()

        // If our token is expired, try to refresh it
        if (exp < now) {
          try {
            const { data } = await doRefresh()
          
            if (data) {
              setItem(data.refresh?.accessToken!)
              setLoggedIn(true)
            }
          } catch (error) {
            setLoggedIn(false)
          }
        } else {
          // Token is not expired, log user in
          setLoggedIn(true)
        }
      } else {
        // If we do not have a token, we do not show user app
        setLoggedIn(false)
      }
    }

    init()
  }, [])

  return (
    <AuthContext.Provider value={{ ready, loggedIn, guest, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}