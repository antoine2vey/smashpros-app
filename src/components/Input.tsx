import { FormikConfig, FormikProps } from "formik"
import { useState } from "react"
import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { useTailwind } from "tailwind-rn"
import { Text } from "./Text"
import { Ionicons } from '@expo/vector-icons'

type Props = TextInputProps & {
  label: string
}

export const Input: React.FC<Props> = ({ label, secureTextEntry, ...props }) => {
  const [visible, setVisible] = useState(secureTextEntry)
  const tailwind = useTailwind()

  return (
    <Animated.View style={tailwind('relative mb-2 rounded-md bg-grey-300 dark:bg-black-200')}>
      <TextInput
        autoCapitalize="none"
        style={tailwind('rounded-md p-2 pt-6 text-base font-bold text-black-300 dark:text-white-300')}
        secureTextEntry={visible}
        {...props}
      />
      <Text style={tailwind('absolute top-0 text-xs pl-2 pt-2')}>{label}</Text>

      {secureTextEntry && (
        <TouchableOpacity style={tailwind('absolute top-1/4 right-5')} onPress={() => setVisible(!visible)}>
          <Ionicons name={visible ? 'eye-outline' : 'eye-off-outline'} size={24} />
        </TouchableOpacity>
      )}
    </Animated.View>
  )
}