import {
  HeaderBackButton,
  HeaderBackButtonProps
} from '@react-navigation/elements'
import { AntDesign } from '@expo/vector-icons'
import { useColors } from '../hooks/useColors'
import { useNavigation } from '@react-navigation/native'
import { useTailwind } from 'tailwind-rn/dist'

export const BackButton = (props: HeaderBackButtonProps) => {
  const { colors } = useColors()
  const { goBack } = useNavigation()
  const tailwind = useTailwind()

  return (
    <HeaderBackButton
      label="Back"
      labelVisible
      labelStyle={tailwind('ml-2 text-sm font-bold')}
      onPress={goBack}
      tintColor={colors.green2}
      backImage={({ tintColor }) => (
        <AntDesign size={18} name="arrowleft" color={tintColor} />
      )}
      {...props}
    />
  )
}
