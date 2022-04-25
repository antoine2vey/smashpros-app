import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"
import dayjs from "dayjs"
import { useEffect } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { HomeScreenNavigateProp, RootRouteProps } from "../../App"
import { colors } from "../colors"
import { ProgressiveImage, ProgressiveImageBackground } from "../components/ProgressiveImage"
import { Text } from "../components/Text"
import { useProfileQuery } from "../generated/graphql"
import Ionicons from '@expo/vector-icons/Ionicons'
import { Crew } from "../components/Crew"

export const UserProfile = () => {
  const tailwind = useTailwind()
  const { params } = useRoute<RootRouteProps<'UserProfile'>>()
  const { navigate, goBack, popToTop } = useNavigation<HomeScreenNavigateProp>()
  const { data } = useProfileQuery({
    variables: {
      id: params.id
    }
  })

  return (
    <ScrollView
      style={tailwind('bg-white-300 dark:bg-black-300')}
      contentContainerStyle={tailwind('px-5 py-7')}
    >
      <View style={tailwind('mb-3 flex-row justify-between items-start')}>
        <ProgressiveImage
          source={{ uri: data?.user?.profile_picture! }}
          style={tailwind('h-32 w-32 rounded-2xl')}
        />

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={goBack}
        >
          <Ionicons
            name="close"
            size={24}
            color={colors.green2}
          />
        </TouchableOpacity>
      </View>

      <View style={tailwind('flex-row flex-wrap items-center')}>
        <Text style={tailwind('text-3xl font-medium')}>
          {data?.user?.crew && <Text style={tailwind('text-3xl font-bold text-green-300')}>{data.user.crew.prefix} | </Text>}
          {data?.user?.tag}
        </Text>
        <View style={tailwind('flex-row mt-2 ml-4')}>
          <Ionicons name="logo-twitch" size={22} color="#6441a5" style={tailwind('mr-1')} />
          <Ionicons name="logo-twitter" size={22} color="#1DA1F2" style={tailwind('mr-1')} />
        </View>
      </View>
      <Text style={tailwind('text-sm text-grey-400')}>Inscrit depuis {dayjs(data?.user?.created_at).fromNow(true)}</Text>
      <Text style={tailwind('text-sm text-grey-400')}>Vu pour la dernière fois {dayjs(data?.user?.updated_at).fromNow()}</Text>

      <View style={tailwind('flex-row')}>
        {data?.user?.crew && (
          <View style={tailwind('flex-1 mr-5')}>
            <Text style={tailwind('text-xl mt-5 font-bold')}>Crew</Text>
            <Crew crew={data.user.crew!} full />
          </View>
        )}

        <View style={tailwind('flex-1')}>
          <Text style={tailwind('text-xl mt-5 font-bold')}>Characters</Text>
          <View style={tailwind('flex-row flex-wrap mt-2')}>
            {data?.user?.characters.map(character => (
              <ProgressiveImage
                source={{ uri: character.picture }}
                key={character.id}
                resizeMode="cover"
                style={tailwind('w-12 h-12')}
              />
            ))}
          </View>
        </View>
      </View>

      <Text style={tailwind('text-xl mt-5 font-bold')}>Next tournaments</Text>
      {data?.user?.tournaments.length! > 0 ? (
        <ScrollView horizontal style={tailwind('-mx-5 pl-5 flex-row flex-wrap mt-2')}>
          {data?.user?.tournaments.map(tournament => (
            <TouchableOpacity
              key={tournament.id}
              onPress={() => {
                popToTop()
                navigate('Tournament', { id: tournament.id })
              }}
              activeOpacity={0.9}
            >
              <ProgressiveImageBackground
                source={{ uri: tournament.images[1] }}
                containerStyle={tailwind('h-48 w-28 rounded-xl mr-2')}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text style={tailwind('text-grey-400')}>Aucun tournoi en approche!</Text>
      )}

      <Text style={tailwind('text-xl mt-5 font-bold')}>Favorited tournaments</Text>
      {data?.user?.favorited_tournaments.length! > 0 ? (
        <ScrollView horizontal style={tailwind('-mx-5 pl-5 flex-row flex-wrap mt-2')}>
            {data?.user?.favorited_tournaments.map(tournament => (
              <TouchableOpacity
                key={tournament.id}
                onPress={() => {
                  popToTop()
                  navigate('Tournament', { id: tournament.id })
                }}
                activeOpacity={0.9}
              >
                <ProgressiveImageBackground
                  source={{ uri: tournament.images[1] }}
                  containerStyle={tailwind('h-48 w-28 rounded-xl mr-2')}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
        </ScrollView>
      ) : (
        <Text style={tailwind('text-grey-400')}>Aucun tournoi favori</Text>
      )}

    </ScrollView>
  )
}