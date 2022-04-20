import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { StatusBar } from "expo-status-bar"
import { useCallback, useRef, useState } from "react"
import { useTranslation } from 'react-i18next'
import { ScrollView, Image, TouchableOpacity, useWindowDimensions, View, SafeAreaView, useColorScheme, NativeScrollEvent, NativeSyntheticEvent } from "react-native"
import { useTailwind } from 'tailwind-rn/dist'
import { Backdrop } from '../components/Backdrop'
import { CharacterPicker } from "../components/CharacterPicker"
import { Text } from "../components/Text"

const banner = require('../assets/banner.png')
const icon = require('../assets/azuria.png')

export const TournamentsDetail = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const [characters, setCharacters] = useState<string[]>([])
  const { width, height } = useWindowDimensions()
  const tailwind = useTailwind()
  const { t } = useTranslation()
  const defaultScheme = useColorScheme() 
  const [scheme, setScheme] = useState(defaultScheme)

  const onValidation = useCallback(() => {
    alert(characters.join('/'))
  }, [characters])

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = height / 6 - 25
    const { y } = e.nativeEvent.contentOffset

    if (scheme === 'dark') {
      if (y < offset) {
        setScheme('light')
      } else {
        return
      }
    }

    if (y > offset) {
      setScheme('dark')
    }
  }, [scheme])

  return (
    <>
      <StatusBar style={scheme || 'light'} /> 
      <Image
        source={banner}
        style={[
          {
            width,
            height: height / 3
          },
          tailwind('absolute top-0 left-0')
        ]}
      />
      <View style={tailwind('bg-black-400 opacity-50 absolute inset-0')} /> 
      <View
        style={[
          { height: height / 3 },
          tailwind('bg-white-300 dark:bg-black-300 absolute bottom-0 left-0 right-0')
        ]}
      />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={onScroll}
        contentContainerStyle={[
          {
            marginTop: height / 6,
            paddingBottom: height / 6,
          },
          tailwind('flex-1 p-3 bg-white-300 dark:bg-black-300 rounded-t-3xl')
        ]}
      >
        <View style={tailwind('flex-row items-center')}>
          <View style={tailwind('mr-2')}>
            <Image
              source={icon}
              style={tailwind('w-28 h-28')}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text style={tailwind('text-base text-green-400 font-bold')}>Live</Text>
            <Text style={tailwind('text-xl font-bold -my-1')}>Azuria: Edition Start</Text>
            <Text style={tailwind('text-base font-light text-grey-400')}>Nice</Text>
          </View>
        </View>

        <View style={tailwind('mt-3')}>
          <Text style={tailwind('text-xl')}>{t('findWay')}</Text>
        </View>

        <View style={tailwind('mt-3 flex-row justify-between items-center')}>
          <Text style={tailwind('text-xl')}>{t('participants')} <Text style={tailwind('text-green-400')}>(64)</Text></Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => bottomSheetModalRef.current?.present()}>
            <Text style={tailwind('text-base text-green-400')}>{t('filters')}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      
      <CharacterPicker
        ref={bottomSheetModalRef}
        characters={characters}
        setCharacters={setCharacters}
        onValidation={onValidation}
      />
    </>
  )
}
