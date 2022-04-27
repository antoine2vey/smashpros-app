import { createContext, useState } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

export const DarkContext = createContext<{
  scheme: ColorSchemeName,
  setScheme: React.Dispatch<React.SetStateAction<ColorSchemeName>>
}>({
  scheme: 'light',
  setScheme: () => {}
})

export const DarkContextProvider: React.FC<any> = ({ children }) => {
  const defaultScheme = useColorScheme()
  const [scheme, setScheme] = useState<ColorSchemeName>('dark')

  return (
    <DarkContext.Provider value={{ scheme, setScheme }}>
      {children}
    </DarkContext.Provider>
  )
}