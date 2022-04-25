import BottomSheet, { BottomSheetFlatList, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { forwardRef, ForwardRefExoticComponent, RefAttributes, RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTailwind } from 'tailwind-rn/dist';
import { Text } from './Text';

import { CharacterIcon } from './CharacterIcon';
import { useTranslation } from 'react-i18next';
import { Backdrop } from './Backdrop';
import { gql, useQuery } from '@apollo/client'
import { chunk } from 'lodash';
import { Button } from './Button';
import { Character, useCharactersQuery } from '../generated/graphql';
import { colors } from '../colors';

type Props = {
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
	characters: Character[]
	onValidation: () => void
}

export const CharacterPicker = forwardRef<BottomSheetModal, Props>(({ setCharacters, characters, onValidation }, ref) => {
  const tailwind = useTailwind()
	const { bottom } = useSafeAreaInsets()
	const { t } = useTranslation()
	const { data } = useCharactersQuery()

	const handleCharacterPress = useCallback((character: Character) => {
		if (characters.some(c => c.id === character.id)) {
			setCharacters(characters.filter(c => c.id !== character.id))
		} else {
			setCharacters(prevState => [...prevState, character])
		}
	}, [characters])

	const charactersRows = useMemo(() => {
		if (data) {
			return chunk(data.characters, 6)
		}

		return []
	}, [data])

	return (
		<BottomSheetModal
			backgroundStyle={tailwind('bg-white-300 dark:bg-black-300')}
			snapPoints={['50%', '80%']}
			index={0}
			ref={ref}
			style={{
				shadowColor: colors.fullblack,
				shadowOffset: {
					width: 0,
					height: 12,
				},
				shadowOpacity: 0.58,
				shadowRadius: 16.00,
				elevation: 24,
			}}
		>
		<View style={tailwind('flex-1 p-6 py-0 bg-white-300 dark:bg-black-300')}>
			{/* <View style={tailwind('flex-1')}>
				<Text style={tailwind('text-2xl font-bold mb-1')}>Filters</Text>
			</View> */}

			<Text style={tailwind('text-2xl font-bold mb-1')}>{t('characters')}</Text>

			<View style={tailwind('h-72 flex-1')}>
				{data?.characters?.length && (
					<BottomSheetScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={tailwind('-mx-6')}
						contentContainerStyle={tailwind('pl-6')}
					>
						{charactersRows.map((row, i) => (
							<View style={{ flex: 1}} key={i}>
								{row.map(character => (
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
				onPress={onValidation}
			/>
			<Button
				onPress={() => ref?.current.dismiss()}
				outlined
				text="Fermer"
				style={{
					marginBottom: Math.max(5, bottom)
				}}
			/>
		</View>
		</BottomSheetModal>
	)
})
