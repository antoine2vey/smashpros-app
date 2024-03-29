import './src/i18n'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useEffect, useState } from 'react'
import {
  Linking,
  LogBox,
  NativeModules,
  Switch,
  useColorScheme,
  View
} from 'react-native'
import {
  SafeAreaProvider,
  useSafeAreaInsets
} from 'react-native-safe-area-context'
import { Header } from './src/components/Header'
import { Home } from './src/screens/Home'
import { colors } from './src/colors'
import { Feather, Ionicons } from '@expo/vector-icons'
import { NoopScreen } from './src/screens/NoopScreen'
import { Tournaments } from './src/screens/Tournament'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { TailwindProvider, useTailwind } from 'tailwind-rn'
import utilities from './tailwind.json'
import { Login } from './src/screens/Login'
import { ApolloProvider } from '@apollo/client'
import { Register } from './src/screens/Register'
import { AuthContext, AuthContextProvider } from './src/contexts/AuthContext'
import { client } from './src/apolloClient'
import { UserProfile } from './src/screens/UserProfile'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import dayjs from 'dayjs'
import { DarkContext, DarkContextProvider } from './src/contexts/DarkContext'
import { useScheme } from './src/hooks/useScheme'
import { CrewScreen } from './src/screens/CrewScreen'
import { ForgotPassword } from './src/screens/ForgotPassword'
import { ResetPassword } from './src/screens/ResetPassword'
import { ForgotPasswordConfirm } from './src/screens/ForgotPasswordConfirm'
import { Moneymatches } from './src/screens/Moneymatches'
import { CreateMoneymatch } from './src/screens/CreateMoneymatch'
import { Moneymatch } from './src/screens/Moneymatch'
import { Text } from './src/components/Text'
import { Settings } from './src/screens/Settings'
import messaging from '@react-native-firebase/messaging'

dayjs.extend(updateLocale)
dayjs.extend(relativeTime)
dayjs.locale('fr')

LogBox.ignoreLogs(["[Reanimated] You can't use 'scrollTo'"])

type HomeStackParamList = {
  HomeStack: undefined
  Crew:
    | undefined
    | {
        id: string | undefined
      }
  Tournament: {
    id: string | undefined
  }
  UserProfile: {
    id: string | undefined
  }
  TournamentsFilter: undefined
}

type LogoutStackParamList = {
  Login: undefined
  Register: undefined
  ForgotPassword: undefined
  ForgotPasswordConfirm: undefined
  ResetPassword: {
    token: string | undefined
  }
}

type MoneymatchStackParamList = {
  Moneymatches: undefined
  CreateMoneymatch:
    | undefined
    | {
        opponent: string | undefined
        tournament: string | undefined
      }
  Moneymatch: { id: string }
}

type RootStackParamList = {
  HomeTabs: undefined
  MoneymatchTab: undefined
  MessageTab: undefined
  ProfileTab: undefined
}

export type LoginScreenNavigationProp =
  NativeStackNavigationProp<LogoutStackParamList>
export type HomeScreenNavigateProp =
  NativeStackNavigationProp<HomeStackParamList>
export type MoneymatchScreenNavigateProp =
  NativeStackNavigationProp<MoneymatchStackParamList>

export type RootRouteProps<RouteName extends keyof HomeStackParamList> =
  RouteProp<HomeStackParamList, RouteName>
export type LogoutRouteProps<RouteName extends keyof LogoutStackParamList> =
  RouteProp<LogoutStackParamList, RouteName>
export type MoneymatchRouteProps<
  RouteName extends keyof MoneymatchStackParamList
> = RouteProp<MoneymatchStackParamList, RouteName>

const Stack = createNativeStackNavigator<HomeStackParamList>()
const LogoutStackNavigator = createNativeStackNavigator<LogoutStackParamList>()
const MoneymatchStackNavigator =
  createNativeStackNavigator<MoneymatchStackParamList>()
const Tab = createBottomTabNavigator<RootStackParamList>()

const LogoutStack = () => (
  <LogoutStackNavigator.Navigator>
    <LogoutStackNavigator.Screen
      name="Login"
      component={Login}
      options={{
        header: () => undefined
      }}
    />
    <LogoutStackNavigator.Screen
      name="Register"
      component={Register}
      options={{
        header: () => undefined
      }}
    />
    <LogoutStackNavigator.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        header: () => undefined
      }}
    />
    <LogoutStackNavigator.Screen
      name="ForgotPasswordConfirm"
      component={ForgotPasswordConfirm}
      options={{
        header: () => undefined
      }}
    />
    <LogoutStackNavigator.Screen
      name="ResetPassword"
      component={ResetPassword}
      options={{
        header: () => undefined
      }}
    />
  </LogoutStackNavigator.Navigator>
)

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeStack"
      component={Home}
      options={{
        // header: (props) => <Header root {...props} />
        header: () => null
      }}
    />
    <Stack.Screen
      name="Tournament"
      component={Tournaments}
      options={{
        header: () => null
      }}
    />
    <Stack.Screen
      name="UserProfile"
      component={UserProfile}
      options={{
        // header: (props) => <Header {...props} />
        header: () => null
      }}
    />
    <Stack.Screen
      name="Crew"
      component={CrewScreen}
      options={{
        // header: (props) => <Header {...props} />
        header: () => null
      }}
    />
  </Stack.Navigator>
)

