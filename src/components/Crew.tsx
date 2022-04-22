import { Image, ImageSourcePropType, TouchableOpacity, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { Text } from "./Text"

type Props = {
  crew: any
}

export const Crew = ({ crew }: Props) => {
  const tailwind = useTailwind()

  return (
    <TouchableOpacity activeOpacity={0.8} style={tailwind('mr-2 w-24')}>
      <Image
        source={{ uri: crew.banner }}
        style={tailwind('w-24 h-40 rounded-lg')}
        resizeMode="cover"
      />
      <Text numberOfLines={1} style={tailwind('font-bold text-lg')}>
        {crew.name}
      </Text>
    </TouchableOpacity>
  )
}