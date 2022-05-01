import { ApolloError } from '@apollo/client'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { Text } from '../components/Text'
import { usePicture } from '../hooks/usePicture'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { CharacterPicker } from '../components/CharacterPicker'
import { CharacterIcon } from '../components/CharacterIcon'
import { Input } from '../components/Input'
import { Backdrop } from '../components/Backdrop'
import { Button } from '../components/Button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HeaderBackButton } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import { object, string, array, number } from 'yup'
import {
  Character,
  useRegisterMutation,
  useSuggestedNameLazyQuery
} from '../generated/graphql'
import { colors } from '../colors'

const smashgg = require('../assets/smashgg.png')

export const registerSchema = object({
  email: string().email().required(),
  password: string().required(),
  tag: string().nullable().required(),
  profilePicture: string().required(),
  characters: array().of(string()).min(1).required(),
  smashGGPlayerId: number().nullable().notRequired(),
  smashGGSlug: string().nullable().notRequired(),
  smashGGUserId: string().nullable().notRequired()
})

interface FormValues {
  email: string
  password: string
  tag: string
  profilePicture: string | null
  characters: string[]
  smashGGPlayerId?: number | null
  smashGGSlug?: string | null
  smashGGUserId?: number | null
}

export const Register = () => {
  const { top } = useSafeAreaInsets()
  const tailwind = useTailwind()
  const { navigate, goBack } = useNavigation()
  const { pick, image, generateFile, setImage } = usePicture()
  const [register, { loading }] = useRegisterMutation()
  const [getName] = useSuggestedNameLazyQuery()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const bottomSheetSGGRef = useRef<BottomSheetModal>(null)
  const [characters, setCharacters] = useState<Character[]>([])
  const {
    handleBlur,
    handleChange,
    values,
    setFieldValue,
    submitForm,
    setFieldError,
    errors,
    isValid
  } = useFormik<FormValues>({
    validationSchema: registerSchema,
    validateOnMount: true,
    initialValues: {
      email: '',
      password: '',
      tag: '',
      profilePicture: null,
      characters: [],
      smashGGPlayerId: null,
      smashGGSlug: '',
      smashGGUserId: null
    },
    onSubmit: async (values) => {
      try {
        const file = generateFile(image, `profile.png`)
        await register({
          variables: {
            payload: {
              email: values.email,
              password: values.password,
              profilePicture: file,
              tag: values.tag,
              characters: values.characters,
              smashGGPlayerId: values.smashGGPlayerId,
              smashGGSlug: values.smashGGSlug,
              smashGGUserId: values.smashGGUserId
            }
          }
        })
      } catch (error) {
        const err = error as ApolloError
        console.log(err.message)
      }
    }
  })

  useEffect(() => {
    if (image) {
      setFieldValue('profilePicture', image)
    }
  }, [image])

  const onIdChange = async (text: string) => {
    handleChange('smashGGSlug')(text)

    // Valid smash GG id length
    if (text.length === 8) {
      try {
        const { data } = await getName({ variables: { slug: text } })

        if (data?.suggestedName) {
          const { smashGGPlayerId, smashGGUserId, tag, profilePicture } =
            data.suggestedName

          setFieldValue('tag', tag)
          setFieldValue('smashGGPlayerId', smashGGPlayerId)
          setFieldValue('smashGGUserId', smashGGUserId)

          if (profilePicture) {
            setFieldValue('profilePicture', null)
            setImage(profilePicture)
          }
        }
      } catch (error) {
        const err = error as ApolloError
        console.log(err.message)
        setFieldError('smashGGSlug', err.message)
      }
    } else {
      setFieldValue('tag', null)
      setFieldValue('smashGGPlayerId', null)
      setFieldValue('smashGGUserId', null)
    }
  }

  const onValidation = () => {
    const charactersId = characters.map((character) => character.id)
    setFieldValue('characters', charactersId)
    bottomSheetModalRef.current?.close()
  }

  return (
    <ScrollView style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
      <HeaderBackButton
        label="Back"
        tintColor={colors.green2}
        onPress={goBack}
        style={{ marginTop: Math.max(top, 15) }}
      />

      <View style={tailwind('p-6 flex-1')}>
        <View
          style={tailwind(
            'flex mb-5 items-start relative rounded-full h-32 w-32'
          )}
        >
          <TouchableOpacity onPress={pick} activeOpacity={0.9}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={tailwind('h-32 w-32 rounded-full')}
              />
            ) : (
              <View
                style={tailwind(
                  'h-32 w-32 bg-green-300 rounded-full opacity-50'
                )}
              />
            )}
          </TouchableOpacity>
        </View>

        <Text style={tailwind('text-3xl font-bold mb-2')}>Informations</Text>

        <Input
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          label="Email"
          autoCorrect={false}
          value={values.email}
        />

        <Input
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          secureTextEntry
          value={values.password}
          label="Password"
        />

        <Input
          onChangeText={handleChange('tag')}
          onBlur={handleBlur('tag')}
          value={values.tag}
          label="Tag / Pseudo"
        />

        <Text style={tailwind('text-2xl font-bold mt-3')}>Characters</Text>
        <View style={tailwind('flex-row items-center')}>
          <Text>Choose your character(s)</Text>
          <TouchableOpacity
            style={tailwind('ml-1')}
            onPress={() => bottomSheetModalRef.current?.present()}
          >
            <Text style={tailwind('text-green-300 font-bold')}>here !</Text>
          </TouchableOpacity>
        </View>
        <View style={tailwind('flex-row flex-wrap mt-2')}>
          {characters.map((character) => (
            <CharacterIcon
              key={character.id}
              uri={character.picture}
              style={tailwind('mr-2')}
              disabled
              selected
            />
          ))}
        </View>
      </View>

      <View style={tailwind('p-6')}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={tailwind('bg-blue-400 items-center rounded-md mb-2')}
          onPress={() => bottomSheetSGGRef.current?.present()}
        >
          <Image
            source={smashgg}
            resizeMode="contain"
            style={tailwind('w-28')}
          />
        </TouchableOpacity>

        <Button
          text="Validate"
          loading={loading}
          disabled={!isValid || loading}
          onPress={submitForm}
        />
      </View>

      <CharacterPicker
        ref={bottomSheetModalRef}
        characters={characters}
        setCharacters={setCharacters}
        onValidation={onValidation}
      />

      <BottomSheetModal
        backgroundStyle={tailwind('bg-white-300 dark:bg-black-300')}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            {...props}
          />
        )}
        snapPoints={['50%']}
        ref={bottomSheetSGGRef}
      >
        <View style={tailwind('p-6')}>
          <Text style={tailwind('text-3xl font-bold')}>Link your smash.gg</Text>
          <Text style={tailwind('text-sm font-medium')}>
            First, enter your smash.gg id, displayed on your profile
          </Text>

          <View style={tailwind('mt-3')}>
            <Input
              onChangeText={onIdChange}
              onBlur={handleBlur('smashGGSlug')}
              value={values.smashGGSlug ?? ''}
              label="SmashGG Id"
            />
            {errors.smashGGSlug && (
              <Text style={tailwind('text-sm text-red-400')}>
                {errors.smashGGSlug}
              </Text>
            )}
          </View>

          {values.smashGGPlayerId && (
            <View style={tailwind('mt-4')}>
              <Text style={tailwind('text-xl mb-2')}>
                Are you{' '}
                <Text style={tailwind('text-xl font-bold')}>{values.tag}</Text>{' '}
                ?
              </Text>
              <Button
                text="Yes"
                onPress={() => bottomSheetSGGRef.current?.dismiss()}
              />
              <Button
                text="No"
                outlined
                onPress={() => {
                  setFieldValue('tag', null)
                  setFieldValue('smashGGSlug', null)
                  setFieldValue('smashGGPlayerId', null)
                  setFieldValue('smashGGUserId', null)
                }}
              />
            </View>
          )}
        </View>
      </BottomSheetModal>
    </ScrollView>
  )
}
