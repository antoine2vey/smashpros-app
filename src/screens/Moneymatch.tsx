import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRoute } from '@react-navigation/native'
import { useRef } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useTailwind } from 'tailwind-rn/dist'
import { MoneymatchRouteProps } from '../../App'
import { BackButton } from '../components/BackButton'
import { CharacterPicker } from '../components/CharacterPicker'
import { ProgressiveImage } from '../components/ProgressiveImage'
import { Text } from '../components/Text'
import { MatchState, useMatchQuery } from '../generated/graphql'
import { useColors } from '../hooks/useColors'

export const Moneymatch: React.FC = () => {
  const tailwind = useTailwind()
  const { params } = useRoute<MoneymatchRouteProps<'Moneymatch'>>()
  const { lightShadow } = useColors()
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const { data, loading } = useMatchQuery({
    variables: {
      id: params.id
    }
  })

  const match = data?.match

  return (
    <View style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
      <View style={[lightShadow, tailwind('bg-green-300 rounded-b-3xl z-10')]}>
        <SafeAreaView>
          <View style={tailwind('px-3')}>
            <BackButton white />
          </View>
          <View style={tailwind('px-8 pt-5 pb-3 flex-row justify-between')}>
            <View style={tailwind('items-center')}>
              <View style={tailwind('relative')}>
                <ProgressiveImage
                  source={{ uri: match?.initiator?.profile_picture! }}
                  style={tailwind('w-16 h-16 rounded-full')}
                />
                <View
                  style={[
                    lightShadow,
                    tailwind(
                      'h-4 w-4 bg-green-300 rounded-full absolute top-0 right-0'
                    )
                  ]}
                />
              </View>
              <Text style={tailwind('font-bold h-7')}>
                {match?.initiator?.tag}
              </Text>
            </View>
            <View style={tailwind('flex-row items-center -mt-7')}>
              <Text style={tailwind('text-3xl font-bold')}>
                {match?.intiator_wins}
              </Text>
              <Text style={tailwind('text-4xl font-bold mx-2')}>:</Text>
              <Text style={tailwind('text-3xl font-bold')}>
                {match?.opponent_wins}
              </Text>
            </View>
            <View style={tailwind('items-center')}>
              <View style={tailwind('relative')}>
                <ProgressiveImage
                  source={{ uri: match?.opponent?.profile_picture! }}
                  style={tailwind('w-16 h-16 rounded-full')}
                />
                <View
                  style={[
                    lightShadow,
                    tailwind(
                      'h-4 w-4 bg-red-400 rounded-full absolute top-0 right-0'
                    )
                  ]}
                />
              </View>
              <Text style={tailwind('font-bold h-7')}>
                {match?.opponent?.tag}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <ScrollView
        style={tailwind('-mt-3 pt-3')}
        contentContainerStyle={tailwind('p-3')}
      >
        <View>
          <Text style={tailwind('text-xl font-bold')}>Character choice</Text>
          <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
            <Text>Choose another character</Text>
          </TouchableOpacity>
        </View>
        {match?.state === MatchState.Hold ? (
          <>
            <Text style={tailwind('text-grey-400')}>
              Match is currently on hold, {match.opponent?.tag} has to accept it
              first in order to start the matches
            </Text>
          </>
        ) : (
          <>
            <Text style={tailwind('text-xl font-bold')}>Matches</Text>
          </>
        )}
      </ScrollView>

      <CharacterPicker
        ref={bottomSheetRef}
        setCharacters={() => {}}
        characters={[]}
        onValidation={() => {}}
      />
    </View>
  )
}
