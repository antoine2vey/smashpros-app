import { useFocusEffect, useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn/dist'
import { HomeScreenNavigateProp } from '../../App'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../colors'
import { Crew } from '../components/Crew'
import { Text } from '../components/Text'
import { Tournament } from '../components/Tournament'
import {
  useNextTournamentQuery,
  useTournamentsQuery,
  Zone
} from '../generated/graphql'
import { useColors } from '../hooks/useColors'
import { StatusBar } from 'expo-status-bar'
import { AnimatedStatusBar } from '../components/AnimatedStatusBar'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { TournamentsFilter } from '../components/TournamentsFilter'

export const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { navigate } = useNavigation<HomeScreenNavigateProp>()
  const tailwind = useTailwind()
  const { t } = useTranslation()
  const { top } = useSafeAreaInsets()
  const { mediumShadow, base } = useColors()
  const { data, fetchMore, refetch } = useTournamentsQuery()
  const { data: nextTournamentData } = useNextTournamentQuery()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const [filters, setFilters] = useState<{
    zone: Zone | null
    start: string | null
    end: string | null
  }>()
  const pageInfo = data?.tournaments?.pageInfo
  const nextTournament = nextTournamentData?.user?.nextTournament

  return (
    <View style={tailwind('flex-1 bg-white-400 dark:bg-black-400')}>
      <AnimatedStatusBar />
      <View
        style={[
          tailwind(
            'px-5 pb-3 border-b border-b-grey-200 dark:border-b-black-200'
          ),
          { marginTop: Math.max(30, top) }
        ]}
      >
        <View
          style={[
            tailwind(
              'h-12 w-full bg-white-400 dark:bg-black-200 rounded-full flex-row items-center'
            ),
            mediumShadow
          ]}
        >
          <TouchableOpacity
            onPress={() => bottomSheetModalRef.current?.present()}
            style={tailwind(
              'pl-3 pr-2 self-stretch justify-center rounded-l-full'
            )}
          >
            <Ionicons name="search-outline" color={base} size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind('flex-1')}
            onPress={() => bottomSheetModalRef.current?.present()}
          >
            <Text style={tailwind('font-semibold -mb-0.5 text-sm')}>
              Filter tournaments
            </Text>
            <View style={tailwind('flex-row ')}>
              {filters?.zone ? (
                <Text style={tailwind('text-xs text-grey-400 mr-1')}>
                  {filters.zone.name} &bull;
                </Text>
              ) : (
                <Text style={tailwind('text-xs text-grey-400 mr-1')}>
                  Everywhere
                </Text>
              )}
              {filters?.start && (
                <Text style={tailwind('text-xs text-grey-400 mr-1')}>
                  {filters.start}
                </Text>
              )}
              {filters?.end && (
                <Text style={tailwind('text-xs text-grey-400')}>
                  au {filters.end}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={tailwind('')}
        refreshing={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tailwind('pt-2 px-5')}
        ListHeaderComponent={() => (
          <>
            <View style={tailwind('bg-white-400 dark:bg-black-400 pb-1')}>
              <Text style={tailwind('text-xl')}>
                {t('nextTournament')}
                {nextTournament && (
                  <Text style={tailwind('font-bold')}>
                    {' '}
                    - {dayjs(nextTournament.start_at).toNow(true)}{' '}
                  </Text>
                )}
              </Text>
            </View>

            {nextTournament ? (
              <View style={tailwind('mt-2.5')}>
                <Tournament
                  tournament={nextTournament}
                  big
                  onPress={async () => {
                    navigate('Tournament', {
                      id: nextTournament.id
                    })
                  }}
                />
              </View>
            ) : (
              <Text style={tailwind('text-grey-400')}>
                You are not registered to any tournament, maybe try to register
                to one below?
              </Text>
            )}

            <View
              style={tailwind('bg-white-400 dark:bg-black-400 pb-1 mt-2.5')}
            >
              <Text style={tailwind('text-xl')}>
                {t('upcomingTournaments')}
              </Text>
            </View>
          </>
        )}
        data={data?.tournaments?.edges}
        keyExtractor={(edge, i) => edge?.cursor || i.toString()}
        ListFooterComponent={
          <ActivityIndicator animating={pageInfo?.hasNextPage} />
        }
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          if (pageInfo?.hasNextPage) {
            fetchMore({
              variables: {
                cursor: pageInfo?.endCursor
              }
            })
          }
        }}
        renderItem={({ item: edge, index }) => {
          return (
            <Tournament
              key={edge?.cursor}
              tournament={edge?.node}
              onPress={() => {
                navigate('Tournament', { id: edge?.node?.id })
              }}
            />
          )
        }}
      />

      <TournamentsFilter
        ref={bottomSheetModalRef}
        onValidation={async (data) => {
          console.log(data)
          setFilters({
            zone: data.zone,
            start: data.startRange
              ? dayjs(data.startRange).format('DD/MM')
              : null,
            end: data.endRange ? dayjs(data.endRange).format('DD/MM') : null
          })

          await refetch({
            filters: {
              zone: data.zone?.id,
              startDate: data.startRange,
              endDate: data.endRange
            }
          })
        }}
      />
    </View>
  )
}
