import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { Stat } from '../../generated/graphql'
import { useColors } from '../../hooks/useColors'

type Props = {
  winrate: number
}

export const StatBar: React.FC<Props> = ({ winrate }) => {
  const tailwind = useTailwind()
  const { lightShadow } = useColors()

  const negativeWinrate = useMemo(() => winrate < 50, [winrate])

  return (
    <View
      style={[
        tailwind('w-full bg-black-200 dark:bg-white-200 h-2 rounded-full'),
        negativeWinrate && tailwind('items-end'),
        lightShadow
      ]}
    >
      {negativeWinrate ? (
        <View
          style={[
            tailwind('bg-red-400 h-2 w-full rounded-full'),
            { width: `${100 - winrate}%` }
          ]}
        />
      ) : (
        <View
          style={[
            tailwind('bg-green-300 h-2 w-full rounded-full'),
            { width: `${winrate}%` }
          ]}
        />
      )}
    </View>
  )
}
