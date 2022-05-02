import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useRef } from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { MoneymatchRouteProps, MoneymatchScreenNavigateProp } from '../../App'
import { Text } from '../components/Text'
import { useColors } from '../hooks/useColors'

export const Moneymatches = () => {
  const tailwind = useTailwind()
  const { navigate } = useNavigation<MoneymatchScreenNavigateProp>()
  const { shadow } = useColors()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
      <ScrollView contentContainerStyle={tailwind('p-2')}>
        <TouchableOpacity onPress={() => navigate('CreateMoneymatch')}>
          <Text>ok</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomSheetModal
        backgroundStyle={tailwind('bg-white-300 dark:bg-black-300')}
        snapPoints={['75%']}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            {...props}
          />
        )}
        handleIndicatorStyle={tailwind('bg-black-300 dark:bg-white-300')}
        ref={bottomSheetModalRef}
        style={shadow}
      >
        <BottomSheetScrollView>
          <Text>ok</Text>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </SafeAreaView>
  )
}
