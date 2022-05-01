import { StyleProp, Text as RNText, TextProps, TextStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { useTailwind } from 'tailwind-rn/dist'

type Props = TextProps & {
  style?: StyleProp<TextStyle>
}

export const Text: React.FC<Props> = ({ children, style, ...rest }) => {
  const tailwind = useTailwind()

  return (
    <Animated.Text
      {...rest}
      style={[tailwind('text-base text-black-300 dark:text-white-300'), style]}
    >
      {children}
    </Animated.Text>
  )
}
