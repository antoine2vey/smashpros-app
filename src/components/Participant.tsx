import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { CrewMemberFragment, CrewUpdateActionEnum } from "../generated/graphql"
import { ProgressiveImage } from "./ProgressiveImage"
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons"
import { Text } from "./Text"
import { colors } from "../colors"

type Props = TouchableOpacityProps & {
  participant: CrewMemberFragment
  showAdminTools?: boolean
  kickMember?: () => void
  updateMember?: (choice: CrewUpdateActionEnum, id: string) => void
}

export const Participant: React.FC<Props> = ({ updateMember, kickMember, participant, showAdminTools, ...props }) => {
  const tailwind = useTailwind()

  return (
    <TouchableOpacity
      style={tailwind('flex-row flex p-1 mt-2 bg-white-300 dark:bg-black-300 rounded-xl')}
      activeOpacity={0.9}
      {...props}
    >
      <ProgressiveImage source={{ uri: participant?.profile_picture! }} style={tailwind('w-16 h-16 rounded-xl')} />
      <View style={tailwind('ml-2 flex-1')}>
        <Text style={tailwind('font-semibold')}>
          {participant?.crew && (
            <Text style={tailwind('font-bold text-green-300')}>{participant?.crew.prefix} | </Text>
          )}
          {participant?.tag}
        </Text>
        <View style={tailwind('flex-row mt-1')}>
          {participant?.characters.map(character => (
            <ProgressiveImage
              key={character.id}
              source={{ uri: character.picture }}
              resizeMode="center"
              style={tailwind('w-6 h-6 -ml-1')}
            />
          ))}
        </View>
      </View>
      <View style={tailwind('flex-row items-center')}>
        {showAdminTools && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={kickMember}
          >
            <MaterialCommunityIcons name="account-remove" size={24} color={colors.red} />
          </TouchableOpacity>
        )}
        {updateMember && (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => updateMember(CrewUpdateActionEnum.Accept, participant.id)}
            >
              <Ionicons name="checkmark" size={24} color={colors.green2} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => updateMember(CrewUpdateActionEnum.Deny, participant.id)}
            >
              <Ionicons name="close" size={24} color={colors.red} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}