import { useRoute } from "@react-navigation/native"
import { useCallback, useMemo } from "react"
import { FlatList, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { RootRouteProps } from "../../App"
import { HeroScroll } from "../components/HeroScroll"
import { ProgressiveImage } from "../components/ProgressiveImage"
import { Text } from "../components/Text"
import { CrewQuery, CrewQueryResult, MakeOptional, RoleEnum, useCrewQuery, User } from "../generated/graphql"

export const CrewScreen: React.FC = () => {
  const tailwind = useTailwind()
  const { params } = useRoute<RootRouteProps<'Crew'>>()
  const { data } = useCrewQuery({
    variables: {
      id: params?.id
    }
  })

  const isCrewAdmin = useMemo(() => {
    return (
      data?.crew !== null && // If crew exists
      data?.crew?.id === data?.user?.crew?.id && // If crew is user's one
      data?.crew?.admin.id === data?.user?.id && // If crew admin is the user
      data?.user?.roles.some(role => role.name === RoleEnum.CrewAdmin) // If user has CREW_ADMIN role
    )
  }, [data])

  const crewAdmin = useCallback((user: User) => {
    return user.id === data?.crew?.admin.id
  }, [data])

  return (
    <HeroScroll<User>
      background={{ uri: data?.crew?.banner }}
      data={data?.crew?.members}
      keyExtractor={item => item.id}
      ListHeaderComponent={(
        <View>
          <ProgressiveImage
            source={{ uri: data?.crew?.icon }}
            style={tailwind('w-28 h-28 rounded-xl mb-1 bg-white-200 dark:bg-black-200')}
            resizeMode="cover"
          />
          <Text style={tailwind('text-3xl font-bold')}>{data?.crew?.name}</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View key={item.id}>
          <Text>{item.tag}</Text>
        </View>
      )}
    />
  )
}