import { StatusBar, StatusBarStyle } from 'expo-status-bar'
import { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  FlatListProps,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn/dist'
import { useScheme } from '../hooks/useScheme'
import { ProgressiveImage } from './ProgressiveImage'

type Props = {
  background: ImageSourcePropType
}

export function HeroScroll<T>({
  background,
  ...props
}: Props & FlatListProps<T>): JSX.Element {
  const { width, height } = useWindowDimensions()
  const { top } = useSafeAreaInsets()
  const { scheme } = useScheme()
  const [statusBarScheme, setStatusBarScheme] = useState<StatusBarStyle>()
  const tailwind = useTailwind()

  useEffect(() => {
    setStatusBarScheme('light')
  }, [])

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = height / 6 - Math.max(top, 10)
      const { y } = e.nativeEvent.contentOffset

      if (scheme === 'dark') {
        setStatusBarScheme('light')
      } else {
        if (y > offset) {
          setStatusBarScheme('dark')
        } else {
          setStatusBarScheme('light')
        }
      }
    },
    [scheme]
  )

  return (
    <View style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
      <StatusBar style={statusBarScheme} />
      <ProgressiveImage
        source={background}
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
          tailwind(
            'bg-white-300 dark:bg-black-300 absolute bottom-0 left-0 right-0'
          )
        ]}
      />

      <FlatList<T>
        scrollEventThrottle={16}
        onScroll={onScroll}
        contentContainerStyle={[
          {
            marginTop: height / 6
          },
          tailwind('p-3 bg-white-300 dark:bg-black-300 rounded-t-3xl')
        ]}
        // Sets padding
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{
          paddingBottom: height / 6
        }}
        {...props}
      />
    </View>
  )
}
