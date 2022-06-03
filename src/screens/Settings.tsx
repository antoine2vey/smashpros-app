import { useNavigation } from '@react-navigation/native'
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn/dist'
import { ProgressiveImage } from '../components/ProgressiveImage'
import { Text } from '../components/Text'
import { useProfileQuery } from '../generated/graphql'

const Divider: React.FC<{ style?: StyleProp<ViewProps> }> = ({ style }) => {
  const tailwind = useTailwind()

  return (
    <View
      style={[tailwind('bg-grey-200 dark:bg-black-200 h-px w-full'), style]}
    />
  )
}

const Row = ({ icon, name, ...props }) => {
  const tailwind = useTailwind()

  return (
    <View>
      <TouchableOpacity style={tailwind('py-2')} {...props}>
        <Text>
          {icon} - {name}
        </Text>
      </TouchableOpacity>
      <Divider />
    </View>
  )
}

export const Settings: React.FC = () => {
  const tailwind = useTailwind()
  const { top } = useSafeAreaInsets()
  const { data } = useProfileQuery()
  const { navigate } = useNavigation()

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white-400 dark:bg-black-400')}>
      <ScrollView contentContainerStyle={tailwind('p-6')}>
        <ProgressiveImage
          source={{ uri: data?.user?.profile_picture }}
          style={tailwind('w-14 h-14 rounded-full')}
        />
        <Text style={tailwind('text-3xl mt-1')}>{data?.user?.tag}</Text>
        <TouchableOpacity
          onPress={() => navigate('UserProfile', { id: data?.user?.id })}
        >
          <Text style={tailwind('text-sm underline')}>Show profile</Text>
        </TouchableOpacity>
        <Divider style={tailwind('mt-5')} />
        <Text style={tailwind('text-xl font-semibold my-5')}>
          Account settings
        </Text>
        <Row icon={'foo'} name="profil" />
        <Row icon={'foo'} name="profil" />
        <Row icon={'foo'} name="profil" />
        <Text style={tailwind('text-xl font-semibold my-5')}>
          Account settings
        </Text>
        <Row icon={'foo'} name="profil" />
        <Row icon={'foo'} name="profil" />
      </ScrollView>
    </SafeAreaView>
  )
}
