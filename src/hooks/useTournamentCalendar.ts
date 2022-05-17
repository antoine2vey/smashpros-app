import * as Calendar from 'expo-calendar'
import { useColors } from '../hooks/useColors'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { SingleTournamentQuery, Tournament } from '../generated/graphql'
import { Platform } from 'react-native'

export function useTournamentCalendar() {
  const {
    setItem: setEvents,
    getItem: getEvents
  } = useAsyncStorage('events')
  const {
    setItem: setCalendar,
    getItem: getCalendar
  } = useAsyncStorage('calendar')
  const { colors } = useColors()

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync()
    return defaultCalendar.source
  }

  async function addTournamentToCalendar(tournament: SingleTournamentQuery['tournament']) {
    const { status } = await Calendar.requestCalendarPermissionsAsync()

    if (status === Calendar.PermissionStatus.GRANTED) {
      let calendar = await getCalendar()
      const storedEvents = await getEvents()
      const events: string[] | null = storedEvents
        ? JSON.parse(storedEvents)
        : null
      const tournamentId = tournament

      if (!calendar) {
        const defaultCalendarSource =
          Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'SSBU Events' }

        const calendarId = await Calendar.createCalendarAsync({
          title: 'SSBU Events',
          color: colors.green2,
          entityType: Calendar.EntityTypes.EVENT,
          sourceId: defaultCalendarSource.id,
          source: defaultCalendarSource,
          name: 'internalCalendarName',
          ownerAccount: 'personal',
          accessLevel: Calendar.CalendarAccessLevel.OWNER
        })

        await setCalendar(calendarId)
        calendar = calendarId
      }

      if (tournament) {
        if (events?.includes(tournament.id)) {
          console.warn('Event already added, skipping')
        } else {
          await Calendar.createEventAsync(calendar, {
            calendarId: calendar,
            startDate: tournament.start_at,
            endDate: tournament.end_at,
            title: tournament.name,
            location: tournament.venue_address!,
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
            alarms: [{ relativeOffset: -4 * 60 }]
          })
  
          if (events) {
            // Append if we already had events
            await setEvents(JSON.stringify([...events, tournamentId]))
          } else {
            // If we have no events, initialize it
            await setEvents(JSON.stringify([tournamentId]))
          }
        }
      } else {
        console.log('No tournament passed ?')
      }
    }
  }

  return {
    addTournamentToCalendar
  }
}
