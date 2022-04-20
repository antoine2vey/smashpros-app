import AsyncStorageLib from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist"
import { Crew } from "../components/Crew"
import { Text } from "../components/Text"
import { Tournament } from "../components/Tournament"

const icon = require('../assets/icon.png')

export const Home = () => {
  const { navigate } = useNavigation()
  const tailwind = useTailwind()
  const { t } = useTranslation()

  return (
    <ScrollView
      style={tailwind('flex-1 bg-white-300 dark:bg-black-300')}
      stickyHeaderIndices={[1, 4, 6]}
      contentContainerStyle={tailwind('p-2')}
    >
      <Text style={tailwind('text-4xl font-bold')}>Crews</Text>
      <View style={tailwind('bg-white-300 dark:bg-black-300 pb-1')}>
        <Text style={tailwind('text-xl')}>{t('findCrew')}</Text>
      </View>

      <ScrollView horizontal>
        <Crew name="Solary" url={icon} />
        <Crew name="ZSSsux" url={icon} />
        <Crew name="Solary" url={icon} />
        <Crew name="Solary" url={icon} />
        <Crew name="Solary" url={icon} />
      </ScrollView>

      <Text style={tailwind('mt-5 text-4xl font-bold')}>{t('tournaments')}</Text>
      <View style={tailwind('bg-white-300 dark:bg-black-300 pb-1')}>
        <Text style={tailwind('text-xl')}>
          {t('nextTournament')} - <Text style={tailwind('font-bold')}>3 {t('days')}</Text>
        </Text>
      </View>

      <View style={tailwind('mt-2.5')}>
        <Tournament big onPress={() => navigate('TournamentDetail')} />
      </View>

      <View style={tailwind('bg-white-300 dark:bg-black-300 pb-1 mt-2.5')}>
        <Text style={tailwind('text-xl')}>{t('upcomingTournaments')}</Text>
      </View>

      <View style={tailwind('mt-2.5')}>
        <Tournament />
        <Tournament />
        <Tournament />
        <Tournament />
        <Tournament />
      </View>
    </ScrollView>
  )
}