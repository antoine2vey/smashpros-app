import BottomSheet, { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { forwardRef, ForwardRefExoticComponent, RefAttributes, RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTailwind } from 'tailwind-rn/dist';
import { Text } from './Text';
import { LinearGradient } from 'expo-linear-gradient';

import data from '../assets/characters.json'
import { CharacterIcon } from './CharacterIcon';
import { useTranslation } from 'react-i18next';
import { Backdrop } from './Backdrop';
import { Character } from '../screens/Register';

type Props = {
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>
	characters: Character[]
	onValidation: () => void
}

export const CharacterPicker = forwardRef<BottomSheetModal, Props>(({ setCharacters, characters, onValidation }, ref) => {
  const tailwind = useTailwind()
	const { bottom } = useSafeAreaInsets()
	const { t } = useTranslation()

	const handleCharacterPress = useCallback((character: Character) => {
		if (characters.some(c => c.id === character.id)) {
			setCharacters(characters.filter(c => c.id !== character.id))
		} else {
			setCharacters(prevState => [...prevState, character])
		}
	}, [characters])

	return (
		<BottomSheetModal
			backgroundStyle={tailwind('bg-white-300 dark:bg-black-300')}
			backdropComponent={Backdrop}
			snapPoints={['1%', '75%']}
			ref={ref}
			index={1}
		>
		<View style={tailwind('p-6 py-0 flex-1 justify-start bg-white-300 dark:bg-black-300')}>
			<Text style={tailwind('text-2xl font-bold mb-1')}>{t('characters')}</Text>
			
			<View style={tailwind('flex-1')}>
				<BottomSheetScrollView contentContainerStyle={tailwind('flex-row flex-wrap justify-between')}>
					{data.data.characters.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map(character => (
						<CharacterIcon
							uri={character.picture}
							key={character.id}
							selected={characters.includes(character)}
							style={tailwind('mb-2 mx-1')}
							onPress={() => handleCharacterPress(character)}
						/>
					))}
				</BottomSheetScrollView>

				{/* <LinearGradient
					style={{ position:'absolute', top: 0, left: 0, right: 0, height: 15}}
					colors={['#F1F1F190', '#F1F1F100']}
					pointerEvents={'none'}
				/> */}
			</View>

			<TouchableOpacity
				style={[
					tailwind('bg-green-300 items-center p-4 rounded-lg'),
					{ marginBottom: bottom }
				]}
				activeOpacity={0.8}
				onPress={onValidation}
			>
				<Text style={tailwind('text-base text-white-400')}>{t('validate')}</Text>
			</TouchableOpacity>
		</View>
		</BottomSheetModal>
	)
})
