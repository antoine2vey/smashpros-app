import { forwardRef, useCallback, useState } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
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
import { useZonesQuery, Zone } from '../generated/graphql'
import * as RNLocalize from 'react-native-localize'

type Props = {
  onValidation: (data: {
    startRange: string | null
    endRange: string | null
    zone: Zone | null
  }) => void
}

export const TournamentsFilter = forwardRef<BottomSheetModal, Props>(
  ({ onValidation }, ref) => {
    const countryCode = RNLocalize.getCountry()
    const { shadow } = useColors()
    const { bottom } = useSafeAreaInsets()
    const tailwind = useTailwind()
    const { width } = useWindowDimensions()
    const { colors, mediumShadow, base } = useColors()
    const { data } = useZonesQuery({ variables: { countryCode } })
    const [selectedZone, setZone] = useState<Zone | null>(null)
    const { scheme } = useScheme()
    const [startRange, setStartRange] = useState<string | null>(null)
    const [endRange, setEndRange] = useState<string | null>(null)
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

          if (startRange === dateString) {
            // In case user press same date
            return setEndRange(startRange)
          }

          if (isBackwards) {
            // User did backward selection
            setEndRange(null)
            setStartRange(dateString)

            return setDates({
              [dateString]: {
                startingDay: true,
                endingDay: true,
                ...DEFAULT_TEXT_STYLE
              }
            })
          }

          const dates = generateDates(start, end)
          setEndRange(dateString)
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
      setZone(null)
      clearCalendar()
    }, [])

    const search = useCallback(() => {
      ref.current.dismiss()

      onValidation({
        zone: selectedZone,
        startRange: startRange ? dayjs(startRange).format() : null,
        endRange: endRange ? dayjs(endRange).format() : null
      })
    }, [selectedZone, startRange, endRange])

    const onZonePress = useCallback((zone: Zone | null) => {
      setZone(zone)
    }, [])

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
            <Ionicons name="close-outline" size={24} color={base} />
          </TouchableOpacity>
          <View style={tailwind('items-center')}>
            <Text style={tailwind('text-sm font-semibold')}>Filters</Text>
          </View>
        </View>
        <BottomSheetScrollView contentContainerStyle={tailwind('px-4')}>
          <Text style={tailwind('text-xl font-semibold mt-5')}>Places</Text>
          <ScrollView
            horizontal
            style={tailwind('-mx-5 py-2')}
            contentContainerStyle={tailwind('px-5')}
            showsHorizontalScrollIndicator={false}
          >
            {data?.zones?.map((zone) => (
              <TouchableOpacity
                onPress={() => onZonePress(zone)}
                key={zone?.id}
              >
                <View
                  style={[
                    tailwind(
                      'w-32 h-32 bg-white-400 dark:bg-black-200 mr-2 rounded-xl border border-transparent'
                    ),
                    selectedZone?.id === zone?.id &&
                      tailwind('border-green-300'),
                    mediumShadow
                  ]}
                />
                <Text
                  style={tailwind('mt-1 font-bold w-32 flex')}
                  numberOfLines={1}
                >
                  {zone?.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

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
