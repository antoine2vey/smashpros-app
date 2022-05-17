import { View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { User } from '../../generated/graphql'
import { useColors } from '../../hooks/useColors'
import { ProgressiveImage } from '../ProgressiveImage'
import { Text } from '../Text'

type Props = {
  user: User
}

export const MatchHeaderProfile: React.FC<Props> = ({ user }) => {
  const tailwind = useTailwind()
  const { mediumShadow } = useColors()

  return (
    <View style={tailwind('items-center')}>
      <View style={tailwind('relative')}>
        <ProgressiveImage
          source={{ uri: user?.profile_picture! }}
          style={tailwind('w-16 h-16 rounded-full')}
        />
        <View
          style={[
            mediumShadow,
            tailwind('h-4 w-4 bg-red-400 rounded-full absolute top-0 right-0'),
            user?.in_match && tailwind('bg-green-300')
          ]}
        />
      </View>
      <Text style={tailwind('text-white-400 font-bold h-7')}>{user?.tag}</Text>
    </View>
  )
}
