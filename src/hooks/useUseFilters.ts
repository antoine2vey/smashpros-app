import { useState } from "react"
import { CharacterDataFragment, Tournament } from "../generated/graphql"

export function useUserFilters() {
  const [characters, setCharacters] = useState<CharacterDataFragment[]>([])
  const [tag, setTag] = useState<string | null>(null)
  const [tournament, setTournament] = useState<Tournament | null>(null)

  return {
    characters,
    setCharacters,
    tag,
    setTag,
    tournament,
    setTournament
  }
}