import { View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { Maybe, User } from "../generated/graphql"
import { ProgressiveImage } from "./ProgressiveImage"
import { Text } from "./Text"

type Props = {
  participant: Maybe<User> | undefined
}

export const Participant: React.FC<Props> = ({ participant }) => {
  const tailwind = useTailwind()

  return (
    <View style={tailwind('flex-row flex p-1 mt-2 bg-white-300 dark:bg-black-300 rounded-xl')}>
      <ProgressiveImage source={{ uri: participant?.profile_picture! }} style={tailwind('w-16 h-16 rounded-xl')} />
      <View style={tailwind('ml-2')}>
        <Text style={tailwind('font-semibold')}>
          {participant?.crew && (
            <Text style={tailwind('font-bold text-green-300')}>{participant?.crew.prefix} | </Text>
          )}
          {participant?.tag}
        </Text>
        <View style={tailwind('flex-row mt-1')}>
          {participant?.characters.map(character => (
            <ProgressiveImage
              key={character.id}
              source={{ uri: character.picture }}
              resizeMode="center"
              style={tailwind('w-6 h-6 -ml-1')}
            />
          ))}
        </View>
      </View>
    </View>
  )
}