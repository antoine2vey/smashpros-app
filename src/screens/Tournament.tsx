import { gql, useQuery } from '@apollo/client'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRoute } from '@react-navigation/native'
import { StatusBar } from "expo-status-bar"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from 'react-i18next'
import { ScrollView, Image, TouchableOpacity, useWindowDimensions, View, SafeAreaView, useColorScheme, NativeScrollEvent, NativeSyntheticEvent } from "react-native"
import { useTailwind } from 'tailwind-rn/dist'
import { RootRouteProps } from '../../App'
import { Backdrop } from '../components/Backdrop'
import { CharacterPicker } from "../components/CharacterPicker"
import { Text } from "../components/Text"

const banner = require('../assets/banner.png')
const icon = require('../assets/azuria.png')

const QUERY = gql`
  query Tournament($id: ID!) {
    tournament (id: $id) {
      city
      country_code
      created_at
      currency
      end_at
      event_registration_closes_at
      has_offline_events
      id
      is_registration_open
      lat
      lng
      name
      images
      num_attendees
      participants(first: 10) {
        edges {
          cursor
          node {
            id
            tag
            characters {
              id
              name
              picture
            }
          }
        }
      }
      slug
      state
      tournament_id
      venue_address
      venue_name
    }
  }
`

export const Tournaments = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const [characters, setCharacters] = useState<string[]>([])
  const { width, height } = useWindowDimensions()
  const tailwind = useTailwind()
  const { t } = useTranslation()
  const defaultScheme = __DEV__ ? 'dark' : useColorScheme()
  const [scheme, setScheme] = useState(defaultScheme)
  const { params } = useRoute<RootRouteProps<'Tournament'>>()
  const { data, loading, error } = useQuery(QUERY, {
    variables: {
      id: params.id
    }
  })

  useEffect(() => {
    setScheme('light')
  }, [])

  const onValidation = useCallback(() => {
    alert(characters.join('/'))
  }, [characters])

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = height / 6 - 25
    const { y } = e.nativeEvent.contentOffset

    if (defaultScheme === 'dark') {
      setScheme('light')
    } else {
      if (y > offset) {
        setScheme('dark')
      } else {
        setScheme('light')
      }
    }
  }, [scheme])

  console.log(data, loading, error)

  return (
    <View style={tailwind('flex-1 bg-white-300 dark:bg-black-400')}>
      <StatusBar style={scheme || 'light'} /> 
      {data?.tournament && (
        <Image
          source={{ uri: data?.tournament.images[1] }}
          style={[
            {
              width,
              height: height / 3
            },
            tailwind('absolute top-0 left-0')
          ]}
        />
      )}
      <View style={tailwind('bg-black-400 opacity-50 absolute inset-0')} /> 
      <View
        style={[
          { height: height / 3 },
          tailwind('bg-white-300 dark:bg-black-300 absolute bottom-0 left-0 right-0')
        ]}
      />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={onScroll}
        contentContainerStyle={[
          {
            marginTop: height / 6,
            paddingBottom: height / 6,
          },
          tailwind('flex-1 p-3 bg-white-300 dark:bg-black-300 rounded-t-3xl')
        ]}
      >
        <View style={tailwind('flex-row items-center')}>
          <View style={tailwind('mr-2')}>
            <Image
              source={{ uri: data?.tournament.images[0] }}
              style={tailwind('w-28 h-28 rounded-xl')}
              resizeMode="cover"
            />
          </View>
          <View style={tailwind('flex-shrink')}>
            <Text style={tailwind('text-base text-green-400 font-bold')}>Live</Text>
            <Text numberOfLines={1} style={tailwind('flex-shrink text-xl font-bold -my-1')}>{data?.tournament.name}</Text>
            <Text style={tailwind('text-base font-light text-grey-400')}>{data?.tournament.city}</Text>
          </View>
        </View>

        <View style={tailwind('mt-3')}>
          <Text style={tailwind('text-xl')}>{t('findWay')}</Text>
        </View>

        <View style={tailwind('mt-3 flex-row justify-between items-center')}>
          <Text style={tailwind('text-xl')}>{t('participants')} <Text style={tailwind('text-green-400')}>(64)</Text></Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => bottomSheetModalRef.current?.present()}>
            <Text style={tailwind('text-base text-green-400')}>{t('filters')}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      
      <CharacterPicker
        ref={bottomSheetModalRef}
        characters={characters}
        setCharacters={setCharacters}
        onValidation={onValidation}
      />
    </View>
  )
}
