import { useEffect } from "react"
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { useTailwind } from "tailwind-rn"
import { Text } from "./Text"

type Props = TouchableOpacityProps & {
  text: string
  outlined?: boolean
  loading?: boolean
}

export const Button: React.FC<Props> = ({ loading, text, outlined, style, disabled, ...props }) => {
  const tailwind = useTailwind()
  const opacity = useSharedValue(1)
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  useEffect(() => {
    if (disabled) {
      opacity.value = withSpring(0.5)
    } else {
      opacity.value = withSpring(1)
    }
  }, [disabled])

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled}
        style={[
          outlined
          ? tailwind('items-center p-3')
          : tailwind('bg-green-300 justify-center items-center rounded-md h-14'),
          style
        ]}
        {...props}
      >
        {loading ? (
          <ActivityIndicator animating={loading} color="#fff" />
        ) : (
          <Text style={
            outlined
            ? tailwind('text-green-300 font-bold')
            : tailwind('text-white-400 font-medium')
          }>{text}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  )
}