import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useMemo, useState } from "react"
import { LayoutRectangle, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { useTailwind } from "tailwind-rn/dist"
import { colors } from "../../colors"
import { useScheme } from "../../hooks/useScheme"

type Props = {
  itemStyle?: StyleProp<ViewStyle>
}

export const Placeholder: React.FC<Props> = ({ itemStyle }) => {
  const tailwind = useTailwind()
  const { scheme } = useScheme()
  const [layout, setLayout] = useState<LayoutRectangle>()
  const primaryColor = scheme === 'light' ? colors.placeholder : colors.black
  const secondaryColor = scheme === 'light' ? colors.white : colors.black2
  const gradientColors = useMemo(() => [primaryColor, secondaryColor, primaryColor], [primaryColor, secondaryColor])
  const width = useSharedValue(0) 
  const styles = useAnimatedStyle(() => {
    if (layout) {
      return {
        transform: [
          {
            translateX: interpolate(
              width.value,
              [0, 1],
              [-layout.width, layout.width],
              Extrapolate.CLAMP
            )
          }
        ]
      }
    }

    return {}
  }, [layout])

  useEffect(() => {
    width.value = withRepeat(
      withTiming(1, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease)
      }),
      -1,
      true
    )
    // width.value = withTiming(0)
  }, [])

  return (
    <View
      onLayout={event => setLayout(event.nativeEvent.layout)}
      style={[
        itemStyle,
        {
          overflow: 'hidden',
          backgroundColor: primaryColor
        }
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFillObject, styles]}>
        <LinearGradient
          style={tailwind('flex-1')}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={gradientColors}
        />
      </Animated.View>
    </View>
  )
}

type TextPlaceholderProps = {
  type?: 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  style?: StyleProp<ViewStyle>
}

export const TextPlaceholder: React.FC<TextPlaceholderProps> = ({ type, style }) => {
  const tailwind = useTailwind()

  function getHeightFromType() {
    switch (type) {
      case 'sm':
        return 'h-2'
      case 'lg':
        return 'h-5'
      case 'xl':
        return 'h-6'
      case '2xl':
        return 'h-8'
      case '3xl':
        return 'h-10'
      default:
        return 'h-4'
    }
  }

  return (
    <Placeholder itemStyle={[
      tailwind(`rounded-md ${getHeightFromType()} mb-1.5`),
      style
    ]}  />
  )
}