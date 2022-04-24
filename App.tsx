import './src/i18n'
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, DefaultTheme, NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { LogBox, Switch, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from './src/components/Header';
import { Home } from './src/screens/Home';
import {colors} from './src/colors'
import Feather from '@expo/vector-icons/Feather'
import { NoopScreen } from './src/screens/NoopScreen';
import { Tournaments } from './src/screens/Tournament';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {TailwindProvider, useTailwind} from 'tailwind-rn';
import utilities from './tailwind.json';
import { Login } from './src/screens/Login';
import { ApolloClient, ApolloLink, ApolloProvider, concat, from, gql, InMemoryCache, useMutation } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { Register } from './src/screens/Register';
import AsyncStorageLib, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { AuthContext, AuthContextProvider, JwtPayload } from './src/contexts/AuthContext';
import { setContext } from '@apollo/client/link/context';
import decode from 'jwt-decode'
import dayjs from 'dayjs'
import { relayStylePagination } from '@apollo/client/utilities';

LogBox.ignoreLogs([
  '[Reanimated] You can\'t use \'scrollTo'
])

type HomeStackParamList = {
  HomeStack: undefined
  Tournament: {
    id: string
  }
}

type LogoutStackParamList = {
  Login: undefined
  Register: undefined
}

type RootStackParamList = {
  HomeTabs: undefined
  MoneymatchTab: undefined
  MessageTab: undefined
  ProfileTab: undefined
}

const REFRESH = gql`
  mutation refresh ($refreshToken: String!) {
      refresh (refreshToken: $refreshToken) {
          accessToken
      }
  }
`

export type LoginScreenNavigationProp = NativeStackNavigationProp<LogoutStackParamList>
export type HomeScreenNavigateProp = NativeStackNavigationProp<HomeStackParamList>
export type RootRouteProps<RouteName extends keyof HomeStackParamList> = RouteProp<
  HomeStackParamList,
  RouteName
>;

const Stack = createNativeStackNavigator<HomeStackParamList>()
const LogoutStackNavigator = createNativeStackNavigator<LogoutStackParamList>()
const Tab = createBottomTabNavigator<RootStackParamList>()

// Reference to prevent infinite querying
let isRequestPending = false

const doRefreshToken = async (refreshToken: string) => {
  return client.mutate<{ refresh: { accessToken: string }}>({
    mutation: REFRESH,
    variables: {
      refreshToken
    },
    fetchPolicy: 'no-cache'
  })
}

const authLink = setContext(async (_, { headers }) => {
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

const client = new ApolloClient({
  link: from([
    authLink,
    createUploadLink({ uri: 'http://127.0.0.1:4000' })
  ]),
  cache: new InMemoryCache({
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
})

const LogoutStack = () => {
  const tailwind = useTailwind() 
  return (
    <LogoutStackNavigator.Navigator>
      <LogoutStackNavigator.Screen
        name="Login"
        component={Login}
        options={{
          header: () => undefined,
        }}
      />
      <LogoutStackNavigator.Screen
        name="Register"
        component={Register}
        options={{
          header: () => undefined
        }}
      />
    </LogoutStackNavigator.Navigator>
  )
}

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeStack"
      component={Home}
      options={{
        header: (props) => <Header {...props} />
      }}
    />
    <Stack.Screen
      name="Tournament"
      component={Tournaments}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
)

const Router = () => {
  const tailwind = useTailwind()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTabs"
        component={HomeStack}
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
            <Feather name='home' color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="MoneymatchTab"
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
            <Feather name='dollar-sign' color={color} size={26} />
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
            <Feather name='message-square' color={color} size={26} />
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
            <Feather name='users' color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const Switchr = ({ dark, setDark }) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <View style={{ position: 'absolute', bottom: Math.max(bottom, 15), right: 15, zIndex: 1 }}>
      <Switch
        onValueChange={(value) => setDark(value)}
        value={dark}
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
      <NavigationContainer>
        <BottomSheetModalProvider>
          {loggedIn ? (
            <Router />
          ) : (
            <LogoutStack />
          )}
        </BottomSheetModalProvider>
      </NavigationContainer>
    </View>
  )
}

export default function App() {
  const scheme = useColorScheme()
  const [dark, setDark] = useState(scheme === 'dark')

  return (
    <TailwindProvider utilities={utilities} colorScheme={dark ? 'dark' : 'light'}>
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <AuthContextProvider>
            <StatusBar style={dark ? 'light' : 'dark'} />
            <Root />
            {__DEV__ && <Switchr dark={dark} setDark={setDark} />}
          </AuthContextProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    </TailwindProvider>
  );
}
