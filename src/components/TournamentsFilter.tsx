import { useFocusEffect } from '@react-navigation/native'
import { setStatusBarStyle, StatusBar, StatusBarStyle } from 'expo-status-bar'
import { forwardRef, useCallback, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'
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
import { CalendarList, DateData } from 'react-native-calendars'
import dayjs, { Dayjs } from 'dayjs'
import { useScheme } from '../hooks/useScheme'
import * as Location from 'expo-location'

type Props = {
  onValidation: (data: {
    latitude: number | null | undefined
    longitude: number | null | undefined
    radius: number | null
    startRange: string | null
    endRange: string | null
  }) => void
}

export const TournamentsFilter = forwardRef<BottomSheetModal, Props>(
  ({ onValidation }, ref) => {
    const { shadow } = useColors()
    const { bottom } = useSafeAreaInsets()
    const tailwind = useTailwind()
    const { width } = useWindowDimensions()
    const { colors, mediumShadow } = useColors()
    const { scheme } = useScheme()
    const [startRange, setStartRange] = useState<string | null>(null)
    const [endRange, setEndRange] = useState<string | null>(null)
    const [longitude, setLongitude] = useState<number | null>()
    const [latitude, setLatitude] = useState<number | null>()
    const [radius, setRadius] = useState<number | null>(50)
    const [locationSelected, setLocationSelected] = useState<boolean>(false)
    const [dates, setDates] = useState<{
      [date: string]: {
        color: string
        endingDay?: boolean
        startingDay?: boolean
      }
    }>()
    const DEFAULT_TEXT_STYLE = {
      color: colors.green2,
      customTextStyle: tailwind('font-bold text-white-400')
    }

    const generateDates = useCallback((startDate: Dayjs, endDate: Dayjs) => {
      let now = startDate.clone()
      let dates = []

      while (now.isSame(endDate) || now.isBefore(endDate)) {
        if (!now.isSame(startDate)) {
          dates.push(now.format('YYYY-MM-DD'))
        }

        now = now.add(1, 'days')
      }

      return dates.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: {
            ...DEFAULT_TEXT_STYLE
          }
        }),
        {}
      )
    }, [])

    const handleDayPress = useCallback(
      ({ dateString }: DateData) => {
        if (startRange && !endRange) {
          // We are selecting end range, do calculation
          const start = dayjs(startRange)
          const end = dayjs(dateString)
          const isBackwards = end.isBefore(start)
          let dates = {}

          if (startRange === dateString) {
            setEndRange(startRange)
            return
          }

          if (isBackwards) {
            // User did backward selection
            dates = generateDates(end, start)
          } else {
            dates = generateDates(start, end)
          }

          setDates((prevDates) => {
            return {
              ...prevDates,
              ...dates,
              // Update UI accordingly
              [startRange]: {
                startingDay: !isBackwards,
                endingDay: isBackwards,
                ...DEFAULT_TEXT_STYLE
              },
              [dateString]: {
                startingDay: isBackwards,
                endingDay: !isBackwards,
                ...DEFAULT_TEXT_STYLE
              }
            }
          })

          setEndRange(dateString)
        } else {
          // No date selected OR we are selecting a new range
          setDates({
            [dateString]: {
              startingDay: true,
              endingDay: true,
              ...DEFAULT_TEXT_STYLE
            }
          })

          setStartRange(dateString)
          setEndRange(null)
        }
      },
      [startRange, endRange]
    )

    const clearCalendar = useCallback(() => {
      setStartRange(null)
      setEndRange(null)
      setDates({})
    }, [])

    const resetFilters = useCallback(() => {
      clearCalendar()

      setLatitude(null)
      setLongitude(null)
      setRadius(null)
      setLocationSelected(false)
    }, [])

    const onLocationPress = useCallback(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status === Location.PermissionStatus.GRANTED) {
        const { coords } = await Location.getCurrentPositionAsync()

        setLatitude(coords.latitude)
        setLongitude(coords.longitude)
        setLocationSelected(true)
      }
    }, [])

    const search = useCallback(() => {
      ref.current.dismiss()

      onValidation({
        longitude,
        latitude,
        radius,
        startRange: startRange ? dayjs(startRange).format() : null,
        endRange: endRange ? dayjs(endRange).format() : null
      })
    }, [longitude, latitude, radius, startRange, endRange])

    const locations = [
      {
        lat: 48.8566,
        lng: 2.3522,
        radius: 5,
        name: 'Paris'
      },
      {
        lat: 48.8566,
        lng: 2.3522,
        radius: 5,
        name: 'Paris'
      },
      {
        lat: 48.8566,
        lng: 2.3522,
        radius: 5,
        name: 'Paris'
      },
      {
        lat: 48.8566,
        lng: 2.3522,
        radius: 5,
        name: 'Paris'
      }
    ]

    return (
      <BottomSheetModal
        backgroundStyle={tailwind('bg-white-400 dark:bg-black-400')}
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
        handleIndicatorStyle={tailwind('bg-black-400 dark:bg-white-400')}
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
        <BottomSheetScrollView contentContainerStyle={tailwind('px-4')}>
          <Text style={tailwind('text-xl font-semibold mt-5')}>Places</Text>
          <TouchableOpacity
            style={tailwind('flex-row items-center')}
            onPress={onLocationPress}
          >
            <Ionicons
              name="location-outline"
              size={18}
              color={locationSelected ? colors.green2 : colors.black}
            />
            <Text
              style={[
                tailwind('text-sm ml-1'),
                locationSelected && tailwind('text-green-300 font-bold')
              ]}
            >
              Own location
            </Text>
          </TouchableOpacity>
          <ScrollView
            horizontal
            style={tailwind('-mx-5 py-2')}
            contentContainerStyle={tailwind('px-5')}
            decelerationRate={0}
            snapToInterval={128}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
          >
            {locations.map((_, i) => (
              <View
                key={i}
                style={[
                  tailwind('w-32 h-32 bg-white-400 mr-2 rounded-xl'),
                  mediumShadow
                ]}
              />
            ))}
          </ScrollView>

          <View>
            <Text style={tailwind('text-xl font-semibold mt-5')}>Radius</Text>
          </View>

          <View style={tailwind('flex-row justify-between items-center  mt-5')}>
            <Text style={tailwind('text-xl font-semibold')}>Dates</Text>
            <TouchableOpacity
              disabled={!startRange && !endRange}
              onPress={clearCalendar}
            >
              <Text
                style={[
                  tailwind('text-green-300 text-sm'),
                  !startRange && !endRange && tailwind('opacity-50')
                ]}
              >
                Clear dates
              </Text>
            </TouchableOpacity>
          </View>

          <CalendarList
            horizontal
            pagingEnabled
            calendarWidth={width}
            style={tailwind('-mx-4 bg-white-400 dark:bg-black-400')}
            markingType="period"
            onDayPress={handleDayPress}
            markedDates={dates}
            minDate={dayjs().format('YYYY-MM-DD')}
            calendarStyle={tailwind('bg-white-400 dark:bg-black-400')}
            contentContainerStyle={tailwind('bg-white-400 dark:bg-black-400')}
            theme={{
              calendarBackground:
                scheme === 'dark' ? colors.black2 : colors.fullwhite,
              textDisabledColor:
                scheme === 'dark' ? '#2d4150' : colors.lightgrey,
              dayTextColor: scheme === 'dark' ? colors.white : colors.black,
              monthTextColor: scheme === 'dark' ? colors.white : colors.black
            }}
          />
        </BottomSheetScrollView>
        <View
          style={[
            tailwind(
              'border-t border-t-grey-300 dark:border-t-black-200 p-4 flex-row justify-between items-center'
            ),
            { marginBottom: bottom }
          ]}
        >
          <TouchableOpacity onPress={resetFilters}>
            <Text style={tailwind('text-sm underline')}>Clear filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={tailwind('bg-green-300 p-2 px-4 rounded')}
            onPress={search}
          >
            <Text style={tailwind('font-semibold text-white-400')}>Search</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    )
  }
)
