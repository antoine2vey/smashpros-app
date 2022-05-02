import { useState } from 'react'
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useTailwind } from 'tailwind-rn'
import { Text } from './Text'
import { Ionicons } from '@expo/vector-icons'
import { useScheme } from '../hooks/useScheme'
import { colors } from '../colors'

type Props = TextInputProps & {
  label?: string
}

export const Input: React.FC<Props> = ({
  label,
  secureTextEntry,
  ...props
}) => {
  const [visible, setVisible] = useState(secureTextEntry)
  const tailwind = useTailwind()
  const { scheme } = useScheme()

  return (
    <Animated.View
      style={tailwind('relative mb-2 rounded-md bg-grey-300 dark:bg-black-200')}
    >
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={[
          tailwind(
            'rounded-md p-2 pt-6 font-medium text-black-300 dark:text-white-300 z-10'
          ),
          !label && tailwind('pt-2'),
          {
            fontSize: 16
          }
        ]}
        secureTextEntry={visible}
        {...props}
      />

      {!!label && (
        <Text style={tailwind('absolute top-0 text-xs pl-2 pt-2')}>
          {label}
        </Text>
      )}

      {secureTextEntry && (
        <TouchableOpacity
          style={tailwind('absolute top-1/4 right-5')}
          onPress={() => setVisible(!visible)}
        >
          <Ionicons
            name={visible ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color={scheme === 'dark' ? colors.white : colors.black}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  )
}
