import { View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { Placeholder, TextPlaceholder } from "./GenericPlaceholders"

type Props = {
  big?: boolean
}

export const TournamentPlaceholder: React.FC<Props> = ({ big }) => {
  const tailwind = useTailwind()

  return (
    <View
      style={[
        tailwind(`
          bg-white-400
          dark:bg-black-200
          rounded-2xl
          ${big ? 'p-3' : 'p-2'}
          flex-row
          items-center
          mb-3
        `),
        big && {
          shadowColor: tailwind('text-black-400'),
          shadowOffset: {
            width: 1,
            height: 2
          },
          shadowOpacity: 0.12,
          shadowRadius: 3
        }
      ]}
    >
      <Placeholder
        itemStyle={
          tailwind(`
            rounded-xl
            ${big ? 'h-32' : 'h-20'}
            ${big ? 'w-32' : 'w-20'}
          `)
        }
      />
      <View style={tailwind('flex-shrink ml-2.5 flex-1')}>
        <TextPlaceholder type="xl" />
        <TextPlaceholder style={tailwind('w-32')} />
        <TextPlaceholder style={tailwind('w-20')} />
        <TextPlaceholder style={tailwind('w-28 mt-2')} />
      </View>
    </View>
  )
}