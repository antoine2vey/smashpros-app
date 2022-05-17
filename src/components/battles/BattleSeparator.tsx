import { View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { Text } from '../Text'

type Props = {
  winner: string
}

export const BattleSeparator: React.FC<Props> = ({ winner }) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('justify-center')}>
      {winner ? (
        <Text style={tailwind('font-bold text-2xl')}>|</Text>
      ) : (
        <Text style={tailwind('font-bold italic text-2xl')}>vs</Text>
      )}
    </View>
  )
}
