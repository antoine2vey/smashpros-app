import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn/dist'
import { Text } from './Text'

import { CharacterIcon } from './CharacterIcon'
import { useTranslation } from 'react-i18next'
import { gql, useQuery } from '@apollo/client'
import { chunk } from 'lodash'
import { Button } from './Button'
import {
  Character,
  CharacterDataFragment,
  Tournament,
  useCharactersQuery,
  useUserFilterQuery
} from '../generated/graphql'
import { useColors } from '../hooks/useColors'
import { Input } from './Input'
import { SmallTournament } from './SmallTournament'

type Props = {
  characters: CharacterDataFragment[]
  setCharacters: React.Dispatch<React.SetStateAction<CharacterDataFragment[]>>
  tag: string | null
  setTag: React.Dispatch<React.SetStateAction<string | null>>
  tournament: Tournament | null
  setTournament: React.Dispatch<React.SetStateAction<Tournament | null>>
  onValidation: () => void
}

export const UserFilters = forwardRef<BottomSheetModal, Props>(
  (
    {
      onValidation,
      characters,
      setCharacters,
      tag,
      setTag,
      tournament,
      setTournament
    },
    ref
  ) => {
    const tailwind = useTailwind()
    const { bottom } = useSafeAreaInsets()
    const { t } = useTranslation()
    const { shadow } = useColors()
    const { data } = useUserFilterQuery()

    const handleCharacterPress = useCallback(
      (character: CharacterDataFragment) => {
        if (characters.some((c) => c?.id === character?.id)) {
          setCharacters(characters.filter((c) => c?.id !== character?.id))
        } else {
          setCharacters((prevState) => [...prevState, character])
        }
      },
      [characters]
    )

    const charactersRows = useMemo(() => {
      if (data) {
        return chunk(data.characters, 6)
      }

      return []
    }, [data])

    return (
      <BottomSheetModal
        backgroundStyle={tailwind('bg-white-300 dark:bg-black-300')}
        snapPoints={['90%']}
        onDismiss={() => {
          onValidation()
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            {...props}
          />
        )}
        handleIndicatorStyle={tailwind('bg-black-300 dark:bg-white-300')}
        ref={ref}
        style={shadow}
      >
        <BottomSheetScrollView
          style={tailwind('flex-1 p-6 py-0 bg-white-300 dark:bg-black-300')}
        >
          <Text style={tailwind('text-2xl font-bold mb-1')}>Tag</Text>
          <Input value={tag || ''} onChangeText={setTag} />

          <Text style={tailwind('text-2xl font-bold')}>Tournament</Text>
          {tournament && (
            <Text
              numberOfLines={1}
              style={tailwind('text-green-300 font-bold text-sm mb-2')}
            >
              {tournament.name}
            </Text>
          )}
          {data?.tournaments?.edges?.length && (
            <BottomSheetScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={tailwind('-mx-6 mb-2')}
              contentContainerStyle={tailwind('pl-6')}
            >
              {data.tournaments.edges.map((t) => (
                <SmallTournament
                  key={t?.node?.id}
                  tournament={t?.node}
                  selected={t?.node?.id === tournament?.id}
                  onPress={() => {
                    if (t?.node?.id === tournament?.id) {
                      setTournament(null)
                    } else {
                      setTournament(t?.node)
                    }
                  }}
                />
              ))}
            </BottomSheetScrollView>
          )}

          <Text style={tailwind('text-2xl font-bold mb-1')}>
            {t('characters')}
          </Text>

          <View style={tailwind('mb-4')}>
            {data?.characters?.length && (
              <BottomSheetScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={tailwind('-mx-6')}
                contentContainerStyle={tailwind('pl-6')}
              >
                {charactersRows.map((row, i) => (
                  <View style={tailwind('flex-1')} key={i}>
                    {row.map((character) => (
                      <CharacterIcon
                        uri={character?.picture!}
                        key={character?.id}
                        selected={characters.includes(character)}
                        style={tailwind('mb-2 mx-0.5')}
                        onPress={() => handleCharacterPress(character)}
                      />
                    ))}
                  </View>
                ))}
              </BottomSheetScrollView>
            )}
          </View>

          <Button
            text="Valider"
            onPress={() => {
              ref?.current.dismiss()
            }}
          />
          <Button
            onPress={() => ref?.current.dismiss()}
            outlined
            text="Fermer"
            style={{
              marginBottom: Math.max(5, bottom)
            }}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    )
  }
)
