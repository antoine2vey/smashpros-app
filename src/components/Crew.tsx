import { Image, ImageSourcePropType, TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { Crew as ICrew } from "../generated/graphql"
import { ProgressiveImage } from "./ProgressiveImage"
import { Text } from "./Text"

type Props = TouchableOpacityProps & {
  crew: ICrew
  full?: boolean
  image?: string
}

export const Crew = ({ crew, full, image, ...props }: Props) => {
  const tailwind = useTailwind()

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[
        tailwind('mr-2 w-24'),
        full ? tailwind('w-full') : null
      ]}
    >
      <ProgressiveImage
        source={{ uri: image ?? crew.banner ?? crew.icon }}
        style={[
          tailwind('w-24 h-40 rounded-lg bg-white-400 dark:bg-black-400'),
          full ? tailwind('w-full') : null
        ]}
        resizeMode="cover"
      />
      <Text numberOfLines={1} style={tailwind('font-bold text-lg')}>
        {crew.name}
      </Text>
    </TouchableOpacity>
  )
}