const MoneymatchesStack = () => (
  <MoneymatchStackNavigator.Navigator>
    <MoneymatchStackNavigator.Screen
      name="Moneymatches"
      component={Moneymatches}
      options={{
        // header: (props) => <Header root {...props} />
        header: () => null
      }}
    />
    <MoneymatchStackNavigator.Screen
      name="CreateMoneymatch"
      component={CreateMoneymatch}
      options={{
        // header: (props) => <Header {...props} />
        header: () => null
      }}
    />
    <MoneymatchStackNavigator.Screen
      name="Moneymatch"
      component={Moneymatch}
      options={{
        header: () => null
      }}
    />
  </MoneymatchStackNavigator.Navigator>
)

const Router = () => {
  const tailwind = useTailwind()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTabs"
        component={HomeStack}
        options={{
          header: () => null,
          tabBarLabel: () => null,
          tabBarStyle: {
            ...tailwind('bg-white-400 dark:bg-black-400'),
            borderTopWidth: 0
          },
          tabBarInactiveTintColor: colors.green,
          tabBarActiveTintColor: colors.green2,
          tabBarIcon: ({ color }) => (
            <Ionicons name="game-controller-outline" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="MoneymatchTab"
        component={MoneymatchesStack}
        options={{
          header: (props) => null,
          tabBarLabel: () => undefined,
          tabBarStyle: {
            ...tailwind('bg-white-400 dark:bg-black-400'),
            borderTopWidth: 0
          },
          tabBarInactiveTintColor: colors.green,
          tabBarActiveTintColor: colors.green2,
          tabBarIcon: ({ color }) => (
            <Ionicons name="cash-outline" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="MessageTab"
        component={NoopScreen}
        options={{
          header: () => undefined,
          tabBarLabel: () => undefined,
          tabBarStyle: {
            ...tailwind('bg-white-400 dark:bg-black-400'),
            borderTopWidth: 0
          },
          tabBarInactiveTintColor: colors.green,
          tabBarActiveTintColor: colors.green2,
          tabBarIcon: ({ color }) => (
            <Feather name="message-square" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Settings}
        options={{
          header: () => undefined,
          tabBarLabel: () => undefined,
          tabBarStyle: {
            ...tailwind('bg-white-400 dark:bg-black-400'),
            borderTopWidth: 0
          },
          tabBarInactiveTintColor: colors.green,
          tabBarActiveTintColor: colors.green2,
          tabBarIcon: ({ color }) => (
            <Feather name="users" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const Switchr = ({ scheme, setScheme }) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <View
      style={{
        position: 'absolute',
        bottom: Math.max(bottom, 15),
        right: 15,
        zIndex: 1
      }}
    >
      <Switch
        onValueChange={(value) =>
          setScheme(scheme === 'light' ? 'dark' : 'light')
        }
        value={scheme === 'dark'}
        trackColor={{
          true: 'black',
          false: 'white'
        }}
      />
    </View>
  )
}

export function Root() {
  const { ready, loggedIn, guest } = useContext(AuthContext)
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
      <NavigationContainer
        linking={{
          prefixes: ['smashpros://'],
          config: {
            screens: {
              ResetPassword: 'reset/:token',
              HomeTabs: {
                screens: {
                  Tournament: 'tournament/:id'
                }
              }
            }
          },
          // If notification is clicked but app is closed
          async getInitialURL() {
            const url = await Linking.getInitialURL()
            console.log(url)

            if (url != null) {
              return url
            }

            const message = await messaging().getInitialNotification()
            console.log('getInitialURL()')
            console.log(message)
            return message?.data?.link
          },
          // If notification is clicked but app is in background
          subscribe(listener) {
            const onReceiveURL = ({ url }: { url: string }) => listener(url)
            // Listen to incoming links from deep linking
            Linking.addEventListener('url', onReceiveURL)

            // Listen to firebase push notifications
            const unsubscribeNotification = messaging().onNotificationOpenedApp(
              (message) => {
                console.log('subscribe()')
                console.log(message)
                const url = message?.data?.link

                if (url) {
                  // Any custom logic to check whether the URL needs to be handled
                  // Call the listener to let React Navigation handle the URL
                  listener(url)
                }
              }
            )

            return () => {
              // Clean up the event listeners
              Linking.removeEventListener('url', onReceiveURL)
              unsubscribeNotification()
            }
          }
        }}
      >
        <BottomSheetModalProvider>
          {loggedIn ? <Router /> : <LogoutStack />}
        </BottomSheetModalProvider>
      </NavigationContainer>
    </View>
  )
}

export default function App() {
  useEffect(() => {
    dayjs.updateLocale('fr', {
      relativeTime: {
        future: 'dans %s',
        past: '%s ago',
        s: 'quelques secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans'
      }
    })
  }, [])

  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <DarkContextProvider>
          <DarkContext.Consumer>
            {({ scheme, setScheme }) => (
              <SafeAreaProvider>
                <TailwindProvider utilities={utilities} colorScheme={scheme}>
                  <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
                  <Root />
                  {__DEV__ && <Switchr scheme={scheme} setScheme={setScheme} />}
                </TailwindProvider>
              </SafeAreaProvider>
            )}
          </DarkContext.Consumer>
        </DarkContextProvider>
      </AuthContextProvider>
    </ApolloProvider>
  )
}
