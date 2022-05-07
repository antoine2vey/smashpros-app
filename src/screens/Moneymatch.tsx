import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useTailwind } from 'tailwind-rn/dist'
import { MoneymatchRouteProps } from '../../App'
import { BackButton } from '../components/BackButton'
import { Button } from '../components/Button'
import { CharacterPicker } from '../components/CharacterPicker'
import { ProgressiveImage } from '../components/ProgressiveImage'
import { Text } from '../components/Text'
import {
  MatchState,
  useBattleUpdateSubscription,
  useMatchQuery,
  useMatchUpdateStateSubscription,
  useProfileQuery,
  useSetOnlineMutation,
  useUpdateBattleMutation,
  useUpdateMatchMutation,
  useUserJoinSubscription,
  useUserLeftSubscription
} from '../generated/graphql'
import { useColors } from '../hooks/useColors'

export const Moneymatch: React.FC = () => {
  const tailwind = useTailwind()
  const { params } = useRoute<MoneymatchRouteProps<'Moneymatch'>>()
  const { lightShadow } = useColors()
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const { data: profile } = useProfileQuery()
  const [setOnline] = useSetOnlineMutation()
  const [updateMatch] = useUpdateMatchMutation()
  const [updateBattle] = useUpdateBattleMutation()
  const { data, loading } = useMatchQuery({
    variables: {
      id: params.id
    }
  })

  const match = data?.match

  const opponent = useMemo(() => {
    if (match?.opponent?.id === profile?.user?.id) {
      return match?.initiator?.id
    }

    return match?.opponent?.id
  }, [match, profile])

  const user = useMemo(() => {
    if (match?.initiator?.id === profile?.user?.id) {
      return match?.initiator
    }

    return match?.opponent
  }, [match, profile])

  const latestBattle = useMemo(() => {
    return match?.battles[match.battles.length - 1]
  }, [match?.battles])

  useUserJoinSubscription({
    variables: {
      id: opponent!
    }
  })

  useUserLeftSubscription({
    variables: {
      id: opponent!
    }
  })

  useMatchUpdateStateSubscription({
    variables: {
      id: params.id
    }
  })

  useFocusEffect(
    useCallback(() => {
      // Set user in_match when hes joining match
      setOnline({
        variables: {
          online: true
        }
      })

      return () => {
        // If he leaves the screen, set him offline
        setOnline({
          variables: {
            online: false
          }
        })
      }
    }, [])
  )

  useBattleUpdateSubscription({
    variables: {
      id: latestBattle?.id!
    }
  })

  return (
    <View style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
      <View style={[lightShadow, tailwind('bg-green-300 rounded-b-3xl z-10')]}>
        <SafeAreaView>
          <View style={tailwind('px-3')}>
            <BackButton white />
          </View>
          <View style={tailwind('px-8 pt-5 pb-3 flex-row justify-between')}>
            <View style={tailwind('items-center')}>
              <View style={tailwind('relative')}>
                <ProgressiveImage
                  source={{ uri: match?.initiator?.profile_picture! }}
                  style={tailwind('w-16 h-16 rounded-full')}
                />
                <View
                  style={[
                    lightShadow,
                    tailwind(
                      'h-4 w-4 bg-red-400 rounded-full absolute top-0 right-0'
                    ),
                    match?.initiator?.in_match && tailwind('bg-green-300')
                  ]}
                />
              </View>
              <Text style={tailwind('font-bold h-7')}>
                {match?.initiator?.tag}
              </Text>
            </View>
            <View style={tailwind('flex-row items-center -mt-7')}>
              <Text style={tailwind('text-3xl font-bold')}>
                {match?.initiator_wins}
              </Text>
              <Text style={tailwind('text-4xl font-bold mx-2')}>:</Text>
              <Text style={tailwind('text-3xl font-bold')}>
                {match?.opponent_wins}
              </Text>
            </View>
            <View style={tailwind('items-center')}>
              <View style={tailwind('relative')}>
                <ProgressiveImage
                  source={{ uri: match?.opponent?.profile_picture! }}
                  style={tailwind('w-16 h-16 rounded-full')}
                />
                <View
                  style={[
                    lightShadow,
                    tailwind(
                      'h-4 w-4 bg-red-400 rounded-full absolute top-0 right-0'
                    ),
                    match?.opponent?.in_match && tailwind('bg-green-300')
                  ]}
                />
              </View>
              <Text style={tailwind('font-bold h-7')}>
                {match?.opponent?.tag}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <ScrollView
        style={tailwind('-mt-3 pt-3')}
        contentContainerStyle={tailwind('p-3')}
      >
        <Text>state: {match?.state}</Text>
        {match?.state === MatchState.Hold ? (
          user?.id === match.opponent?.id ? (
            <Button
              text="Start the game"
              outlined
              onPress={() => {
                updateMatch({
                  variables: {
                    id: params.id,
                    state: MatchState.CharacterChoice
                  }
                })
              }}
            />
          ) : (
            <Text style={tailwind('text-grey-400')}>
              Match is currently on hold, {match.opponent?.tag} has to accept it
              first in order to start the matches
            </Text>
          )
        ) : (
          match?.state === MatchState.CharacterChoice && (
            <View style={tailwind('')}>
              <Text style={tailwind('text-xl font-bold')}>
                Character choice
              </Text>
              <View style={tailwind('flex-row')}>
                {user?.characters.map((character) => (
                  <TouchableOpacity
                    key={character.id}
                    onPress={() => {
                      updateBattle({
                        variables: {
                          id: latestBattle?.id!,
                          character: character.id
                        }
                      })
                    }}
                  >
                    <ProgressiveImage
                      source={{ uri: character.picture }}
                      style={tailwind('w-10 h-10')}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )
        )}

        <View>
          {match?.battles.map((battle) => (
            <View
              key={battle.id}
              style={tailwind('bg-black-200 p-2 rounded-xl')}
            >
              <View style={tailwind('flex-row justify-between mb-2')}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      updateBattle({
                        variables: {
                          id: latestBattle?.id!,
                          vote: battle.initiator?.id
                        }
                      })
                    }}
                  >
                    <Text>{battle.initiator?.tag}</Text>
                    <ProgressiveImage
                      source={{ uri: battle.initiator_character?.picture }}
                      style={tailwind('w-10 h-10')}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      updateBattle({
                        variables: {
                          id: latestBattle?.id!,
                          vote: battle.opponent?.id
                        }
                      })
                    }}
                  >
                    <Text>{battle.opponent?.tag}</Text>
                    <ProgressiveImage
                      source={{ uri: battle.opponent_character?.picture }}
                      style={tailwind('w-10 h-10')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {battle.initiator_vote && (
                <Text>
                  {battle.initiator?.tag} voted {battle.initiator_vote?.tag}
                </Text>
              )}
              {battle.opponent_vote && (
                <Text>
                  {battle.opponent?.tag} voted {battle.opponent_vote?.tag}
                </Text>
              )}
              {battle.winner && <Text>winner is {battle.winner.tag}</Text>}
              {battle.opponent_character &&
                battle.initiator_character &&
                !battle.winner &&
                match.state !== MatchState.Playing && (
                  <Button
                    text="Start game"
                    onPress={() => {
                      updateMatch({
                        variables: {
                          id: params.id,
                          state: MatchState.Playing
                        }
                      })
                    }}
                  />
                )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* <CharacterPicker
        ref={bottomSheetRef}
        setCharacters={() => {}}
        characters={[]}
        onValidation={() => {}}
      /> */}
    </View>
  )
}
