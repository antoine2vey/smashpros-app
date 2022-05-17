import { useFocusEffect } from '@react-navigation/native'
import { setStatusBarStyle, StatusBar, StatusBarStyle } from 'expo-status-bar'
import { forwardRef, useCallback, useState } from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { AnimatedStatusBar } from './AnimatedStatusBar'
import { Ionicons } from '@expo/vector-icons'
import { Text } from './Text'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import { useColors } from '../hooks/useColors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {}

export const TournamentsFilter = forwardRef<BottomSheetModal, Props>(
  ({}, ref) => {
    const { shadow } = useColors()
    const { bottom } = useSafeAreaInsets()
    const tailwind = useTailwind()

    return (
      <BottomSheetModal
        backgroundStyle={tailwind('bg-white-300 dark:bg-black-300')}
        snapPoints={['90%']}
        onDismiss={() => {}}
        handleComponent={() => null}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            {...props}
          />
        )}
        handleIndicatorStyle={tailwind('bg-black-300 dark:bg-white-300')}
        ref={ref}
        style={shadow}
      >
        <View
          style={tailwind(
            'border-b border-b-grey-300 dark:border-b-black-200 p-4 relative'
          )}
        >
          <TouchableOpacity
            style={tailwind(
              'justify-center px-3 absolute top-0 left-0 bottom-0 z-10'
            )}
            onPress={() => ref.current.dismiss()}
          >
            <Ionicons name="close-outline" size={24} color="black" />
          </TouchableOpacity>
          <View style={tailwind('items-center')}>
            <Text style={tailwind('text-sm font-semibold')}>Filters</Text>
          </View>
        </View>
        <BottomSheetScrollView contentContainerStyle={tailwind('p-4')}>
          <Text style={tailwind('text-xl font-semibold mt-5')}>Places</Text>
          <ScrollView horizontal>
            {/**
             * north france: lat/lng/104.60
             */}
            <Text>ok</Text>
            <Text>ok</Text>
            <Text>ok</Text>
            <Text>ok</Text>
            <Text>ok</Text>
            <Text>ok</Text>
            <Text>ok</Text>
          </ScrollView>

          <Text style={tailwind('text-xl font-semibold mt-5')}>Dates</Text>
        </BottomSheetScrollView>
        <View
          style={[
            tailwind('border-t border-t-grey-300 dark:border-t-black-200 p-4'),
            { marginBottom: bottom }
          ]}
        >
          <TouchableOpacity>
            <Text style={tailwind('text-sm underline')}>Clear filters</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    )
  }
)
