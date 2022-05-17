import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { Character, User } from '../../generated/graphql'
import { ProgressiveImage } from '../ProgressiveImage'
import { Text } from '../Text'

type Props = TouchableOpacityProps & {
  character: Character
  user: User
  initiatorVote: User
  opponentVote: User
  isOpponent?: boolean
}

export const BattleUser: React.FC<Props> = ({
  user,
  character,
  initiatorVote,
  opponentVote,
  isOpponent,
  ...props
}) => {
  const tailwind = useTailwind()

  return (
    <TouchableOpacity
      style={[
        isOpponent
          ? tailwind('flex-1 items-end p-2')
          : tailwind('flex-1 justify-start p-2')
      ]}
      {...props}
    >
      <Text numberOfLines={1} style={tailwind('font-medium text-sm')}>
        {user.tag}
      </Text>
      <View style={tailwind('flex-row items-center')}>
        {isOpponent && (
          <View style={tailwind('mr-1 flex-row')}>
            {initiatorVote.id === user.id && (
              <View style={tailwind('w-3 h-3 rounded-full bg-blue-500 mr-1')} />
            )}
            {opponentVote.id === user.id && (
              <View style={tailwind('w-3 h-3 rounded-full bg-red-400 mr-1')} />
            )}
          </View>
        )}
        <ProgressiveImage
          source={{ uri: character.picture }}
          resizeMode="contain"
          style={tailwind('h-8 w-8')}
        />
        {!isOpponent && (
          <View style={tailwind('ml-1 flex-row')}>
            {initiatorVote.id === user.id && (
              <View style={tailwind('w-3 h-3 rounded-full bg-blue-500 ml-1')} />
            )}
            {opponentVote.id === user.id && (
              <View style={tailwind('w-3 h-3 rounded-full bg-red-400 ml-1')} />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}
