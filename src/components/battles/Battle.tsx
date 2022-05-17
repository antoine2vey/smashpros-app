import { useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { Battle as IBattle, MatchState } from '../../generated/graphql'
import { useColors } from '../../hooks/useColors'
import { Button } from '../Button'
import { ProgressiveImage } from '../ProgressiveImage'
import { Text } from '../Text'
import { BattleScore } from './BattleScore'
import { BattleSeparator } from './BattleSeparator'
import { BattleUser } from './BattleUser'

type Props = {
  battle: IBattle
  gameState: MatchState
  onVotedForInitiatorPress: () => void
  onVotedForOpponentPress: () => void
  onStartGamePress: () => void
}

export const Battle: React.FC<Props> = ({
  battle,
  onVotedForInitiatorPress,
  onVotedForOpponentPress,
  onStartGamePress,
  gameState
}) => {
  const tailwind = useTailwind()
  const { mediumShadow } = useColors()

  const canStartGame = useMemo(() => {
    return (
      battle?.opponent_character &&
      battle?.initiator_character &&
      !battle?.winner_id &&
      gameState !== MatchState.Playing
    )
  }, [battle, gameState])

  return (
    <>
      <View
        style={[
          tailwind('bg-white-400 dark:bg-black-200 rounded-xl mb-2'),
          mediumShadow
        ]}
      >
        <View style={tailwind('flex-row')}>
          <View style={tailwind('flex-1 flex-row justify-start items-center')}>
            <View
              style={tailwind(
                'px-1.5 bg-blue-500 bg-opacity-10 self-stretch justify-center rounded-md rounded-l-xl'
              )}
            >
              <Text style={tailwind('text-xl font-bold text-blue-500 ')}>
                P1
              </Text>
            </View>

            <BattleUser
              disabled={!!battle.winner_id}
              onPress={onVotedForInitiatorPress}
              user={battle.initiator}
              character={battle.initiator_character}
              initiatorVote={battle.initiator_vote}
              opponentVote={battle.opponent_vote}
            />

            <BattleScore
              style={tailwind('mr-2')}
              winner={battle?.winner_id}
              user={battle.initiator}
            />
          </View>

          <BattleSeparator winner={battle.winner_id} />

          <View style={tailwind('flex-1 flex-row justify-end items-center')}>
            <BattleScore
              style={tailwind('ml-2')}
              winner={battle?.winner_id}
              user={battle.opponent}
            />

            <BattleUser
              disabled={!!battle.winner_id}
              onPress={onVotedForOpponentPress}
              user={battle.opponent}
              character={battle.opponent_character}
              initiatorVote={battle.initiator_vote}
              opponentVote={battle.opponent_vote}
              isOpponent
            />

            <View
              style={tailwind(
                'px-1.5 bg-red-400 bg-opacity-10 self-stretch justify-center rounded-md rounded-r-xl'
              )}
            >
              <Text style={tailwind('text-xl font-bold text-red-400 ')}>
                P2
              </Text>
            </View>
          </View>
        </View>
      </View>
      {canStartGame && (
        <Button text="Start game" outlined onPress={onStartGamePress} />
      )}
    </>
  )
}
