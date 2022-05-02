import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import { useRoute } from '@react-navigation/native'
import { useFormik } from 'formik'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { bool, number, object, string } from 'yup'
import { MoneymatchRouteProps } from '../../App'
import { Text } from '../components/Text'
import { UserFilters } from '../components/UserFilters'
import {
  useNextTournamentQuery,
  useUsersLazyQuery,
  useUsersQuery
} from '../generated/graphql'
import { useColors } from '../hooks/useColors'

type FormValues = {
  to: string | null
  totalMatches: number
  isMoneymatch: boolean
}

const MAX = 19
const schema = object({
  to: string().required('Select an opponent'),
  totalMatches: number().required(),
  isMoneymatch: bool().required(),
  amount: number().when('isMoneymatch', {
    is: true,
    then: number().required(),
    otherwise: number()
  })
})

export const CreateMoneymatch = () => {
  const tailwind = useTailwind()
  const { params } = useRoute<MoneymatchRouteProps<'CreateMoneymatch'>>()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { shadow } = useColors()
  const { values, setFieldValue } = useFormik<FormValues>({
    validationSchema: schema,
    validateOnMount: true,
    initialValues: {
      to: null,
      totalMatches: 1,
      isMoneymatch: false
    },
    onSubmit(values) {
      console.log(values)
    }
  })
  const { data: nextTournament } = useNextTournamentQuery()
  const [getUsers, { data }] = useUsersLazyQuery({
    variables: {
      first: 20,
      filter: {
        tag: null,
        tournament: null,
        characters: []
      }
    }
  })

  const bestOfN = useMemo(() => [1, 3, 5], [])
  const firstToN = useMemo(() => [7, 9, 11, 13, 15, 17, 19], [])
  const selected = useCallback((n) => values.totalMatches === n, [values])

  useEffect(() => {
    if (params) {
      if (params.opponent) {
        // fetch user
      }
    }
  }, [params])

  useEffect(() => {
    if (nextTournament?.user?.nextTournament) {
      getUsers({
        variables: {
          first: 20,
          filter: {
            tag: null,
            tournament: nextTournament.user.nextTournament.id,
            characters: []
          }
        }
      })
    }
  }, [nextTournament])

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
      <ScrollView contentContainerStyle={tailwind('p-2')}>
        <Text style={tailwind('text-3xl font-bold')}>Create moneymatch</Text>
        <Text style={tailwind('text-grey-400')}>
          You can create a moneymatch and challenge opponents directly.
        </Text>

        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-xl font-bold')}>Best of</Text>
          <View style={tailwind('flex-row mt-1')}>
            {bestOfN.map((n) => (
              <TouchableOpacity
                key={n}
                onPress={() => setFieldValue('totalMatches', n)}
                style={[
                  tailwind(
                    'border border-green-300 h-8 w-8 items-center justify-center mr-1 rounded'
                  ),
                  selected(n) && tailwind('bg-green-400')
                ]}
              >
                <Text style={tailwind('font-medium')}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={tailwind('mt-2')}>
          <Text style={tailwind('text-xl font-bold')}>First to</Text>
          <View style={tailwind('flex-row mt-1')}>
            {firstToN.map((n) => (
              <TouchableOpacity
                key={n}
                onPress={() => setFieldValue('totalMatches', n)}
                style={[
                  tailwind(
                    'border border-green-300 h-8 w-8 items-center justify-center mr-1 rounded'
                  ),
                  selected(n) && tailwind('bg-green-400')
                ]}
              >
                <Text style={tailwind('font-medium')}>{Math.ceil(n / 2)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={tailwind('mt-5')}>
          <View style={tailwind('flex-row justify-between items-center')}>
            <Text style={tailwind('text-xl font-bold')}>
              Choose your opponent
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => bottomSheetModalRef.current?.present()}
            >
              <Text style={tailwind('text-base text-green-400')}>Filters</Text>
            </TouchableOpacity>
          </View>
          {data?.users?.edges?.map((user) => (
            <Text>{user?.node?.tag}</Text>
          ))}
        </View>
      </ScrollView>

      <UserFilters
        ref={bottomSheetModalRef}
        onValidation={async ({ tag, tournament, characters }) => {
          getUsers({
            variables: {
              first: 20,
              filter: {
                tag,
                tournament: tournament?.id,
                characters: characters.map((character) => character.id)
              }
            }
          })
        }}
      />
    </SafeAreaView>
  )
}
