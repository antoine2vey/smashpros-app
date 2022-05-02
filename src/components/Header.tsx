import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import React, { useMemo } from 'react'
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text } from './Text'
import Feather from '@expo/vector-icons/Feather'
import { useTailwind } from 'tailwind-rn/dist'
import { colors } from '../colors'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenNavigateProp } from '../../App'
import { useHeaderQuery } from '../generated/graphql'
import { BackButton } from './BackButton'

const Avatar = ({ size, url }: { size: number; url: ImageSourcePropType }) => (
  <View
    style={{
      height: size,
      width: size,
      borderRadius: size / 2,
      overflow: 'hidden'
    }}
  >
    <Image
      source={url}
      style={{ height: size, width: size }}
      resizeMode="cover"
    />
  </View>
)

type Props = NativeStackHeaderProps & {
  root?: boolean
}

export const Header: React.FC<Props> = ({ root }) => {
  const { top } = useSafeAreaInsets()
  const tailwind = useTailwind()
  const { navigate, canGoBack } = useNavigation<HomeScreenNavigateProp>()
  const { data } = useHeaderQuery()

  const canBack = useMemo(() => canGoBack(), [])

  return (
    <View
      style={[
        { paddingTop: top },
        tailwind('px-2 pb-2 bg-white-300 dark:bg-black-300')
      ]}
    >
      <View style={tailwind('flex-row justify-between')}>
        <View style={tailwind('flex-row items-center')}>
          {!root && canBack && <BackButton />}
        </View>

        <View style={!root && canBack ? null : tailwind('flex-1')}>
          <TouchableOpacity
            style={tailwind('flex-row items-center')}
            onPress={() => navigate('UserProfile', { id: undefined })}
          >
            <Avatar size={35} url={{ uri: data?.user?.profile_picture }} />
            <Text style={tailwind('text-base font-medium ml-2')}>
              {data?.user?.crew && (
                <Text style={tailwind('text-green-300 font-bold')}>
                  {data?.user?.crew?.prefix} |{' '}
                </Text>
              )}
              {data?.user?.tag}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tailwind('flex-row items-center')}>
          <Feather
            name="search"
            size={24}
            color={colors.green2}
            style={tailwind('ml-2')}
          />
          <Feather
            name="user"
            size={24}
            color={colors.green2}
            style={tailwind('ml-2')}
          />
        </View>
      </View>
    </View>
  )
}
