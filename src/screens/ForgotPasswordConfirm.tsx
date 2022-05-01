import { SafeAreaView, View } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { BackButton } from '../components/BackButton'
import { Text } from '../components/Text'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useColors } from '../hooks/useColors'
import { Button } from '../components/Button'
import { openInbox } from 'react-native-email-link'
import { useNavigation } from '@react-navigation/native'
import { LoginScreenNavigationProp } from '../../App'

export const ForgotPasswordConfirm = () => {
  const tailwind = useTailwind()
  const { colors } = useColors()
  const { goBack, navigate } = useNavigation<LoginScreenNavigationProp>()

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
      <View style={tailwind('px-2')}>
        <BackButton />
      </View>
      <View style={tailwind('flex-1 items-center justify-center')}>
        <View
          style={tailwind('bg-white-200 dark:bg-black-200 p-7 rounded-xl mb-5')}
        >
          <MaterialCommunityIcons
            name="email-multiple-outline"
            size={32}
            color={colors.green2}
          />
        </View>
        <Text style={tailwind('text-2xl font-bold mb-2')}>Check your mail</Text>
        <Text
          style={tailwind(
            'text-sm text-grey-400 font-bold mb-12 text-center w-60'
          )}
        >
          We have sent you password recover instructions to your email
        </Text>
        <Button text="Open email app" onPress={() => openInbox()} />
        <Button
          text="Skip, I'll confirm later"
          outlined
          onPress={() => navigate('Login')}
        />
      </View>
    </SafeAreaView>
  )
}
