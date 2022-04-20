import * as ImagePicker from 'expo-image-picker'
import { ReactNativeFile } from 'apollo-upload-client'
import { useState } from 'react'

export function usePicture() {
  const [image, setImage] = useState<string>('')

  const pick = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const generateFile = (uri: string, name: string) => {
    return new ReactNativeFile({
      uri,
      type: 'image',
      name,
    })
  }

  return {
    generateFile,
    image,
    setImage,
    pick
  }
}