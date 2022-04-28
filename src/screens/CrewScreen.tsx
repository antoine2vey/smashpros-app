import { useNavigation, useRoute } from "@react-navigation/native"
import { useCallback, useMemo, useRef } from "react"
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { HomeScreenNavigateProp, RootRouteProps } from "../../App"
import { HeroScroll } from "../components/HeroScroll"
import { Participant } from "../components/Participant"
import { ProgressiveImage } from "../components/ProgressiveImage"
import { Text } from "../components/Text"
import { CrewMemberFragment, CrewUpdateActionEnum, RoleEnum, useCrewQuery, useJoinCrewMutation, useKickMemberMutation, useLeaveCrewMutation, useTransferCrewOwnershipMutation, useUpdateMemberMutation } from "../generated/graphql"
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { gql, StoreObject } from "@apollo/client"
import BottomSheet, { BottomSheetBackdrop, BottomSheetHandle, BottomSheetModal } from "@gorhom/bottom-sheet"
import { useColors } from "../hooks/useColors"
import { Button } from "../components/Button"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const CrewScreen: React.FC = () => {
  const tailwind = useTailwind()
  const { navigate, goBack } = useNavigation<HomeScreenNavigateProp>()
  const { params } = useRoute<RootRouteProps<'Crew'>>()
  const [kick] = useKickMemberMutation()
  const [join] = useJoinCrewMutation()
  const [update] = useUpdateMemberMutation()
  const [leave] = useLeaveCrewMutation()
  const [transferOwnership] = useTransferCrewOwnershipMutation()
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["50%"], [])
  const { colors, shadow } = useColors()
  const { bottom } = useSafeAreaInsets()
  const { data } = useCrewQuery({
    variables: {
      id: params?.id
    }
  })

  const isAwaitingResponse = useMemo(() => {
    return data?.crew?.waiting_members.some(member => {
      return member.id === data.user?.id
    })
  }, [data])

  const isCrewAdmin = useMemo(() => {
    return (
      data?.crew !== null && // If crew exists
      data?.crew?.id === data?.user?.crew?.id && // If crew is user's one
      data?.crew?.admin.id === data?.user?.id && // If crew admin is the user
      data?.user?.roles.some(role => role.name === RoleEnum.CrewAdmin) // If user has CREW_ADMIN role
    )
  }, [data])

  const joinCrew = useCallback(async () => {
    if (data?.crew) {
      await join({
        variables: {
          id: data.crew.id
        }
      })
      bottomSheetRef.current?.dismiss()
    }
  }, [join, data])

  const leaveCrew = useCallback(async () => {
    if (data?.crew?.id) {
      const user = data.user
      await leave({
        update(cache, { data }) {
          if (data?.leaveCrew) {
            cache.modify({
              // Modify crew cache entry
              id: cache.identify(user!),
              fields: {
                // Delete crew
                crew() {
                  return null
                }
              }
            })
          }
        }
      })
      goBack()
    }
  }, [leave, data])

  const transferCrewOwnership = useCallback((to: string) => {
    transferOwnership({
      variables: {
        to
      }
    })
  }, [data])

  const updateMember = useCallback((action: CrewUpdateActionEnum, id: string) => {
    if (data?.crew?.id) {
      update({
        variables: {
          action,
          id
        },
        update(cache, { data }) {
          if (data?.updateMember) {
            cache.modify({
              // Modify crew cache entry
              id: cache.identify(data.updateMember),
              fields: {
                // Update waiting_members field by removing user we deleted
                waiting_members(existings: StoreObject[], { readField }) {
                  return existings.filter(ref => 
                    id !== readField('id', ref)
                  )
                }
              }
            })
          }
        }
      })
    }
  }, [data])

  const kickMember = useCallback((item: CrewMemberFragment) => {
    return kick({
      variables: {
        id: item.id
      },
      update(cache, { data }) {
        if (data?.kickMember) {
          const { id } = data.kickMember
          // Ref is updated, remove deleted user from crew
          cache.modify({
            // Modify crew cache entry
            id: cache.identify(item.crew!),
            fields: {
              // Update members field by removing user we deleted
              members(existings: StoreObject[], { readField }) {
                return existings.filter(ref => 
                  id !== readField('id', ref)
                )
              }
            }
          })
        }
      }
    })
  }, [kick, data])

  const membersWithoutLeader = useMemo(() => {
    return data?.crew?.members.filter(member => {
      return member.id !== data.crew?.admin.id
    })
  }, [data])

  return (
    <>
      <HeroScroll<CrewMemberFragment>
        background={{ uri: data?.crew?.banner }}
        data={membersWithoutLeader}
        keyExtractor={item => item.id}
        ListHeaderComponent={(
          <>
            <View style={tailwind('mb-5')}>
              <View style={tailwind('flex-row')}>
                <ProgressiveImage
                  source={{ uri: data?.crew?.icon }}
                  style={tailwind('w-28 h-28 rounded-xl mb-1 bg-white-200 dark:bg-black-200')}
                  resizeMode="cover"
                />
                <View style={tailwind('ml-2 flex-1 items-end')}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={tailwind('flex-row')}
                    onPress={() => bottomSheetRef.current?.present()}
                  >
                    <MaterialCommunityIcons name="cog" size={24} color={colors.green2} />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={tailwind('text-3xl font-bold')}>{data?.crew?.name}</Text>
            </View>

            {isAwaitingResponse && (
              <Text style={tailwind('text-green-300 -mt-2 mb-5')}>
                <Text style={tailwind('text-green-300 font-bold')}>{data?.crew?.admin.tag} </Text>
                has been noticed, you will receive an update if you have been getting accepted!
              </Text>
            )}

            {isCrewAdmin && (
              <View style={tailwind('mb-5')}>
                <Text style={tailwind('text-xl font-bold')}>Waiting members</Text>
                {data?.crew?.waiting_members.length ? (
                  <ScrollView>
                    {data.crew.waiting_members.map(member => (
                      <Participant
                        key={member.id}
                        participant={member}
                        showAdminTools={isCrewAdmin}
                        updateMember={updateMember}
                      />
                    ))}
                  </ScrollView>
                ) : (
                  <Text style={tailwind('text-grey-400')}>Nobody is awaiting</Text>
                )}
              </View>
            )}
            
            <View style={tailwind('mb-5')}>
              <View style={tailwind('flex-row items-center')}>
                <Text style={tailwind('text-xl font-bold mr-1')}>Leader</Text>
                <MaterialCommunityIcons name="crown-outline" color={colors.gold} size={28} />
              </View>
              <Participant
                participant={data?.crew?.admin!}
                onPress={() => navigate('UserProfile', { id: data?.crew?.admin.id })}
              />
            </View>

            <Text style={tailwind('text-xl font-bold')}>Members ({membersWithoutLeader?.length})</Text>
          </>
        )}
        renderItem={({ item }) => (
          <Participant
            participant={item}
            onPress={() => navigate('UserProfile', { id: item.id })}
            showAdminTools={isCrewAdmin}
            kickMember={() => kickMember(item)}
            transferOwnership={transferCrewOwnership}
          />
        )}
      />
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            {...props}
          />
        )}
        handleIndicatorStyle={tailwind('bg-black-300 dark:bg-white-300')}
        backgroundStyle={tailwind('bg-white-300 dark:bg-black-300')}
        style={shadow}
      >
        <View style={[
          tailwind('bg-white-300 dark:bg-black-300 flex-1 justify-end p-3'),
          { paddingBottom: Math.max(15, bottom) }
        ]}>
          <Text style={tailwind('text-xl font-bold')}>Settings</Text>
          <View>
            {!isAwaitingResponse && !data?.user?.crew && (
              <TouchableOpacity onPress={joinCrew}>
                <Text>Join this club</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={tailwind('flex-1 justify-end')}>
            {data?.user?.crew?.id === data?.crew?.id && (
              <Button
                text={`Leave ${data?.crew?.name}`}
                style={tailwind('bg-red-400 mb-2')}
                onPress={leaveCrew}
              />
            )}
            <Button
              text="Close"
              outlined
              onPress={() => bottomSheetRef.current?.dismiss()}
            />
          </View>
        </View>
      </BottomSheetModal>
    </>
  )
}