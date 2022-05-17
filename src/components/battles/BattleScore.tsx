import { StyleProp, View, ViewStyle } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { User } from '../../generated/graphql'
import { Text } from '../Text'

type Props = {
  winner: string
  user: User
  style?: StyleProp<ViewStyle>
}

export const BattleScore: React.FC<Props> = ({ winner, user, style }) => {
  const tailwind = useTailwind()

  return (
    <View {...style}>
      {winner &&
        (user.id === winner ? (
          <Text style={tailwind('font-bold text-2xl text-green-300')}>W</Text>
        ) : (
          <Text style={tailwind('font-bold text-2xl text-red-400')}>L</Text>
        ))}
    </View>
  )
}
