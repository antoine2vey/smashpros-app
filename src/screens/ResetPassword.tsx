import { SafeAreaView, View } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Text } from '../components/Text'

export const ResetPassword = () => {
  const tailwind = useTailwind()

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
      <Text>ok</Text>
    </SafeAreaView>
  )
}
