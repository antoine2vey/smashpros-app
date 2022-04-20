import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import React from 'react'
import { Image, ImageSourcePropType, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text } from './Text'
import Feather from '@expo/vector-icons/Feather'
import { useTailwind } from 'tailwind-rn/dist'
import { colors } from '../colors'

const profile = require('../assets/icon.png')

const Avatar = ({ size, url }: { size: number, url: ImageSourcePropType }) => (
  <View style={{ height: size, width: size, borderRadius: size / 2, overflow: 'hidden' }}>
    <Image source={url} style={{ height: size, width: size }} resizeMode="cover" />
  </View>
)

export const Header = ({}: NativeStackHeaderProps) => {
  const { top } = useSafeAreaInsets()
  const tailwind = useTailwind()
 
  return (
    <View style={[
      { paddingTop: top },
      tailwind('px-2 pb-2 bg-white-300 dark:bg-black-300')
    ]}>
      <View style={tailwind('flex-row justify-between')}>
        <View style={tailwind('flex-row items-center')}>
          <Avatar size={35} url={profile} />
          <Text style={tailwind('text-base font-bold ml-2')}>shaark</Text>
        </View>

        <View style={tailwind('flex-row items-center')}>
          <Feather name="search" size={24} color={colors.green2} style={tailwind('ml-2')} />
          <Feather name="user" size={24} color={colors.green2} style={tailwind('ml-2')} />
        </View>
      </View>
    </View>
  )
}