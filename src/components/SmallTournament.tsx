import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { Tournament } from '../generated/graphql'
import { ProgressiveImage } from './ProgressiveImage'

type Props = TouchableOpacityProps & {
  tournament: Tournament
  selected?: boolean
}

export const SmallTournament: React.FC<Props> = ({
  tournament,
  selected,
  ...props
}) => {
  const tailwind = useTailwind()

  return (
    <TouchableOpacity
      style={[
        tailwind('mr-2 border-2 border-transparent'),
        selected && tailwind('border-2 border-green-300 rounded-xl')
      ]}
      activeOpacity={0.9}
      {...props}
    >
      <ProgressiveImage
        source={{ uri: tournament.images[0] || tournament.images[1] }}
        style={[
          tailwind('h-48 w-28 rounded-xl bg-white-200 dark:bg-black-200')
        ]}
        resizeMode="cover"
      />
    </TouchableOpacity>
  )
}
