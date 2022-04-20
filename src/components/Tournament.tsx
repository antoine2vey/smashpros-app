import { Image, TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { colors } from "../colors"
import { Text } from "./Text"
import Feather from '@expo/vector-icons/Feather'
import { useTailwind } from "tailwind-rn/dist"
import { useTranslation } from "react-i18next"

const icon = require('../assets/azuria.png')
const zss = require('../assets/icon.png')

type Props = TouchableOpacityProps & {
  big?: boolean
}

export const Tournament = ({
  big,
  ...rest
}: Props) => {
  const tailwind = useTailwind()
  const { t } = useTranslation()
  
  return (
    <TouchableOpacity
      style={[
        tailwind(`
          bg-white-200
          dark:bg-black-200
          rounded-2xl
          ${big ? 'p-3' : 'p-2'}
          flex-row
          items-center
          mb-3
        `),
        big && {
          shadowColor: tailwind('text-black-400'),
          shadowOffset: {
            width: 1,
            height: 2
          },
          shadowOpacity: 0.12,
          shadowRadius: 3
        }
      ]}
      activeOpacity={0.8}
      {...rest}
    >
      <View>
        <Image
          source={icon}
          style={
            tailwind(`
              ${big ? 'h-32' : 'h-20'}
              ${big ? 'w-32' : 'w-20'}
            `)
          }
        />
      </View>
      <View style={tailwind('ml-2.5')}>
        <Text style={tailwind('text-xl font-bold -mb-1')}>Azuria</Text>
        <Text style={tailwind('text-base font-light text-grey-400')}>10 Octobre - Nice</Text>
        <View style={tailwind('flex-row items-center')}>
          <Feather name='user' color={colors.green} size={16} />
          <Text><Text style={tailwind('text-green-400')}>32</Text>/64</Text>
        </View>
        <View style={tailwind('mt-2.5 flex-row items-center')}>
          <View style={tailwind('flex-row mr-1')}>
            <Image source={zss} style={{ height: 15, width: 15, borderRadius: 8 }} resizeMode="cover" />
            <Image source={zss} style={{ height: 15, width: 15, borderRadius: 8, marginLeft: -5 }} resizeMode="cover" />
            <Image source={zss} style={{ height: 15, width: 15, borderRadius: 8, marginLeft: -5 }} resizeMode="cover" />
          </View>
          <Text style={tailwind('text-base font-light text-grey-400')}>{t('andOthers', { amount: 40 })}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}