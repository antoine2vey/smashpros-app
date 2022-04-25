import React from "react"
import { ImageBackgroundProps, ImageProps, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { useTailwind } from "tailwind-rn/dist"

export const ProgressiveImage: React.FC<ImageProps> = (props) => {
  const opacity = useSharedValue(0)
  const styles = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  return (
    <Animated.Image
      {...props}
      style={[
        props.style,
        styles
      ]}
      onLoad={() => { opacity.value = withTiming(1) }}
    />
  )
}

export const ProgressiveImageBackground: React.FC<{ containerStyle?: StyleProp<ViewStyle> } & ImageProps> = ({ containerStyle, ...props }) => {
  const tailwind = useTailwind()

  return (
    <View style={[tailwind('relative overflow-hidden'), containerStyle]}>
      <ProgressiveImage
        {...props}
        style={StyleSheet.absoluteFill}
      />
    </View>
  )
}