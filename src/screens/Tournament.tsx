import { gql, useQuery } from '@apollo/client'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  TouchableOpacity,
  useWindowDimensions,
  View,
  ActivityIndicator
} from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { HomeScreenNavigateProp, RootRouteProps } from '../../App'
import { CharacterPicker } from '../components/CharacterPicker'
import { Text } from '../components/Text'
import MapboxGL from '@react-native-mapbox-gl/maps'
import {
  Character,
  UserEdge,
  useSingleTournamentQuery
} from '../generated/graphql'
import { ProgressiveImage } from '../components/ProgressiveImage'
import { useScheme } from '../hooks/useScheme'
import { Participant } from '../components/Participant'
import { HeroScroll } from '../components/HeroScroll'
import { useTournamentCalendar } from '../hooks/useTournamentCalendar'

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYW50b2luZWRldmV5IiwiYSI6ImNsMmIxZTh0dDA1MG0zYnJ6OGNndG1ndjIifQ.diM8ot5GIU7JF0XTWqjxAg'
)

export const Tournaments = () => {
  const { t } = useTranslation()
  const tailwind = useTailwind()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const [characters, setCharacters] = useState<Character[]>([])
  const { params } = useRoute<RootRouteProps<'Tournament'>>()
  const { scheme } = useScheme()
  const { navigate } = useNavigation<HomeScreenNavigateProp>()
  const { width, height } = useWindowDimensions()
  const { addTournamentToCalendar } = useTournamentCalendar()
  const { data, loading, error, fetchMore, refetch } = useSingleTournamentQuery(
    {
      variables: {
        id: params.id!
      }
    }
  )
  const pageInfo = data?.tournament?.participants?.pageInfo

  const onValidation = useCallback(() => {
    bottomSheetModalRef.current?.close()

    refetch({
      id: params.id,
      characters: characters.map((character) => character.id)
    })
  }, [characters])

  const onAddTournamentPress = useCallback(() => {
    addTournamentToCalendar(data?.tournament)
  }, [data?.tournament])

  return (
    <>
      <HeroScroll<UserEdge>
        background={{ uri: data?.tournament?.images[1] }}
        ListHeaderComponent={
          <>
            <View style={tailwind('flex-row items-center')}>
              <View style={tailwind('mr-2')}>
                <ProgressiveImage
                  source={{ uri: data?.tournament?.images[0] }}
                  style={tailwind('w-28 h-28 rounded-xl')}
                  resizeMode="cover"
                />
              </View>
              <View style={tailwind('flex-shrink')}>
                <Text style={tailwind('text-base text-green-400 font-bold')}>
                  Live
                </Text>
                <Text
                  numberOfLines={1}
                  style={tailwind('flex-shrink text-xl font-bold -my-1')}
                >
                  {data?.tournament?.name}
                </Text>
                <Text style={tailwind('text-base font-light text-grey-400')}>
                  {data?.tournament?.city}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={tailwind('mt-3 flex')}
              onPress={onAddTournamentPress}
            >
              <Text style={tailwind('text-xl')}>Add to calendar</Text>
            </TouchableOpacity>

            <View style={tailwind('mt-3 flex')}>
              <Text style={tailwind('text-xl')}>{t('findWay')}</Text>

              <View style={tailwind('rounded-xl overflow-hidden mt-2 h-44')}>
                <MapboxGL.MapView
                  style={tailwind('flex-1 h-full w-full')}
                  logoEnabled={false}
                  pitchEnabled={false}
                  compassEnabled={false}
                  styleURL={
                    scheme === 'dark'
                      ? 'mapbox://styles/antoinedevey/cl2b1uh2w001o14pfusk6kmih'
                      : 'mapbox://styles/antoinedevey/cl2b1vgny002614msvph72h6w'
                  }
                >
                  {data?.tournament && (
                    <>
                      <MapboxGL.Camera
                        defaultSettings={{
                          centerCoordinate: [
                            data.tournament.lng!,
                            data.tournament.lat!
                          ],
                          zoomLevel: 16,
                          pitch: 40
                        }}
                      />
                      <MapboxGL.MarkerView
                        id="marker"
                        coordinate={[
                          data.tournament.lng!,
                          data.tournament.lat!
                        ]}
                      >
                        <ProgressiveImage
                          source={require('../assets/pin.png')}
                          style={{ marginTop: -45 }}
                        />
                      </MapboxGL.MarkerView>
                    </>
                  )}
                </MapboxGL.MapView>
              </View>
            </View>

            <View
              style={tailwind('mt-3 flex-row justify-between items-center')}
            >
              <Text style={tailwind('text-xl')}>
                {t('participants')}{' '}
                <Text style={tailwind('text-green-400')}>
                  ({data?.tournament?.participants?.totalCount})
                </Text>
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => bottomSheetModalRef.current?.present()}
              >
                <Text style={tailwind('text-base text-green-400')}>
                  {t('filters')}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        data={data?.tournament?.participants?.edges}
        keyExtractor={(edge, i) => edge?.cursor || i.toString()}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          <ActivityIndicator animating={pageInfo?.hasNextPage} />
        }
        onEndReached={() => {
          if (pageInfo?.hasNextPage) {
            fetchMore({
              variables: {
                cursor: pageInfo.endCursor
              }
            })
          }
        }}
        renderItem={({ item: edge }) => (
          <Participant
            participant={edge.node}
            onPress={() => navigate('UserProfile', { id: edge.node?.id })}
          />
        )}
      />
      <CharacterPicker
        ref={bottomSheetModalRef}
        characters={characters}
        setCharacters={setCharacters}
        onValidation={onValidation}
      />
    </>
  )
}
