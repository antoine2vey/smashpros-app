import { View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { Text } from '../Text'

type Props = {
  initatorScore: number
  opponentScore: number
}

export const MatchHeaderScore: React.FC<Props> = ({
  initatorScore,
  opponentScore
}) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-row items-center -mt-7')}>
      <Text style={tailwind('text-white-400 text-3xl font-bold')}>
        {initatorScore}
      </Text>
      <Text style={tailwind('text-white-400 text-4xl font-bold mx-2')}>:</Text>
      <Text style={tailwind('text-white-400 text-3xl font-bold')}>
        {opponentScore}
      </Text>
    </View>
  )
}
