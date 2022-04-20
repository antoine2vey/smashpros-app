import './src/i18n'
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Switch, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from './src/components/Header';
import { Home } from './src/screens/Home';
import {colors} from './src/colors'
import Feather from '@expo/vector-icons/Feather'
import { NoopScreen } from './src/screens/NoopScreen';
import { TournamentsDetail } from './src/screens/TournamentDetail';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {TailwindProvider, useTailwind} from 'tailwind-rn';
import utilities from './tailwind.json';
import { Login } from './src/screens/Login';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { Register } from './src/screens/Register';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useAuthState } from './src/hooks/useAuthState';
import { AuthContext, AuthContextProvider } from './src/contexts/AuthContext';

type HomeStackParamList = {
  HomeStack: undefined
  TournamentDetail: undefined
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

export type LoginScreenNavigationProp = NativeStackNavigationProp<LogoutStackParamList>

const Stack = createNativeStackNavigator<HomeStackParamList>()
const LogoutStackNavigator = createNativeStackNavigator<LogoutStackParamList>()
const Tab = createBottomTabNavigator<RootStackParamList>()

const client = new ApolloClient({
  link: createUploadLink({ uri: 'http://localhost:4000' }),
  cache: new InMemoryCache()
})

const LogoutStack = () => {
  const tailwind = useTailwind() 
  return (
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
    <Stack.Screen name="TournamentDetail" component={TournamentsDetail} options={{ headerShown: false }} />
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
          tabBarStyle: tailwind('bg-white-300 dark:bg-black-300'),
          tabBarInactiveTintColor: colors.green2,
          tabBarActiveTintColor: colors.green,
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
          tabBarStyle: tailwind('bg-white-300 dark:bg-black-300'),
          tabBarInactiveTintColor: colors.green2,
          tabBarActiveTintColor: colors.green,
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
          tabBarStyle: tailwind('bg-white-300 dark:bg-black-300'),
          tabBarInactiveTintColor: colors.green2,
          tabBarActiveTintColor: colors.green,
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
          tabBarStyle: tailwind('bg-white-300 dark:bg-black-300'),
          tabBarInactiveTintColor: colors.green2,
          tabBarActiveTintColor: colors.green,
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

  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        {loggedIn ? (
          <Router />
        ) : (
          <LogoutStack />
        )}
      </BottomSheetModalProvider>
    </NavigationContainer>
  )
}

export default function App() {
  const scheme = useColorScheme()
  const [dark, setDark] = useState(scheme !== 'dark')

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
