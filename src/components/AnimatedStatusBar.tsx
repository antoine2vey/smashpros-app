import { StatusBar, StatusBarStyle } from 'expo-status-bar'
import { useScheme } from '../hooks/useScheme'

type Props = {
  style?: StatusBarStyle
}

export const AnimatedStatusBar: React.FC<Props> = ({ style }) => {
  const { scheme } = useScheme()

  return (
    <StatusBar
      translucent
      animated
      style={style || scheme === 'dark' ? 'light' : 'dark'}
    />
  )
}
