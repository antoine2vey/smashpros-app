import { Image, ImageSourcePropType, TouchableOpacity, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { Text } from "./Text"

type Props = {
  url: ImageSourcePropType
  name: string
}

export const Crew = ({ url, name }: Props) => {
  const tailwind = useTailwind()

  return (
    <TouchableOpacity activeOpacity={0.8} style={tailwind('mr-2 w-24')}>
      <Image
        source={url}
        style={tailwind('w-24 h-40 rounded-lg')}
        resizeMode="cover"
      />
      <Text numberOfLines={1} style={tailwind('font-bold text-lg')}>
        {name}
      </Text>
    </TouchableOpacity>
  )
}