import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useTailwind } from 'tailwind-rn/dist'
import { MoneymatchRouteProps } from '../../App'
import { BackButton } from '../components/BackButton'
import { Battle } from '../components/battles/Battle'
import { Button } from '../components/Button'
import { CharacterPicker } from '../components/CharacterPicker'
import { MatchHeaderProfile } from '../components/matches/MatchHeaderProfile'
import { MatchHeaderScore } from '../components/matches/MatchHeaderScore'
import { ProgressiveImage } from '../components/ProgressiveImage'
import { Text } from '../components/Text'
import {
  BattleState,
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
import { useScheme } from '../hooks/useScheme'

export const Moneymatch: React.FC = () => {
  const tailwind = useTailwind()
  const { params } = useRoute<MoneymatchRouteProps<'Moneymatch'>>()
  const { mediumShadow } = useColors()
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const { data: profile } = useProfileQuery()
  const [setOnline] = useSetOnlineMutation()
  const [updateMatch] = useUpdateMatchMutation()
  const [updateBattle] = useUpdateBattleMutation()
  const { scheme } = useScheme()
  const { data, error } = useMatchQuery({
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

  const battles = useMemo(() => {
    if (!match || match.battles.length === 0) {
      return []
    }

    let copy = [...match.battles]
    const index = copy.findIndex((b) => b.winner_id === null)
    copy.push(copy.splice(index, 1)[0])

    return copy
  }, [match?.battles])

  const latestBattle = useMemo(() => {
    if (!battles) {
      return null
    }

    return battles[battles?.length - 1]
  }, [battles])

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
      setStatusBarStyle('light')
      setOnline({
        variables: {
          online: true
        }
      })

      return () => {
        setStatusBarStyle(scheme === 'dark' ? 'light' : 'dark')
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
    <View style={tailwind('flex-1 bg-white-400 dark:bg-black-400')}>
      <View style={[mediumShadow, tailwind('bg-green-300 rounded-b-3xl z-10')]}>
        <SafeAreaView>
          <View style={tailwind('px-3')}>
            <BackButton white />
          </View>
          <View style={tailwind('px-8 pt-5 pb-3 flex-row justify-between')}>
            <MatchHeaderProfile user={match?.initiator} />
            <MatchHeaderScore
              initatorScore={match?.initiator_wins}
              opponentScore={match?.opponent_wins}
            />
            <MatchHeaderProfile user={match?.opponent} />
          </View>
        </SafeAreaView>
      </View>
      <ScrollView
        style={tailwind('-mt-3 pt-3')}
        contentContainerStyle={tailwind('p-3')}
      >
        {match?.state === MatchState.Hold ? (
          user?.id === match.opponent?.id ? (
            <Button
              text="Start the game"
              outlined
              onPress={() => {
                updateMatch({
                  variables: {
                    id: params.id,
                    state: MatchState.Started
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
          match?.state === MatchState.Started && (
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

        {battles.map((battle, i) => (
          <Battle
            key={battle.id}
            battle={battle}
            matchState={match?.state}
            onVotedForInitiatorPress={() => {
              updateBattle({
                variables: {
                  id: latestBattle?.id!,
                  vote: battle.initiator?.id
                }
              })
            }}
            onVotedForOpponentPress={() => {
              updateBattle({
                variables: {
                  id: latestBattle?.id!,
                  vote: battle.opponent?.id
                }
              })
            }}
            onStartBattlePress={() => {
              updateBattle({
                variables: {
                  id: latestBattle?.id!,
                  state: BattleState.Playing
                }
              })
            }}
            onStopBattlePress={() => {
              updateBattle({
                variables: {
                  id: latestBattle?.id!,
                  state: BattleState.Voting
                }
              })
            }}
          />
        ))}
      </ScrollView>
    </View>
  )
}
