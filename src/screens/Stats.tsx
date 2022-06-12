import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import { forwardRef } from 'react'
import { ScrollView, useWindowDimensions, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { ListStatContainer } from '../components/stats/ListStatContainer'
import { StatContainer } from '../components/stats/StatContainer'
import { Text } from '../components/Text'
import { useStatsQuery } from '../generated/graphql'
import { useColors } from '../hooks/useColors'

type Props = {}

export const Stats = forwardRef<BottomSheetModal, Props>(({}, ref) => {
  const tailwind = useTailwind()
  const { data } = useStatsQuery()
  const { shadow } = useColors()
  const { width } = useWindowDimensions()

  return (
    <BottomSheetModal
      backgroundStyle={tailwind('bg-white-400 dark:bg-black-400')}
      snapPoints={['90%']}
      onDismiss={() => {}}
      // handleComponent={() => null}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...props}
        />
      )}
      handleIndicatorStyle={tailwind('bg-black-400 dark:bg-white-400')}
      ref={ref}
      style={shadow}
    >
      <BottomSheetScrollView
        style={tailwind(
          'border-b border-b-grey-300 dark:border-b-black-200 p-4 relative flex-1'
        )}
        contentContainerStyle={tailwind('flex-1')}
      >
        <Text style={tailwind('text-2xl font-bold mb-4')}>Stats</Text>

        <View style={tailwind('mb-5')}>
          <StatContainer title="Sets" stat={data?.stats?.sets} />
        </View>
        <View style={tailwind('mb-5')}>
          <StatContainer title="Matches" stat={data?.stats?.matches} />
        </View>

        <ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate={0}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          style={tailwind('-mx-4 flex-1')}
        >
          <View style={[tailwind('px-4 flex-1'), { width: width - 60 }]}>
            <ListStatContainer
              title="Characters"
              stats={data?.stats?.characters}
            />
          </View>
          <View style={[tailwind('px-4 flex-1'), { width: width }]}>
            <ListStatContainer title="Players" stats={data?.stats?.users} />
          </View>
        </ScrollView>
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
})
