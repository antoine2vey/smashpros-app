import './src/i18n'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useEffect, useState } from 'react'
import { Linking, LogBox, Switch, useColorScheme, View } from 'react-native'
import {
  SafeAreaProvider,
  useSafeAreaInsets
} from 'react-native-safe-area-context'
import { Header } from './src/components/Header'
import { Home } from './src/screens/Home'
import { colors } from './src/colors'
import Feather from '@expo/vector-icons/Feather'
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
      }
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
        header: (props) => <Header root {...props} />
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
        header: (props) => <Header {...props} />
      }}
    />
    <Stack.Screen
      name="Crew"
      component={CrewScreen}
      options={{
        header: (props) => <Header {...props} />
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
        header: (props) => <Header root {...props} />
      }}
    />
    <MoneymatchStackNavigator.Screen
      name="CreateMoneymatch"
      component={CreateMoneymatch}
      options={{
        header: (props) => <Header {...props} />
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
          tabBarLabel: () => undefined,
          tabBarStyle: {
            ...tailwind('bg-white-300 dark:bg-black-300'),
            borderTopWidth: 0
          },
          tabBarInactiveTintColor: colors.green,
          tabBarActiveTintColor: colors.green2,
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={26} />
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
            ...tailwind('bg-white-300 dark:bg-black-300'),
            borderTopWidth: 0
          },
          tabBarInactiveTintColor: colors.green,
          tabBarActiveTintColor: colors.green2,
          tabBarIcon: ({ color }) => (
            <Feather name="dollar-sign" color={color} size={26} />
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
            ...tailwind('bg-white-300 dark:bg-black-300'),
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
        component={NoopScreen}
        options={{
          header: () => undefined,
          tabBarLabel: () => undefined,
          tabBarStyle: {
            ...tailwind('bg-white-300 dark:bg-black-300'),
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
              ResetPassword: 'reset/:token'
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
