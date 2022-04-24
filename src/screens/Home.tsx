import { gql, useQuery } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { HomeScreenNavigateProp } from "../../App"
import { Crew } from "../components/Crew"
import { Text } from "../components/Text"
import { Tournament } from "../components/Tournament"

const TOURNAMENTS = gql`
  query Tournaments($cursor: String) {
    tournaments(first: 10, after: $cursor) {
      edges {
        cursor
        node {
          id
          name
          city
          num_attendees
          start_at
          images
          participants(first: 3) {
            edges {
              cursor
              node {
                id
                tag
                profile_picture
              }
            }
            totalCount
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    crew {
      id
    }
    crews {
      banner
      icon
      id
      name
    }
  }
`

export const Home = () => {
  const { navigate } = useNavigation<HomeScreenNavigateProp>()
  const tailwind = useTailwind()
  const { t } = useTranslation()
  const {data, error, loading, fetchMore} = useQuery(TOURNAMENTS)
  const pageInfo = data?.tournaments.pageInfo

  return (
    <FlatList
      style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}
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

          {!data?.crew && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tailwind('mb-5')}>
              {data?.crews.map((crew) => (
                <Crew key={crew.id} crew={crew} />
              ))}
            </ScrollView>
          )}

          <Text style={tailwind('text-4xl font-bold')}>{t('tournaments')}</Text>
          <View style={tailwind('bg-white-300 dark:bg-black-300 pb-1')}>
            <Text style={tailwind('text-xl')}>
              {t('nextTournament')} - <Text style={tailwind('font-bold')}>3 {t('days')}</Text>
            </Text>
          </View>

          {data?.tournaments.edges.length && (
            <View style={tailwind('mt-2.5')}>
              <Tournament
                tournament={data?.tournaments.edges[0].node}
                big
                onPress={async () => {
                  navigate('Tournament', { id: data?.tournaments.edges[0].node.id })
                }}
              /> 
            </View>
          )}

          <View style={tailwind('bg-white-300 dark:bg-black-300 pb-1 mt-2.5')}>
            <Text style={tailwind('text-xl')}>{t('upcomingTournaments')}</Text>
          </View>
        </>
      )}
      data={data?.tournaments.edges}
      keyExtractor={edge => edge.cursor}
      ListFooterComponent={(
        <ActivityIndicator
          animating
        />
      )}
      onEndReachedThreshold={0.4}
      onEndReached={() => {
        const {} = fetchMore({
          variables: {
            cursor: pageInfo.endCursor
          }
        })
      }}
      renderItem={({ item: edge, index }) => {
        if (index === 0) {
          return null
        }

        return (
          <Tournament
            key={edge.cursor}
            tournament={edge.node}
            onPress={() => {
              navigate('Tournament', { id: edge.node.id })
            }}
          />
        )
      }}
    />
  )
}