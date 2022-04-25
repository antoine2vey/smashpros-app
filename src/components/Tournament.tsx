import { Image, TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { colors } from "../colors"
import { Text } from "./Text"
import Feather from '@expo/vector-icons/Feather'
import { useTailwind } from "tailwind-rn/dist"
import { useTranslation } from "react-i18next"
import dayjs from 'dayjs'
import { useCallback, useMemo } from "react"
import { ProgressiveImage } from "./ProgressiveImage"

type Props = TouchableOpacityProps & {
  big?: boolean
  tournament: any
}

export const Tournament = ({
  big,
  tournament,
  ...rest
}: Props) => {
  const tailwind = useTailwind()
  const { t } = useTranslation()

  const firstThreeParticipants = useMemo(() => {
    if (tournament) {
      return [
        tournament.participants.edges[0],
        tournament.participants.edges[1],
        tournament.participants.edges[2]
      ].filter(Boolean)
    }
  }, [tournament])

  const restOfParticipants = useMemo(() => {
    if (tournament) {
      return tournament.participants.totalCount - 3
    }
  }, [tournament])

  const maxBracketSize = useMemo(() => {
    let minBracketSize = 8

    while (minBracketSize < tournament.num_attendees) {
      minBracketSize *= 2
    }

    return minBracketSize
  }, [tournament])
  
  return (
    <TouchableOpacity
      style={[
        tailwind(`
          bg-white-400
          dark:bg-black-200
          rounded-2xl
          ${big ? 'p-3' : 'p-2'}
          flex-row
          items-center
          mb-3
        `),
        big && {
          shadowColor: tailwind('text-black-400'),
          shadowOffset: {
            width: 1,
            height: 2
          },
          shadowOpacity: 0.12,
          shadowRadius: 3
        }
      ]}
      activeOpacity={0.8}
      {...rest}
    >
      <>
        <ProgressiveImage
          source={{ uri: tournament.images[0] }}
          style={
            tailwind(`
              rounded-xl
              ${big ? 'h-32' : 'h-20'}
              ${big ? 'w-32' : 'w-20'}
            `)
          }
        />
      </>
      <View style={tailwind('flex-shrink ml-2.5 flex-1')}>
        <Text numberOfLines={1} style={tailwind('text-xl font-bold -mb-1 flex-shrink')}>{tournament.name}</Text>
        <Text style={tailwind('text-base font-light text-grey-400')}>{dayjs(tournament.start_at).format('DD MMMM')} - {tournament.city}</Text>
        <View style={tailwind('flex-row items-center')}>
          <Feather name='user' color={colors.green} size={16} />
          <Text><Text style={tailwind('text-green-400')}>{tournament.num_attendees}</Text>/{maxBracketSize}</Text>
        </View>
        {tournament.participants.edges.length > 0 && (
          <View style={tailwind('mt-2 flex-row items-center')}>
            <View style={tailwind('flex-row mr-1')}>
              {firstThreeParticipants!.map((edge, i) => (
                <Image
                  key={edge.cursor}
                  source={{ uri: edge.node.profile_picture }}
                  style={{ height: 20, width: 20, borderRadius: 10, marginLeft: i === 0 ? 0 : -5 }}
                  resizeMode="cover"
                />
              ))}
            </View>
            {restOfParticipants! > 0 ? (
              <Text style={tailwind('text-base font-light text-grey-400')}>{t('andOthers', { amount: restOfParticipants })}</Text>
            ) : (
              <Text style={tailwind('text-base font-light text-grey-400')}>et d'autres!</Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}