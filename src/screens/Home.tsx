import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  View
} from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { HomeScreenNavigateProp } from '../../App'
import { colors } from '../colors'
import { Crew } from '../components/Crew'
import { Text } from '../components/Text'
import { Tournament } from '../components/Tournament'
import { useHomeQuery, useNextTournamentQuery } from '../generated/graphql'

export const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { navigate } = useNavigation<HomeScreenNavigateProp>()
  const tailwind = useTailwind()
  const { t } = useTranslation()
  const { data, loading, fetchMore, refetch } = useHomeQuery()
  const { data: nextTournamentData } = useNextTournamentQuery()
  const pageInfo = data?.tournaments?.pageInfo

  return (
    <FlatList
      style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true)
            await refetch()
            setRefreshing(false)
          }}
          colors={[colors.white]}
          tintColor={colors.white}
          progressBackgroundColor={colors.white}
        />
      }
      refreshing={false}
      contentContainerStyle={tailwind('p-2')}
      ListHeaderComponent={() => (
        <>
          {!data?.crew && (
            <Text style={tailwind('text-4xl font-bold')}>Crews</Text>
          )}

          {!data?.crew && (
            <View style={tailwind('bg-white-300 dark:bg-black-300 pb-1')}>
              <Text style={tailwind('text-xl')}>{t('findCrew')}</Text>
            </View>
          )}

          {!data?.crew &&
            (data?.crews?.length ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={tailwind('mb-5')}
              >
                {data?.crews?.map((crew) => (
                  <Crew
                    key={crew?.id}
                    image={crew?.icon}
                    crew={crew}
                    onPress={() => navigate('Crew', { id: crew?.id })}
                  />
                ))}
              </ScrollView>
            ) : (
              <Text style={tailwind('text-grey-400 mb-5')}>
                Looks like no crew has been created yet! You can create one here
                one?
              </Text>
            ))}

          <Text style={tailwind('text-4xl font-bold')}>{t('tournaments')}</Text>
          <View style={tailwind('bg-white-300 dark:bg-black-300 pb-1')}>
            <Text style={tailwind('text-xl')}>
              {t('nextTournament')}
              {nextTournamentData?.user?.nextTournament && (
                <Text style={tailwind('font-bold')}> - 3 {t('days')}</Text>
              )}
            </Text>
          </View>

          {nextTournamentData?.user?.nextTournament ? (
            <View style={tailwind('mt-2.5')}>
              <Tournament
                tournament={nextTournamentData?.user?.nextTournament}
                big
                onPress={async () => {
                  navigate('Tournament', {
                    id: nextTournamentData?.user?.nextTournament?.id
                  })
                }}
              />
            </View>
          ) : (
            <Text style={tailwind('text-grey-400')}>
              You are not registered to any tournament, maybe try to register to
              one below?
            </Text>
          )}

          <View style={tailwind('bg-white-300 dark:bg-black-300 pb-1 mt-2.5')}>
            <Text style={tailwind('text-xl')}>{t('upcomingTournaments')}</Text>
          </View>
        </>
      )}
      data={data?.tournaments?.edges}
      keyExtractor={(edge, i) => edge?.cursor || i.toString()}
      ListFooterComponent={<ActivityIndicator animating />}
      onEndReachedThreshold={0.4}
      onEndReached={() => {
        fetchMore({
          variables: {
            cursor: pageInfo?.endCursor
          }
        })
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
  )
}
