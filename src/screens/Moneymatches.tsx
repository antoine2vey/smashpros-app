import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useMemo, useRef } from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { MoneymatchRouteProps, MoneymatchScreenNavigateProp } from '../../App'
import { Text } from '../components/Text'
import { MatchEdge, MatchState, useMatchesQuery } from '../generated/graphql'
import { useColors } from '../hooks/useColors'

function filterMatchEdgeByState(state: MatchState) {
  return (edge: any) => {
    return edge?.node?.state === state
  }
}

export const Moneymatches = () => {
  const tailwind = useTailwind()
  const { navigate } = useNavigation<MoneymatchScreenNavigateProp>()
  const { data } = useMatchesQuery()

  const onHoldMatches = useMemo(() => {
    if (data?.matches) {
      return data.matches.edges?.filter(filterMatchEdgeByState(MatchState.Hold))
    }

    return []
  }, [data])

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
      <TouchableOpacity onPress={() => navigate('CreateMoneymatch')}>
        <Text>create</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={tailwind('p-2')}>
        <Text style={tailwind('text-xl font-bold')}>Awaiting matches</Text>
        {onHoldMatches?.map((edge) => (
          <TouchableOpacity
            key={edge?.node?.id}
            onPress={() => navigate('Moneymatch', { id: edge?.node?.id! })}
          >
            <Text>{edge?.node?.initiator?.tag}</Text>
            <Text>{edge?.node?.intiator_wins}</Text>
            <Text>{edge?.node?.opponent_wins}</Text>
            <Text>{edge?.node?.opponent?.tag}</Text>
            <Text>{edge?.node?.state}</Text>
          </TouchableOpacity>
        ))}

        {/* <TouchableOpacity onPress={() => navigate('CreateMoneymatch')}>
          <Text>ok</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  )
}
