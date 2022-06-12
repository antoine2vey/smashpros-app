import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { MatchesQuery, Stat, StatsQuery } from '../../generated/graphql'
import { Text } from '../Text'
import { StatBar } from './StatBar'

type Props = {
  title: string
  stat: Stat | undefined
}

export const StatContainer: React.FC<Props> = ({ title, stat }) => {
  const tailwind = useTailwind()

  const winrate = useMemo(
    () => Math.ceil((stat?.wins! / stat?.total!) * 100),
    [stat]
  )

  const negativeWinrate = useMemo(() => winrate < 50, [winrate])

  return (
    <>
      <View style={tailwind('flex-row items-center justify-between mb-2')}>
        {negativeWinrate ? (
          <Text style={tailwind('text-xl')}>{stat?.wins}</Text>
        ) : (
          <Text style={tailwind('text-green-300 text-xl font-bold')}>
            {stat?.wins}
          </Text>
        )}
        <Text style={tailwind('text-xl font-bold')}>{title}</Text>
        {negativeWinrate ? (
          <Text style={tailwind('text-xl font-bold text-red-400')}>
            {stat?.total - stat?.wins}
          </Text>
        ) : (
          <Text style={tailwind('text-xl')}>{stat?.total - stat?.wins}</Text>
        )}
      </View>
      <StatBar winrate={winrate} />
    </>
  )
}
