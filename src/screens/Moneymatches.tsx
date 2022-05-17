import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import { useNavigation, useRoute } from '@react-navigation/native'
import _, { uniq } from 'lodash'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  SectionList,
  TouchableOpacity,
  View
} from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { MoneymatchRouteProps, MoneymatchScreenNavigateProp } from '../../App'
import {
  Placeholder,
  TextPlaceholder
} from '../components/placeholders/GenericPlaceholders'
import { ProgressiveImage } from '../components/ProgressiveImage'
import { Text } from '../components/Text'
import {
  Match,
  MatchEdge,
  MatchState,
  useBattleUpdateSubscription,
  useMatchesQuery,
  useMatchUpdateStateSubscription,
  useNextTournamentQuery
} from '../generated/graphql'
import { useColors } from '../hooks/useColors'

function filterMatchEdgeByState(state: MatchState) {
  return (edge: any) => {
    return edge?.node?.state === state
  }
}

export const Moneymatches = () => {
  const tailwind = useTailwind()
  const { navigate } = useNavigation<MoneymatchScreenNavigateProp>()
  const { mediumShadow } = useColors()
  const { data, loading } = useMatchesQuery()
  const { data: next } = useNextTournamentQuery()

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
    <SafeAreaView style={tailwind('flex-1 bg-white-400 dark:bg-black-400')}>
      <TouchableOpacity onPress={() => navigate('CreateMoneymatch')}>
        <Text>Create</Text>
      </TouchableOpacity>
      <FlatList
        style={tailwind('flex-1 bg-white-400 dark:bg-black-400')}
        data={data?.matches?.edges}
        keyExtractor={(item, index) => item?.node?.id! + index}
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
                tailwind('bg-white-400 dark:bg-black-200 rounded-xl mb-2 p-6'),
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
    </SafeAreaView>
  )
}
