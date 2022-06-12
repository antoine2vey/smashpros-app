import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import _, { uniq } from 'lodash'
import { useCallback, useRef, useState } from 'react'
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn'
import { MoneymatchScreenNavigateProp } from '../../App'
import {
  Placeholder,
  TextPlaceholder
} from '../components/placeholders/GenericPlaceholders'
import { ProgressiveImage } from '../components/ProgressiveImage'
import { Text } from '../components/Text'
import { Match, MatchState, useMatchesQuery } from '../generated/graphql'
import { useColors } from '../hooks/useColors'
import { Stats } from './Stats'

function filterMatchEdgeByState(state: MatchState) {
  return (edge: any) => {
    return edge?.node?.state === state
  }
}

export const Moneymatches = () => {
  const tailwind = useTailwind()
  const { navigate } = useNavigation<MoneymatchScreenNavigateProp>()
  const { mediumShadow } = useColors()
  const { data, loading, refetch } = useMatchesQuery()
  const [refreshing, setRefreshing] = useState(false)
  const { top } = useSafeAreaInsets()
  const bottomSheetModalRef = useRef<BottomSheetModal>()
  const getUniqueCharactersForMatch = useCallback((match: Match) => {
    const characters = match?.battles?.map((battle) => {
      return {
        initator_character: battle.initiator_character,
        opponent_character: battle.opponent_character
      }
    })

    return {
      initiatorCharacters: uniq(characters.map((c) => c.initator_character)),
      opponentCharacters: uniq(characters.map((c) => c.opponent_character))
    }
  }, [])

  if (loading) {
    return (
      <View style={tailwind('flex-1 bg-white-300 dark:bg-black-300 p-2')}>
        <TextPlaceholder type="2xl" style={tailwind('w-48')} />
        <Placeholder itemStyle={tailwind(`rounded-xl w-full h-28 mb-2`)} />
        <Placeholder itemStyle={tailwind(`rounded-xl w-full h-28 mb-2`)} />
        <TextPlaceholder type="2xl" style={tailwind('w-48 mt-4')} />
        <Placeholder itemStyle={tailwind(`rounded-xl w-full h-28 mb-2`)} />
        <Placeholder itemStyle={tailwind(`rounded-xl w-full h-28 mb-2`)} />
      </View>
    )
  }

  return (
    <>
      <View style={tailwind('flex-1 bg-white-400 dark:bg-black-400')}>
        <FlatList
          style={tailwind('flex-1 bg-white-400 dark:bg-black-400')}
          data={data?.matches?.edges}
          ListHeaderComponent={() => (
            <View style={[tailwind('mb-5'), { marginTop: Math.max(30, top) }]}>
              <Text style={tailwind('text-2xl font-bold')}>Moneymatches</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigate('CreateMoneymatch')}
              >
                <Text>You can create matches</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => bottomSheetModalRef.current?.present()}
              >
                <Text>Or either check your statistics</Text>
              </TouchableOpacity>
            </View>
          )}
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true)
            await refetch()
            setRefreshing(false)
          }}
          keyExtractor={(item, index) => item?.node?.id!}
          contentContainerStyle={tailwind('px-5')}
          renderItem={({ item: edge }) => {
            const { initiatorCharacters, opponentCharacters } =
              getUniqueCharactersForMatch(edge?.node)

            return (
              <TouchableOpacity
                key={edge?.node?.id}
                activeOpacity={0.9}
                onPress={() => navigate('Moneymatch', { id: edge?.node?.id! })}
                style={[
                  tailwind(
                    'bg-white-400 dark:bg-black-200 rounded-xl mb-2 p-3'
                  ),
                  mediumShadow
                ]}
              >
                <View style={tailwind('justify-between flex-row')}>
                  <ProgressiveImage
                    source={{ uri: edge?.node?.initiator?.profile_picture! }}
                    style={tailwind('w-10 h-10 rounded-full')}
                  />
                  <View
                    style={tailwind(
                      'flex-1 justify-center items-center flex-row'
                    )}
                  >
                    <Text style={tailwind('text-2xl font-bold')}>
                      {edge?.node?.initiator_wins}
                    </Text>
                    <Text style={tailwind('text-2xl font-bold')}> - </Text>
                    <Text style={tailwind('text-2xl font-bold')}>
                      {edge?.node?.opponent_wins}
                    </Text>
                  </View>
                  <ProgressiveImage
                    source={{ uri: edge?.node?.opponent?.profile_picture! }}
                    style={tailwind('w-10 h-10 rounded-full')}
                  />
                </View>
                <View style={tailwind('flex-row justify-between mt-1')}>
                  <View style={tailwind('flex-row items-center')}>
                    <Text style={tailwind('font-medium')}>
                      {edge?.node?.initiator?.tag}
                    </Text>
                    <View style={tailwind('flex-row ml-1')}>
                      {initiatorCharacters.map((character) => (
                        <ProgressiveImage
                          key={character?.id}
                          source={{ uri: character?.picture }}
                          style={tailwind('w-6 h-6')}
                        />
                      ))}
                    </View>
                  </View>
                  <View style={tailwind('flex-row items-center')}>
                    <View style={tailwind('flex-row mr-1')}>
                      {opponentCharacters.map((character) => (
                        <ProgressiveImage
                          key={character?.id}
                          source={{ uri: character?.picture }}
                          style={tailwind('w-6 h-6')}
                        />
                      ))}
                    </View>
                    <Text style={tailwind('font-medium')}>
                      {edge?.node?.opponent?.tag}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
      <Stats ref={bottomSheetModalRef} />
    </>
  )
}
