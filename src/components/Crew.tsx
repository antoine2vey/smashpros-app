import { Image, ImageSourcePropType, TouchableOpacity, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { Crew as ICrew } from "../generated/graphql"
import { ProgressiveImage } from "./ProgressiveImage"
import { Text } from "./Text"

type Props = {
  crew: ICrew
  full?: boolean
}

export const Crew = ({ crew, full }: Props) => {
  const tailwind = useTailwind()

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        tailwind('mr-2 w-24'),
        full ? tailwind('w-full') : null
      ]}
    >
      <ProgressiveImage
        source={{ uri: crew.banner }}
        style={[
          tailwind('w-24 h-40 rounded-lg'),
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