import { useContext } from 'react'
import { DarkContext } from '../contexts/DarkContext'

export function useScheme() {
  const { scheme, setScheme } = useContext(DarkContext)

  return {
    scheme,
    setScheme
  }
}
