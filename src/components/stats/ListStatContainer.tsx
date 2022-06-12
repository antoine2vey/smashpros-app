import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import {
  CharacterStat,
  MatchesQuery,
  Stat,
  StatsQuery,
  UserStat
} from '../../generated/graphql'
import { ProgressiveImage } from '../ProgressiveImage'
import { Text } from '../Text'
import { StatBar } from './StatBar'

type Props = {
  title: string
  stats: UserStat[] | CharacterStat[] | undefined
}

export const ListStatContainer: React.FC<Props> = ({ title, stats }) => {
  const tailwind = useTailwind()

  const winrate = useCallback(
    (stat) => Math.ceil((stat?.wins! / stat?.total!) * 100),
    [stats]
  )

  const negativeWinrate = useCallback((stat) => winrate(stat) < 50, [winrate])

  return (
    <>
      <Text style={tailwind('text-xl font-bold')}>{title}</Text>
      {stats?.map(({ stat, character, user, __typename }, index) => (
        <View style={tailwind('mb-2')} key={index}>
          <View
            key={__typename === 'UserStat' ? user?.id : character?.id}
            style={tailwind(
              'flex-row items-center mt-2 mb-1.5 justify-between'
            )}
          >
            {negativeWinrate(stat) ? (
              <Text>{stat?.wins}</Text>
            ) : (
              <Text style={tailwind('text-green-300 font-bold')}>
                {stat?.wins}
              </Text>
            )}
            {__typename === 'UserStat' ? (
              <View style={tailwind('flex-row items-center')}>
                <ProgressiveImage
                  source={{ uri: user?.profile_picture }}
                  style={tailwind('w-6 h-6 rounded-full')}
                />
                <Text style={tailwind('ml-2 font-semibold')}>{user?.tag}</Text>
              </View>
            ) : (
              <ProgressiveImage
                source={{ uri: character?.picture }}
                style={tailwind('w-6 h-6 rounded-full')}
              />
            )}
            {negativeWinrate(stat) ? (
              <Text style={tailwind('text-red-400 font-bold')}>
                {stat?.total - stat?.wins}
              </Text>
            ) : (
              <Text>{stat?.total - stat?.wins}</Text>
            )}
          </View>
          <StatBar winrate={winrate(stat)} />
        </View>
      ))}
    </>
  )
}
