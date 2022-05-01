import { HeaderBackButton } from '@react-navigation/elements'
import { useFormik } from 'formik'
import { SafeAreaView, View } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { BackButton } from '../components/BackButton'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Text } from '../components/Text'
import { useColors } from '../hooks/useColors'
import { object, string } from 'yup'
import { useAskPasswordResetMutation } from '../generated/graphql'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LoginScreenNavigationProp } from '../../App'

interface FormValues {
  email: string
}

const forgotPasswordSchema = object({
  email: string().email('Invalid email form').required('Email is required')
})

export const ForgotPassword = () => {
  const tailwind = useTailwind()
  const { colors } = useColors()
  const { navigate } = useNavigation<LoginScreenNavigationProp>()
  const [askReset, { data, loading }] = useAskPasswordResetMutation()
  const { handleBlur, handleChange, errors, touched, submitForm, isValid } =
    useFormik<FormValues>({
      validationSchema: forgotPasswordSchema,
      initialValues: {
        email: ''
      },
      validateOnMount: true,
      onSubmit({ email }) {
        askReset({
          variables: {
            email
          }
        })
      }
    })

  useEffect(() => {
    if (data) {
      navigate('ForgotPasswordConfirm')
    }
  }, [data])

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
      <View style={tailwind('p-2')}>
        <BackButton />
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-3xl font-bold mb-2')}>
            Reset password
          </Text>
          <Text style={tailwind('text-sm text-grey-400 mb-4')}>
            Enter the email associated with your account. If it exists, you will
            receive an email containing informations to reset your account
          </Text>
          {touched.email && errors.email && (
            <Text style={tailwind('text-red-400 text-sm')}>{errors.email}</Text>
          )}
          <Input
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            label="Email"
          />
          <Button
            loading={loading}
            disabled={!isValid || loading}
            onPress={submitForm}
            text="Reset password"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
