import { Image, ImageSourcePropType, StyleProp, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native"
import { useTailwind } from "tailwind-rn/dist"

type Props = TouchableOpacityProps & {
  uri: string
  selected: boolean
  style?: StyleProp<ViewStyle>
}

export const CharacterIcon: React.FC<Props> = ({ selected, uri, style, onPress }) => {
  const tailwind = useTailwind()

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        tailwind(`
          ${selected ? 'bg-green-300' : 'bg-black-300 dark:bg-white-300'}
          p-1
          rounded-full
        `),
        style
      ]}
    >
      <Image source={{ uri }} style={{ width: 25, height: 25 }} resizeMode="cover" />
    </TouchableOpacity>
  )
}