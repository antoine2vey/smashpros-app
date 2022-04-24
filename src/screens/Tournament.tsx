import { gql, useQuery } from '@apollo/client'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRoute } from '@react-navigation/native'
import { StatusBar } from "expo-status-bar"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from 'react-i18next'
import { ScrollView, Image, TouchableOpacity, useWindowDimensions, View, SafeAreaView, useColorScheme, NativeScrollEvent, NativeSyntheticEvent, FlatList } from "react-native"
import { useTailwind } from 'tailwind-rn/dist'
import { RootRouteProps } from '../../App'
import { CharacterPicker } from "../components/CharacterPicker"
import { Text } from "../components/Text"
import MapboxGL from '@react-native-mapbox-gl/maps'
import { Character } from './Register'

MapboxGL.setAccessToken('pk.eyJ1IjoiYW50b2luZWRldmV5IiwiYSI6ImNsMmIxZTh0dDA1MG0zYnJ6OGNndG1ndjIifQ.diM8ot5GIU7JF0XTWqjxAg');

const QUERY = gql`
  query Tournament($id: ID!, $cursor: String, $characters: [ID!]) {
    tournament (id: $id) {
      id
      city
      end_at
      lat
      lng
      name
      images
      num_attendees
      participants(first: 10, after: $cursor, characters: $characters) {
        edges {
          cursor
          node {
            id
            tag
            profile_picture
            crew {
              prefix
            }
            characters {
              id
              name
              picture
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
        totalCount
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
  const [characters, setCharacters] = useState<Character[]>([])
  const { width, height } = useWindowDimensions()
  const tailwind = useTailwind()
  const { t } = useTranslation()
  const defaultScheme = __DEV__ ? 'light' : useColorScheme()
  const [scheme, setScheme] = useState(defaultScheme)
  const { params } = useRoute<RootRouteProps<'Tournament'>>()
  const { data, loading, error, fetchMore, refetch } = useQuery(QUERY, {
    variables: {
      id: params.id
    }
  })

  useEffect(() => {
    setScheme('light')
  }, [])

  const onValidation = useCallback(() => {
    bottomSheetModalRef.current?.close()
    
    refetch({
      id: params.id,
      characters: characters.map(character => character.id)
    })
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
  }, [])

  console.log(data)

  return (
    <View style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
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
        
      <FlatList
        scrollEventThrottle={16}
        onScroll={onScroll}
        contentContainerStyle={[
          {
            marginTop: height / 6
          },
          tailwind('p-3 bg-white-300 dark:bg-black-300 rounded-t-3xl')
        ]}
        ListHeaderComponent={(
          <>
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

            <View style={tailwind('mt-3 flex')}>
              <Text style={tailwind('text-xl')}>{t('findWay')}</Text>

              <View style={tailwind('rounded-xl overflow-hidden mt-2 h-44')}>
                <MapboxGL.MapView
                  style={tailwind('flex-1 h-full w-full')}
                  logoEnabled={false}
                  pitchEnabled={false}
                  compassEnabled={false}
                  styleURL={
                    defaultScheme === 'dark'
                    ? "mapbox://styles/antoinedevey/cl2b1uh2w001o14pfusk6kmih"
                    : "mapbox://styles/antoinedevey/cl2b1vgny002614msvph72h6w"
                  }
                >
                  {data?.tournament && (
                    <>
                      <MapboxGL.Camera
                        defaultSettings={{
                          centerCoordinate: [data.tournament.lng, data.tournament.lat],
                          zoomLevel: 16,
                          pitch: 40
                        }}
                      />
                      <MapboxGL.MarkerView
                        id="marker"
                        coordinate={[data.tournament.lng, data.tournament.lat]}
                      >
                        <Image source={require('../assets/pin.png')} style={{ marginTop: -45 }} />
                      </MapboxGL.MarkerView>
                    </>
                  )}
                </MapboxGL.MapView>
              </View>
            </View>

            <View style={tailwind('mt-3 flex-row justify-between items-center')}>
              <Text style={tailwind('text-xl')}>{t('participants')} <Text style={tailwind('text-green-400')}>({data?.tournament.participants.totalCount})</Text></Text>
              <TouchableOpacity activeOpacity={0.8} onPress={() => bottomSheetModalRef.current?.present()}>
                <Text style={tailwind('text-base text-green-400')}>{t('filters')}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        data={data?.tournament.participants.edges}
        keyExtractor={edge => edge.cursor}
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          fetchMore({
            variables: {
              cursor: data?.tournament.participants.pageInfo.endCursor
            }
          })
        }}
        renderItem={({ item: edge }) => (
          <View style={tailwind('flex-row flex p-1 mt-2 bg-white-300 dark:bg-black-300 rounded-xl')}>
            <Image source={{ uri: edge.node.profile_picture }} style={tailwind('w-16 h-16 rounded-xl')} />
            <View style={tailwind('ml-2')}>
              <Text style={tailwind('font-semibold')}>
                {edge.node.crew && (
                  <Text style={tailwind('font-bold text-green-300')}>{edge.node.crew.prefix} | </Text>
                )}
                {edge.node.tag}
              </Text>
              <View style={tailwind('flex-row mt-1')}>
                {edge.node.characters.map(character => (
                  <Image key={character.id} source={{ uri: character.picture }} resizeMode="center" style={tailwind('w-6 h-6 -ml-1')} />
                ))}
              </View>
            </View>
          </View>
        )}
        // Sets padding
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{
          paddingBottom: height / 6
        }}
      />

      
      <CharacterPicker
        ref={bottomSheetModalRef}
        characters={characters}
        setCharacters={setCharacters}
        onValidation={onValidation}
      />
    </View>
  )
}
