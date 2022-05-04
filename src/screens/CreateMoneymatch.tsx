import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import { useRoute } from '@react-navigation/native'
import { useFormik } from 'formik'
import { chunk } from 'lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { bool, number, object, string } from 'yup'
import { MoneymatchRouteProps } from '../../App'
import { Button } from '../components/Button'
import { ProgressiveImage } from '../components/ProgressiveImage'
import { Text } from '../components/Text'
import { UserFilters } from '../components/UserFilters'
import {
  CharacterDataFragment,
  Tournament,
  useNextTournamentQuery,
  useSendMatchInviteMutation,
  useUsersLazyQuery,
  useUsersQuery
} from '../generated/graphql'
import { useColors } from '../hooks/useColors'
import { useUserFilters } from '../hooks/useUseFilters'

type FormValues = {
  to: string
  totalMatches: number
  isMoneymatch: boolean
  amount?: number
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
  const filters = useUserFilters()
  const [createMoneymatch] = useSendMatchInviteMutation()
  const { values, setFieldValue, isValid, submitForm } = useFormik<FormValues>({
    validationSchema: schema,
    validateOnMount: true,
    initialValues: {
      to: '',
      totalMatches: 1,
      isMoneymatch: false,
      amount: 0
    },
    async onSubmit({ to, totalMatches, isMoneymatch, amount }) {
      await createMoneymatch({
        variables: {
          to,
          totalMatches,
          isMoneymatch,
          amount
        }
      })
    }
  })
  const { data: nextTournament } = useNextTournamentQuery()
  const { data, fetchMore, refetch } = useUsersQuery({
    variables: {
      first: 20,
      filter: {
        tag: null,
        tournament: null,
        characters: []
      }
    },
    onError(error) {
      console.log(error.message)
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

  // When we fetch our next tournament (cached usually), get tournament users
  useEffect(() => {
    if (nextTournament) {
      filters.setTournament(nextTournament.user?.nextTournament)

      refetch({
        first: 20,
        filter: {
          tag: filters.tag,
          tournament: nextTournament?.user?.nextTournament?.id,
          characters: filters.characters.map((character) => character.id)
        }
      })
    }
  }, [nextTournament])

  const opponents = data?.users?.edges

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
          <View>
            {!!filters.tag && (
              <Text style={tailwind('text-sm text-grey-400')}>
                Tag:{' '}
                <Text style={tailwind('text-sm text-grey-400 font-bold')}>
                  {filters.tag}
                </Text>
              </Text>
            )}
            {filters.tournament && (
              <Text style={tailwind('text-sm text-grey-400')}>
                Tournament:{' '}
                <Text style={tailwind('text-sm text-grey-400 font-bold')}>
                  {filters.tournament.name}
                </Text>
              </Text>
            )}
            {filters.characters.length > 0 && (
              <Text style={tailwind('text-sm text-grey-400')}>
                Characters:{' '}
                {filters.characters.map((character) => (
                  <ProgressiveImage
                    key={character.id}
                    source={{ uri: character.picture }}
                    style={tailwind('w-6 h-6')}
                    resizeMode="contain"
                  />
                ))}
              </Text>
            )}
          </View>
          {opponents && (
            <FlatList
              style={tailwind('mt-2')}
              showsHorizontalScrollIndicator={false}
              data={opponents}
              horizontal
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item: user }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={user?.node?.id}
                  style={tailwind('mr-2 p-2 w-24 rounded-xl')}
                  onPress={() => {
                    if (user?.node?.id === values.to) {
                      setFieldValue('to', null)
                    } else {
                      setFieldValue('to', user?.node?.id)
                    }
                  }}
                >
                  <View
                    style={[
                      tailwind(
                        'relative border-2 rounded-xl border-transparent w-24 h-24'
                      ),
                      user?.node?.id === values.to &&
                        tailwind('border-green-300')
                    ]}
                  >
                    <ProgressiveImage
                      source={{ uri: user?.node?.profile_picture }}
                      style={tailwind('w-full h-full rounded-xl')}
                      resizeMode="cover"
                    />
                    <View
                      style={tailwind(
                        'flex-row absolute bottom-0 left-0 right-0 p-1'
                      )}
                    >
                      {user?.node?.characters.map((character) => (
                        <ProgressiveImage
                          key={character.id}
                          source={{ uri: character.picture }}
                          style={tailwind('w-6 h-6')}
                          resizeMode="contain"
                        />
                      ))}
                    </View>
                  </View>
                  <Text
                    numberOfLines={1}
                    style={tailwind('text-sm font-medium')}
                  >
                    {user?.node?.tag}
                  </Text>
                </TouchableOpacity>
              )}
              onEndReachedThreshold={0.4}
              onEndReached={() => {
                fetchMore({
                  variables: {
                    first: 20,
                    after: data.users?.pageInfo.endCursor,
                    filter: {
                      tag: filters.tag,
                      tournament: filters.tournament?.id,
                      characters: filters.characters.map(
                        (character) => character.id
                      )
                    }
                  }
                })
              }}
            />
          )}
        </View>

        <Button
          text="Create moneymatch"
          disabled={!isValid}
          onPress={submitForm}
        />
      </ScrollView>

      <UserFilters
        ref={bottomSheetModalRef}
        onValidation={() => {
          refetch({
            first: 20,
            filter: {
              tag: filters.tag,
              tournament: filters.tournament?.id,
              characters: filters.characters.map((character) => character.id)
            }
          })
        }}
        {...filters}
      />
    </SafeAreaView>
  )
}
