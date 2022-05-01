import { useNavigation, useRoute } from '@react-navigation/native'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { SafeAreaView, View } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { object, ref, string } from 'yup'
import { LoginScreenNavigationProp, LogoutRouteProps } from '../../App'
import { BackButton } from '../components/BackButton'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Text } from '../components/Text'
import { usePasswordResetMutation } from '../generated/graphql'

const resetSchema = object({
  password: string().required('Password is required'),
  confirmPassword: string().oneOf(
    [ref('password'), null],
    'Passwords must match'
  )
})

export const ResetPassword = () => {
  const tailwind = useTailwind()
  const [reset, { data, loading, error }] = usePasswordResetMutation({
    onError(error) {
      console.log(error)
    }
  })
  const { navigate } = useNavigation<LoginScreenNavigationProp>()
  const { params } = useRoute<LogoutRouteProps<'ResetPassword'>>()
  const {
    handleBlur,
    handleChange,
    submitForm,
    isValid,
    errors,
    touched,
    values
  } = useFormik({
    validationSchema: resetSchema,
    validateOnMount: true,
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    onSubmit({ password, confirmPassword }) {
      reset({
        variables: {
          password,
          confirmPassword,
          code: params.token!
        }
      })
    }
  })

  useEffect(() => {
    if (data) {
      if (data.passwordReset) {
        navigate('Login')
      }
    }
  }, [data])

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
      <View style={tailwind('p-2')}>
        <BackButton />
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-3xl font-bold mb-2')}>
            Create new password
          </Text>
          <Text style={tailwind('text-sm text-grey-400 mb-4')}>
            Your new password must be different from previous used passwords
          </Text>
          {touched.password && errors.password && (
            <Text style={tailwind('text-red-400 text-sm')}>
              {errors.password}
            </Text>
          )}
          <Input
            label="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            secureTextEntry
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={tailwind('text-red-400 text-sm')}>
              {errors.confirmPassword}
            </Text>
          )}
          <Input
            label="Confirm Password"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            secureTextEntry
          />

          {error && (
            <Text style={tailwind('text-red-400 mb-1 text-sm')}>
              {error.message}
            </Text>
          )}
          <Button
            disabled={!isValid || loading}
            loading={loading}
            onPress={submitForm}
            text="Reset Password"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
