import { View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { Placeholder, TextPlaceholder } from './GenericPlaceholders'

export const ParticipantPlaceholder: React.FC = () => {
  const tailwind = useTailwind()

  return (
    <View
      style={tailwind(
        'flex-row flex p-1 mt-2 bg-white-300 dark:bg-black-300 rounded-xl'
      )}
    >
      <Placeholder itemStyle={tailwind('w-16 h-16 rounded-xl')} />
      <View style={tailwind('ml-2')}>
        <TextPlaceholder style={tailwind('w-24')} />
        <TextPlaceholder style={tailwind('w-24')} />
      </View>
    </View>
  )
}
