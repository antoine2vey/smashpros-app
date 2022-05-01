import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { Text } from '../components/Text'
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { LoginScreenNavigationProp } from '../../App'
import { useContext, useEffect } from 'react'
import { object, string } from 'yup'
import { AuthContext } from '../contexts/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLoginMutation } from '../generated/graphql'

export const loginSchema = object({
  email: string().email().required(),
  password: string().required()
})

export const Login = () => {
  const tailwind = useTailwind()
  const { navigate } = useNavigation<LoginScreenNavigationProp>()
  const { setLoggedIn } = useContext(AuthContext)
  const [login, { data, loading, error }] = useLoginMutation({
    onError: (err) => {
      console.log(err)
    }
  })
  const { handleBlur, handleChange, values, submitForm, isValid } = useFormik({
    validationSchema: loginSchema,
    validateOnMount: true,
    initialValues: {
      email: null,
      password: null
    },
    onSubmit: async (values) => {
      await login({
        variables: {
          email: values.email!,
          password: values.password!
        }
      })
    }
  })

  useEffect(() => {
    async function init() {
      if (data) {
        const { accessToken, refreshToken } = data.login!
        await AsyncStorage.setItem('token:access', accessToken!)
        await AsyncStorage.setItem('token:refresh', refreshToken!)

        setLoggedIn(true)
      }
    }

    init()
  }, [data])

  return (
    <SafeAreaView style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}>
      <View style={tailwind('p-6 flex-1 justify-center')}>
        <View style={tailwind('items-center mb-10')}>
          <Text style={tailwind('text-3xl font-bold')}>
            Welcome to smashpros!
          </Text>
          <Text style={tailwind('text-xl text-grey-400 font-medium')}>
            An unique SSBU tool!
          </Text>
        </View>

        <Input
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email!}
          label="Email"
          keyboardType="email-address"
        />

        <Input
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          secureTextEntry={true}
          value={values.password!}
          label="Password"
        />

        {error && (
          <Text style={tailwind('text-red-400 text-sm')}>{error?.message}</Text>
        )}

        <View style={tailwind('mt-5')}>
          <Button
            onPress={submitForm}
            loading={loading}
            disabled={!isValid || loading}
            text="Login"
          />
          <Button
            text="Forgot password?"
            outlined
            onPress={() => navigate('ForgotPassword')}
          />
        </View>
      </View>
      <View style={tailwind('p-2 justify-center items-center flex-row')}>
        <Text style={tailwind('text-grey-400 font-bold')}>
          Don't have an account ?
        </Text>
        <TouchableOpacity
          style={tailwind('ml-1')}
          activeOpacity={0.8}
          onPress={() => navigate('Register')}
        >
          <Text style={tailwind('text-green-300 font-bold')}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
