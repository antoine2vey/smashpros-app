import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type Battle = {
  __typename?: 'Battle';
  id: Scalars['ID'];
  initiator?: Maybe<User>;
  initiator_character?: Maybe<Character>;
  initiator_vote?: Maybe<User>;
  opponent?: Maybe<User>;
  opponent_character?: Maybe<Character>;
  opponent_vote?: Maybe<User>;
  state: BattleState;
  winner?: Maybe<User>;
  winner_id?: Maybe<Scalars['String']>;
};

export enum BattleState {
  CharacterChoice = 'CHARACTER_CHOICE',
  Finished = 'FINISHED',
  Playing = 'PLAYING',
  Voting = 'VOTING'
}

export type Character = {
  __typename?: 'Character';
  id: Scalars['ID'];
  name: Scalars['String'];
  picture: Scalars['String'];
  users: Array<User>;
};

export type CharacterStat = {
  __typename?: 'CharacterStat';
  character?: Maybe<Character>;
  stat?: Maybe<Stat>;
};

export type Crew = {
  __typename?: 'Crew';
  admin: User;
  banner: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  members: Array<User>;
  name: Scalars['String'];
  prefix: Scalars['String'];
  waiting_members: Array<User>;
};

export type CrewCreationPayload = {
  banner: Scalars['Upload'];
  icon: Scalars['Upload'];
  name: Scalars['String'];
  prefix: Scalars['String'];
};

export enum CrewUpdateActionEnum {
  Accept = 'ACCEPT',
  Deny = 'DENY'
}

export type Event = {
  __typename?: 'Event';
  event_id: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  num_attendees: Scalars['Int'];
  tier: Scalars['String'];
  tournament: Tournament;
  valid: Scalars['Boolean'];
};

export type Match = {
  __typename?: 'Match';
  amount?: Maybe<Scalars['Int']>;
  battles: Array<Battle>;
  id: Scalars['ID'];
  initiator?: Maybe<User>;
  initiator_wins: Scalars['Int'];
  is_moneymatch: Scalars['Boolean'];
  opponent?: Maybe<User>;
  opponent_wins: Scalars['Int'];
  state: MatchState;
  total_matches: Scalars['Int'];
  winner?: Maybe<User>;
  winner_id?: Maybe<Scalars['String']>;
};

export type MatchConnection = {
  __typename?: 'MatchConnection';
  edges?: Maybe<Array<Maybe<MatchEdge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MatchEdge = {
  __typename?: 'MatchEdge';
  cursor: Scalars['String'];
  node?: Maybe<Match>;
};

export enum MatchState {
  Finished = 'FINISHED',
  Hold = 'HOLD',
  Refused = 'REFUSED',
  Started = 'STARTED'
}

export type Mutation = {
  __typename?: 'Mutation';
  askPasswordReset?: Maybe<Scalars['String']>;
  checkUserIn?: Maybe<Scalars['Boolean']>;
  createCrew?: Maybe<Crew>;
  favoriteTournament?: Maybe<Scalars['Boolean']>;
  joinCrew?: Maybe<Crew>;
  kickMember?: Maybe<User>;
  leaveCrew?: Maybe<Crew>;
  login?: Maybe<AuthPayload>;
  participateTournament?: Maybe<Tournament>;
  passwordReset?: Maybe<Scalars['Boolean']>;
  refresh?: Maybe<RefreshPayload>;
  register?: Maybe<User>;
  sendMatchInvite?: Maybe<Match>;
  setOnline?: Maybe<User>;
  synchronizeTournaments?: Maybe<Array<Maybe<Tournament>>>;
  transferCrewOwnership?: Maybe<Crew>;
  updateBattle?: Maybe<Battle>;
  updateMatch?: Maybe<Match>;
  updateMember?: Maybe<Crew>;
  updateProfile?: Maybe<User>;
  userEnteredTournament?: Maybe<User>;
  userLeftTournament?: Maybe<User>;
};


export type MutationAskPasswordResetArgs = {
  email: Scalars['String'];
};


export type MutationCheckUserInArgs = {
  participant: Scalars['ID'];
  tournament: Scalars['ID'];
};


export type MutationCreateCrewArgs = {
  payload: CrewCreationPayload;
};


export type MutationFavoriteTournamentArgs = {
  id: Scalars['ID'];
  unfavorite?: InputMaybe<Scalars['Boolean']>;
};


export type MutationJoinCrewArgs = {
  id: Scalars['ID'];
};


export type MutationKickMemberArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationParticipateTournamentArgs = {
  id: Scalars['ID'];
  unparticipate?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPasswordResetArgs = {
  code: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRefreshArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterArgs = {
  payload: UserRegisterPayload;
};


export type MutationSendMatchInviteArgs = {
  amount?: InputMaybe<Scalars['Int']>;
  isMoneymatch?: InputMaybe<Scalars['Boolean']>;
  to: Scalars['ID'];
  totalMatches: Scalars['Int'];
  tournament?: InputMaybe<Scalars['ID']>;
};


export type MutationSetOnlineArgs = {
  online: Scalars['Boolean'];
};


export type MutationTransferCrewOwnershipArgs = {
  to: Scalars['ID'];
};


export type MutationUpdateBattleArgs = {
  character?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  state?: InputMaybe<BattleState>;
  vote?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateMatchArgs = {
  id: Scalars['ID'];
  state: MatchState;
};


export type MutationUpdateMemberArgs = {
  action: CrewUpdateActionEnum;
  id: Scalars['ID'];
};


export type MutationUpdateProfileArgs = {
  payload: UserUpdatePayload;
};


export type MutationUserEnteredTournamentArgs = {
  tournament: Scalars['ID'];
};


export type MutationUserLeftTournamentArgs = {
  tournament: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  characters?: Maybe<Array<Maybe<Character>>>;
  crew?: Maybe<Crew>;
  crews?: Maybe<Array<Maybe<Crew>>>;
  match?: Maybe<Match>;
  matches?: Maybe<MatchConnection>;
  stats?: Maybe<Stats>;
  suggestedName?: Maybe<SuggestedName>;
  tournament?: Maybe<Tournament>;
  tournaments?: Maybe<TournamentConnection>;
  user?: Maybe<User>;
  users?: Maybe<UserConnection>;
  zones?: Maybe<Array<Maybe<Zone>>>;
};


export type QueryCrewArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryMatchArgs = {
  id: Scalars['ID'];
};


export type QueryMatchesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QuerySuggestedNameArgs = {
  slug: Scalars['String'];
};


export type QueryTournamentArgs = {
  id: Scalars['ID'];
};


export type QueryTournamentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<TournamentsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters: UserFilter;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryZonesArgs = {
  countryCode: Scalars['String'];
};

export type RefreshPayload = {
  __typename?: 'RefreshPayload';
  accessToken?: Maybe<Scalars['String']>;
};

export type RegisterPayload = {
  success?: InputMaybe<Scalars['Boolean']>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name: RoleEnum;
};

export enum RoleEnum {
  Admin = 'ADMIN',
  CrewAdmin = 'CREW_ADMIN',
  TournamentOrganizer = 'TOURNAMENT_ORGANIZER',
  User = 'USER'
}

export type Stat = {
  __typename?: 'Stat';
  total?: Maybe<Scalars['Int']>;
  wins?: Maybe<Scalars['Int']>;
};

export type Stats = {
  __typename?: 'Stats';
  characters?: Maybe<Array<Maybe<CharacterStat>>>;
  matches?: Maybe<Stat>;
  sets?: Maybe<Stat>;
  users?: Maybe<Array<Maybe<UserStat>>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onBattleUpdate?: Maybe<Battle>;
  onMatchUpdate?: Maybe<Match>;
  onUserJoinMatch?: Maybe<User>;
  onUserLeftMatch?: Maybe<User>;
  userEnteredTournament: User;
  userLeftTournament: User;
};


export type SubscriptionOnBattleUpdateArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionOnMatchUpdateArgs = {
  id: Scalars['ID'];
};


export type SubscriptionOnUserJoinMatchArgs = {
  id: Scalars['ID'];
};


export type SubscriptionOnUserLeftMatchArgs = {
  id: Scalars['ID'];
};

export type SuggestedName = {
  __typename?: 'SuggestedName';
  profilePicture?: Maybe<Scalars['String']>;
  smashGGPlayerId: Scalars['Int'];
  smashGGUserId: Scalars['Int'];
  tag: Scalars['String'];
};

export type Tournament = {
  __typename?: 'Tournament';
  city?: Maybe<Scalars['String']>;
  country_code: Scalars['String'];
  created_at?: Maybe<Scalars['DateTime']>;
  currency: Scalars['String'];
  end_at?: Maybe<Scalars['DateTime']>;
  event_registration_closes_at?: Maybe<Scalars['DateTime']>;
  events: Array<Event>;
  favorited_by: Array<User>;
  has_offline_events?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  images: Array<Scalars['String']>;
  is_registration_open?: Maybe<Scalars['Boolean']>;
  is_started: Scalars['Boolean'];
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  num_attendees?: Maybe<Scalars['Int']>;
  participants?: Maybe<UserConnection>;
  slug: Scalars['String'];
  start_at?: Maybe<Scalars['DateTime']>;
  state: Scalars['Int'];
  tournament_id: Scalars['Int'];
  venue_address?: Maybe<Scalars['String']>;
  venue_name?: Maybe<Scalars['String']>;
};


export type TournamentParticipantsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  characters?: InputMaybe<Array<Scalars['ID']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type TournamentConnection = {
  __typename?: 'TournamentConnection';
  edges?: Maybe<Array<Maybe<TournamentEdge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TournamentEdge = {
  __typename?: 'TournamentEdge';
  cursor: Scalars['String'];
  node?: Maybe<Tournament>;
};

export type TournamentQuery = {
  id?: InputMaybe<Scalars['ID']>;
  player?: InputMaybe<Scalars['String']>;
};

export type TournamentsFilter = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  zone?: InputMaybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  allow_notifications: Scalars['Boolean'];
  allow_searchability: Scalars['Boolean'];
  characters: Array<Character>;
  created_at: Scalars['DateTime'];
  crew?: Maybe<Crew>;
  email: Scalars['String'];
  favorited_tournaments: Array<Tournament>;
  id: Scalars['ID'];
  in_match: Scalars['Boolean'];
  in_tournament: Scalars['Boolean'];
  nextTournament?: Maybe<Tournament>;
  profile_picture?: Maybe<Scalars['String']>;
  roles: Array<Role>;
  smashgg_player_id?: Maybe<Scalars['Int']>;
  smashgg_slug?: Maybe<Scalars['String']>;
  tag: Scalars['String'];
  tournaments: Array<Tournament>;
  tournaments_organizer: Array<Tournament>;
  twitch_username?: Maybe<Scalars['String']>;
  twitter_username?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  waiting_crew?: Maybe<Crew>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node?: Maybe<User>;
};

export type UserFilter = {
  characters?: InputMaybe<Array<Scalars['ID']>>;
  tag?: InputMaybe<Scalars['String']>;
  tournament?: InputMaybe<Scalars['ID']>;
};

export type UserRegisterPayload = {
  characters: Array<Scalars['ID']>;
  email: Scalars['String'];
  password: Scalars['String'];
  profilePicture: Scalars['Upload'];
  smashGGPlayerId?: InputMaybe<Scalars['Int']>;
  smashGGSlug?: InputMaybe<Scalars['String']>;
  smashGGUserId?: InputMaybe<Scalars['Int']>;
  tag: Scalars['String'];
  twitchUsername?: InputMaybe<Scalars['String']>;
  twitterUsername?: InputMaybe<Scalars['String']>;
};

export type UserStat = {
  __typename?: 'UserStat';
  stat?: Maybe<Stat>;
  user?: Maybe<User>;
};

export type UserUpdatePayload = {
  allowNotifications?: InputMaybe<Scalars['Boolean']>;
  allowSearchability?: InputMaybe<Scalars['Boolean']>;
  characters?: InputMaybe<Array<Scalars['ID']>>;
  notificationToken?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['Upload']>;
  smashGGPlayerId?: InputMaybe<Scalars['Int']>;
  smashGGSlug?: InputMaybe<Scalars['String']>;
  smashGGUserId?: InputMaybe<Scalars['Int']>;
  tag?: InputMaybe<Scalars['String']>;
};

export type Zone = {
  __typename?: 'Zone';
  country_code?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

export type RefreshMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshMutation = { __typename?: 'Mutation', refresh?: { __typename?: 'RefreshPayload', accessToken?: string | null } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthPayload', accessToken?: string | null, refreshToken?: string | null } | null };

export type RegisterMutationVariables = Exact<{
  payload: UserRegisterPayload;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }> } | null };

export type AskPasswordResetMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type AskPasswordResetMutation = { __typename?: 'Mutation', askPasswordReset?: string | null };

export type UpdateProfileMutationVariables = Exact<{
  payload: UserUpdatePayload;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'User', twitch_username?: string | null, twitter_username?: string | null, smashgg_slug?: string | null, allow_notifications: boolean, allow_searchability: boolean, updated_at: any, created_at: any, id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }> } | null };

export type PasswordResetMutationVariables = Exact<{
  code: Scalars['String'];
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
}>;


export type PasswordResetMutation = { __typename?: 'Mutation', passwordReset?: boolean | null };

export type SuggestedNameQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type SuggestedNameQuery = { __typename?: 'Query', suggestedName?: { __typename?: 'SuggestedName', tag: string, smashGGUserId: number, smashGGPlayerId: number, profilePicture?: string | null } | null };

export type ProfileQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type ProfileQuery = { __typename?: 'Query', user?: { __typename?: 'User', twitch_username?: string | null, twitter_username?: string | null, smashgg_slug?: string | null, allow_notifications: boolean, allow_searchability: boolean, updated_at: any, created_at: any, id: string, profile_picture?: string | null, tag: string, crew?: { __typename?: 'Crew', banner: string, icon: string, id: string, name: string, prefix: string, members: Array<{ __typename?: 'User', id: string, tag: string }> } | null, waiting_crew?: { __typename?: 'Crew', id: string } | null, tournaments: Array<{ __typename?: 'Tournament', id: string, name: string, images: Array<string> }>, favorited_tournaments: Array<{ __typename?: 'Tournament', id: string, name: string, images: Array<string> }>, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }> } | null };

export type HeaderQueryVariables = Exact<{ [key: string]: never; }>;


export type HeaderQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null, crew?: { __typename?: 'Crew', id: string, prefix: string } | null } | null };

export type UserBaseFragment = { __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }> };

export type CharactersQueryVariables = Exact<{ [key: string]: never; }>;


export type CharactersQuery = { __typename?: 'Query', characters?: Array<{ __typename?: 'Character', id: string, name: string, picture: string } | null> | null };

export type CharacterDataFragment = { __typename?: 'Character', id: string, name: string, picture: string };

export type CrewQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type CrewQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, roles: Array<{ __typename?: 'Role', id: string, name: RoleEnum }>, crew?: { __typename?: 'Crew', id: string } | null } | null, crew?: { __typename?: 'Crew', id: string, banner: string, icon: string, name: string, prefix: string, admin: { __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }, members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }>, waiting_members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }> } | null };

export type KickMemberMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type KickMemberMutation = { __typename?: 'Mutation', kickMember?: { __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null } | null };

export type JoinCrewMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type JoinCrewMutation = { __typename?: 'Mutation', joinCrew?: { __typename?: 'Crew', id: string, banner: string, icon: string, name: string, prefix: string, admin: { __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }, members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }>, waiting_members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }> } | null };

export type UpdateMemberMutationVariables = Exact<{
  action: CrewUpdateActionEnum;
  id: Scalars['ID'];
}>;


export type UpdateMemberMutation = { __typename?: 'Mutation', updateMember?: { __typename?: 'Crew', id: string, banner: string, icon: string, name: string, prefix: string, admin: { __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }, members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }>, waiting_members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }> } | null };

export type TransferCrewOwnershipMutationVariables = Exact<{
  to: Scalars['ID'];
}>;


export type TransferCrewOwnershipMutation = { __typename?: 'Mutation', transferCrewOwnership?: { __typename?: 'Crew', id: string, banner: string, icon: string, name: string, prefix: string, admin: { __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }, members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }>, waiting_members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }> } | null };

export type LeaveCrewMutationVariables = Exact<{ [key: string]: never; }>;


export type LeaveCrewMutation = { __typename?: 'Mutation', leaveCrew?: { __typename?: 'Crew', id: string, banner: string, icon: string, name: string, prefix: string, admin: { __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }, members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }>, waiting_members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }> } | null };

export type BaseCrewFragment = { __typename?: 'Crew', id: string, banner: string, icon: string, name: string, prefix: string, admin: { __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }, members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }>, waiting_members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null }> };

export type CrewMemberFragment = { __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }>, crew?: { __typename?: 'Crew', id: string, prefix: string } | null };

export type SendMatchInviteMutationVariables = Exact<{
  to: Scalars['ID'];
  totalMatches: Scalars['Int'];
  isMoneymatch: Scalars['Boolean'];
  amount?: InputMaybe<Scalars['Int']>;
  tournament?: InputMaybe<Scalars['ID']>;
}>;


export type SendMatchInviteMutation = { __typename?: 'Mutation', sendMatchInvite?: { __typename?: 'Match', id: string, total_matches: number, opponent_wins: number, initiator_wins: number, state: MatchState, opponent?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, initiator?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null } | null };

export type MatchesQueryVariables = Exact<{ [key: string]: never; }>;


export type MatchesQuery = { __typename?: 'Query', matches?: { __typename?: 'MatchConnection', edges?: Array<{ __typename?: 'MatchEdge', cursor: string, node?: { __typename?: 'Match', id: string, total_matches: number, opponent_wins: number, initiator_wins: number, state: MatchState, winner_id?: string | null, opponent?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, initiator?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, battles: Array<{ __typename?: 'Battle', id: string, state: BattleState, opponent_character?: { __typename?: 'Character', id: string, picture: string } | null, initiator_character?: { __typename?: 'Character', id: string, picture: string } | null }> } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } | null };

export type MatchQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MatchQuery = { __typename?: 'Query', match?: { __typename?: 'Match', id: string, total_matches: number, opponent_wins: number, initiator_wins: number, state: MatchState, opponent?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null, in_match: boolean, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }> } | null, initiator?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null, in_match: boolean, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }> } | null, battles: Array<{ __typename?: 'Battle', id: string, state: BattleState, winner_id?: string | null, opponent_character?: { __typename?: 'Character', id: string, name: string, picture: string } | null, opponent?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, initiator_character?: { __typename?: 'Character', id: string, name: string, picture: string } | null, initiator?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, initiator_vote?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, opponent_vote?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null }> } | null };

export type UpdateMatchMutationVariables = Exact<{
  state: MatchState;
  id: Scalars['ID'];
}>;


export type UpdateMatchMutation = { __typename?: 'Mutation', updateMatch?: { __typename?: 'Match', id: string, state: MatchState } | null };

export type UpdateBattleMutationVariables = Exact<{
  id: Scalars['ID'];
  character?: InputMaybe<Scalars['ID']>;
  vote?: InputMaybe<Scalars['ID']>;
  state?: InputMaybe<BattleState>;
}>;


export type UpdateBattleMutation = { __typename?: 'Mutation', updateBattle?: { __typename?: 'Battle', id: string, winner_id?: string | null, opponent?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, opponent_character?: { __typename?: 'Character', id: string, name: string, picture: string } | null, initiator?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, initiator_character?: { __typename?: 'Character', id: string, name: string, picture: string } | null } | null };

export type MatchUpdateStateSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MatchUpdateStateSubscription = { __typename?: 'Subscription', onMatchUpdate?: { __typename?: 'Match', id: string, total_matches: number, opponent_wins: number, initiator_wins: number, state: MatchState, opponent?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null, in_match: boolean, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }> } | null, initiator?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null, in_match: boolean, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }> } | null, battles: Array<{ __typename?: 'Battle', id: string, state: BattleState, winner_id?: string | null, opponent_character?: { __typename?: 'Character', id: string, name: string, picture: string } | null, opponent?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, initiator_character?: { __typename?: 'Character', id: string, name: string, picture: string } | null, initiator?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, initiator_vote?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, opponent_vote?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null }> } | null };

export type BattleUpdateSubscriptionVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type BattleUpdateSubscription = { __typename?: 'Subscription', onBattleUpdate?: { __typename?: 'Battle', id: string, winner_id?: string | null, state: BattleState, opponent_character?: { __typename?: 'Character', id: string, name: string, picture: string } | null, opponent?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, initiator_character?: { __typename?: 'Character', id: string, name: string, picture: string } | null, initiator?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, initiator_vote?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, opponent_vote?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null } | null };

export type UserJoinSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserJoinSubscription = { __typename?: 'Subscription', onUserJoinMatch?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null, in_match: boolean, characters: Array<{ __typename?: 'Character', id: string }> } | null };

export type UserLeftSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserLeftSubscription = { __typename?: 'Subscription', onUserLeftMatch?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null, in_match: boolean, characters: Array<{ __typename?: 'Character', id: string }> } | null };

export type StatsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatsQuery = { __typename?: 'Query', stats?: { __typename?: 'Stats', sets?: { __typename?: 'Stat', wins?: number | null, total?: number | null } | null, matches?: { __typename?: 'Stat', wins?: number | null, total?: number | null } | null, users?: Array<{ __typename?: 'UserStat', user?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null, stat?: { __typename?: 'Stat', wins?: number | null, total?: number | null } | null } | null> | null, characters?: Array<{ __typename?: 'CharacterStat', character?: { __typename?: 'Character', id: string, name: string, picture: string } | null, stat?: { __typename?: 'Stat', wins?: number | null, total?: number | null } | null } | null> | null } | null };

export type TournamentsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<TournamentsFilter>;
}>;


export type TournamentsQuery = { __typename?: 'Query', tournaments?: { __typename?: 'TournamentConnection', edges?: Array<{ __typename?: 'TournamentEdge', cursor: string, node?: { __typename?: 'Tournament', id: string, name: string, city?: string | null, num_attendees?: number | null, start_at?: any | null, images: Array<string>, participants?: { __typename?: 'UserConnection', totalCount: number, edges?: Array<{ __typename?: 'UserEdge', cursor: string, node?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } | null } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } | null };

export type SingleTournamentQueryVariables = Exact<{
  id: Scalars['ID'];
  cursor?: InputMaybe<Scalars['String']>;
  characters?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type SingleTournamentQuery = { __typename?: 'Query', tournament?: { __typename?: 'Tournament', id: string, city?: string | null, end_at?: any | null, lat?: number | null, lng?: number | null, name: string, images: Array<string>, num_attendees?: number | null, slug: string, state: number, tournament_id: number, venue_address?: string | null, venue_name?: string | null, start_at?: any | null, participants?: { __typename?: 'UserConnection', totalCount: number, edges?: Array<{ __typename?: 'UserEdge', cursor: string, node?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null, crew?: { __typename?: 'Crew', prefix: string } | null, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }> } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } | null } | null };

export type NextTournamentQueryVariables = Exact<{ [key: string]: never; }>;


export type NextTournamentQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, nextTournament?: { __typename?: 'Tournament', id: string, name: string, city?: string | null, num_attendees?: number | null, start_at?: any | null, images: Array<string>, participants?: { __typename?: 'UserConnection', totalCount: number, edges?: Array<{ __typename?: 'UserEdge', cursor: string, node?: { __typename?: 'User', id: string, profile_picture?: string | null } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } | null } | null } | null };

export type UsersQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
  filter: UserFilter;
}>;


export type UsersQuery = { __typename?: 'Query', users?: { __typename?: 'UserConnection', edges?: Array<{ __typename?: 'UserEdge', cursor: string, node?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }> } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } | null };

export type UserFilterQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type UserFilterQuery = { __typename?: 'Query', characters?: Array<{ __typename?: 'Character', id: string, name: string, picture: string } | null> | null, tournaments?: { __typename?: 'TournamentConnection', edges?: Array<{ __typename?: 'TournamentEdge', cursor: string, node?: { __typename?: 'Tournament', id: string, name: string, images: Array<string> } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } | null };

export type SetOnlineMutationVariables = Exact<{
  online: Scalars['Boolean'];
}>;


export type SetOnlineMutation = { __typename?: 'Mutation', setOnline?: { __typename?: 'User', id: string, tag: string, in_match: boolean } | null };

export type ZonesQueryVariables = Exact<{
  countryCode: Scalars['String'];
}>;


export type ZonesQuery = { __typename?: 'Query', zones?: Array<{ __typename?: 'Zone', id?: string | null, name?: string | null, country_code?: string | null } | null> | null };

export const UserBaseFragmentDoc = gql`
    fragment UserBase on User {
  id
  profile_picture
  tag
  characters {
    id
    name
    picture
  }
}
    `;
export const CharacterDataFragmentDoc = gql`
    fragment CharacterData on Character {
  id
  name
  picture
}
    `;
export const CrewMemberFragmentDoc = gql`
    fragment CrewMember on User {
  id
  profile_picture
  tag
  characters {
    id
    name
    picture
  }
  crew {
    id
    prefix
  }
}
    `;
export const BaseCrewFragmentDoc = gql`
    fragment BaseCrew on Crew {
  id
  banner
  icon
  name
  prefix
  admin {
    ...CrewMember
  }
  members {
    ...CrewMember
  }
  waiting_members {
    ...CrewMember
  }
}
    ${CrewMemberFragmentDoc}`;
export const RefreshDocument = gql`
    mutation refresh($refreshToken: String!) {
  refresh(refreshToken: $refreshToken) {
    accessToken
  }
}
    `;
export type RefreshMutationFn = Apollo.MutationFunction<RefreshMutation, RefreshMutationVariables>;

/**
 * __useRefreshMutation__
 *
 * To run a mutation, you first call `useRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshMutation, { data, loading, error }] = useRefreshMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshMutation(baseOptions?: Apollo.MutationHookOptions<RefreshMutation, RefreshMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument, options);
      }
export type RefreshMutationHookResult = ReturnType<typeof useRefreshMutation>;
export type RefreshMutationResult = Apollo.MutationResult<RefreshMutation>;
export type RefreshMutationOptions = Apollo.BaseMutationOptions<RefreshMutation, RefreshMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($payload: UserRegisterPayload!) {
  register(payload: $payload) {
    ...UserBase
  }
}
    ${UserBaseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AskPasswordResetDocument = gql`
    mutation askPasswordReset($email: String!) {
  askPasswordReset(email: $email)
}
    `;
export type AskPasswordResetMutationFn = Apollo.MutationFunction<AskPasswordResetMutation, AskPasswordResetMutationVariables>;

/**
 * __useAskPasswordResetMutation__
 *
 * To run a mutation, you first call `useAskPasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAskPasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [askPasswordResetMutation, { data, loading, error }] = useAskPasswordResetMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAskPasswordResetMutation(baseOptions?: Apollo.MutationHookOptions<AskPasswordResetMutation, AskPasswordResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AskPasswordResetMutation, AskPasswordResetMutationVariables>(AskPasswordResetDocument, options);
      }
export type AskPasswordResetMutationHookResult = ReturnType<typeof useAskPasswordResetMutation>;
export type AskPasswordResetMutationResult = Apollo.MutationResult<AskPasswordResetMutation>;
export type AskPasswordResetMutationOptions = Apollo.BaseMutationOptions<AskPasswordResetMutation, AskPasswordResetMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($payload: UserUpdatePayload!) {
  updateProfile(payload: $payload) {
    ...UserBase
    twitch_username
    twitter_username
    smashgg_slug
    allow_notifications
    allow_searchability
    updated_at
    created_at
  }
}
    ${UserBaseFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const PasswordResetDocument = gql`
    mutation passwordReset($code: String!, $confirmPassword: String!, $password: String!) {
  passwordReset(
    code: $code
    confirmPassword: $confirmPassword
    password: $password
  )
}
    `;
export type PasswordResetMutationFn = Apollo.MutationFunction<PasswordResetMutation, PasswordResetMutationVariables>;

/**
 * __usePasswordResetMutation__
 *
 * To run a mutation, you first call `usePasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [passwordResetMutation, { data, loading, error }] = usePasswordResetMutation({
 *   variables: {
 *      code: // value for 'code'
 *      confirmPassword: // value for 'confirmPassword'
 *      password: // value for 'password'
 *   },
 * });
 */
export function usePasswordResetMutation(baseOptions?: Apollo.MutationHookOptions<PasswordResetMutation, PasswordResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PasswordResetMutation, PasswordResetMutationVariables>(PasswordResetDocument, options);
      }
export type PasswordResetMutationHookResult = ReturnType<typeof usePasswordResetMutation>;
export type PasswordResetMutationResult = Apollo.MutationResult<PasswordResetMutation>;
export type PasswordResetMutationOptions = Apollo.BaseMutationOptions<PasswordResetMutation, PasswordResetMutationVariables>;
export const SuggestedNameDocument = gql`
    query suggestedName($slug: String!) {
  suggestedName(slug: $slug) {
    tag
    smashGGUserId
    smashGGPlayerId
    profilePicture
  }
}
    `;

/**
 * __useSuggestedNameQuery__
 *
 * To run a query within a React component, call `useSuggestedNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuggestedNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuggestedNameQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useSuggestedNameQuery(baseOptions: Apollo.QueryHookOptions<SuggestedNameQuery, SuggestedNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SuggestedNameQuery, SuggestedNameQueryVariables>(SuggestedNameDocument, options);
      }
export function useSuggestedNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SuggestedNameQuery, SuggestedNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SuggestedNameQuery, SuggestedNameQueryVariables>(SuggestedNameDocument, options);
        }
export type SuggestedNameQueryHookResult = ReturnType<typeof useSuggestedNameQuery>;
export type SuggestedNameLazyQueryHookResult = ReturnType<typeof useSuggestedNameLazyQuery>;
export type SuggestedNameQueryResult = Apollo.QueryResult<SuggestedNameQuery, SuggestedNameQueryVariables>;
export const ProfileDocument = gql`
    query profile($id: ID) {
  user(id: $id) {
    ...UserBase
    twitch_username
    twitter_username
    smashgg_slug
    allow_notifications
    allow_searchability
    updated_at
    created_at
    crew {
      banner
      icon
      id
      name
      prefix
      members {
        id
        tag
      }
    }
    waiting_crew {
      id
    }
    tournaments {
      id
      name
      images
    }
    favorited_tournaments {
      id
      name
      images
    }
  }
}
    ${UserBaseFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const HeaderDocument = gql`
    query header {
  user {
    id
    tag
    profile_picture
    crew {
      id
      prefix
    }
  }
}
    `;

/**
 * __useHeaderQuery__
 *
 * To run a query within a React component, call `useHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHeaderQuery({
 *   variables: {
 *   },
 * });
 */
export function useHeaderQuery(baseOptions?: Apollo.QueryHookOptions<HeaderQuery, HeaderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HeaderQuery, HeaderQueryVariables>(HeaderDocument, options);
      }
export function useHeaderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HeaderQuery, HeaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HeaderQuery, HeaderQueryVariables>(HeaderDocument, options);
        }
export type HeaderQueryHookResult = ReturnType<typeof useHeaderQuery>;
export type HeaderLazyQueryHookResult = ReturnType<typeof useHeaderLazyQuery>;
export type HeaderQueryResult = Apollo.QueryResult<HeaderQuery, HeaderQueryVariables>;
export const CharactersDocument = gql`
    query Characters {
  characters {
    ...CharacterData
  }
}
    ${CharacterDataFragmentDoc}`;

/**
 * __useCharactersQuery__
 *
 * To run a query within a React component, call `useCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharactersQuery({
 *   variables: {
 *   },
 * });
 */
export function useCharactersQuery(baseOptions?: Apollo.QueryHookOptions<CharactersQuery, CharactersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharactersQuery, CharactersQueryVariables>(CharactersDocument, options);
      }
export function useCharactersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharactersQuery, CharactersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharactersQuery, CharactersQueryVariables>(CharactersDocument, options);
        }
export type CharactersQueryHookResult = ReturnType<typeof useCharactersQuery>;
export type CharactersLazyQueryHookResult = ReturnType<typeof useCharactersLazyQuery>;
export type CharactersQueryResult = Apollo.QueryResult<CharactersQuery, CharactersQueryVariables>;
export const CrewDocument = gql`
    query Crew($id: ID) {
  user {
    id
    roles {
      id
      name
    }
    crew {
      id
    }
  }
  crew(id: $id) {
    ...BaseCrew
  }
}
    ${BaseCrewFragmentDoc}`;

/**
 * __useCrewQuery__
 *
 * To run a query within a React component, call `useCrewQuery` and pass it any options that fit your needs.
 * When your component renders, `useCrewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCrewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCrewQuery(baseOptions?: Apollo.QueryHookOptions<CrewQuery, CrewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CrewQuery, CrewQueryVariables>(CrewDocument, options);
      }
export function useCrewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CrewQuery, CrewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CrewQuery, CrewQueryVariables>(CrewDocument, options);
        }
export type CrewQueryHookResult = ReturnType<typeof useCrewQuery>;
export type CrewLazyQueryHookResult = ReturnType<typeof useCrewLazyQuery>;
export type CrewQueryResult = Apollo.QueryResult<CrewQuery, CrewQueryVariables>;
export const KickMemberDocument = gql`
    mutation KickMember($id: ID!) {
  kickMember(id: $id) {
    ...CrewMember
  }
}
    ${CrewMemberFragmentDoc}`;
export type KickMemberMutationFn = Apollo.MutationFunction<KickMemberMutation, KickMemberMutationVariables>;

/**
 * __useKickMemberMutation__
 *
 * To run a mutation, you first call `useKickMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKickMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [kickMemberMutation, { data, loading, error }] = useKickMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useKickMemberMutation(baseOptions?: Apollo.MutationHookOptions<KickMemberMutation, KickMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<KickMemberMutation, KickMemberMutationVariables>(KickMemberDocument, options);
      }
export type KickMemberMutationHookResult = ReturnType<typeof useKickMemberMutation>;
export type KickMemberMutationResult = Apollo.MutationResult<KickMemberMutation>;
export type KickMemberMutationOptions = Apollo.BaseMutationOptions<KickMemberMutation, KickMemberMutationVariables>;
export const JoinCrewDocument = gql`
    mutation JoinCrew($id: ID!) {
  joinCrew(id: $id) {
    ...BaseCrew
  }
}
    ${BaseCrewFragmentDoc}`;
export type JoinCrewMutationFn = Apollo.MutationFunction<JoinCrewMutation, JoinCrewMutationVariables>;

/**
 * __useJoinCrewMutation__
 *
 * To run a mutation, you first call `useJoinCrewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinCrewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinCrewMutation, { data, loading, error }] = useJoinCrewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinCrewMutation(baseOptions?: Apollo.MutationHookOptions<JoinCrewMutation, JoinCrewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinCrewMutation, JoinCrewMutationVariables>(JoinCrewDocument, options);
      }
export type JoinCrewMutationHookResult = ReturnType<typeof useJoinCrewMutation>;
export type JoinCrewMutationResult = Apollo.MutationResult<JoinCrewMutation>;
export type JoinCrewMutationOptions = Apollo.BaseMutationOptions<JoinCrewMutation, JoinCrewMutationVariables>;
export const UpdateMemberDocument = gql`
    mutation UpdateMember($action: CrewUpdateActionEnum!, $id: ID!) {
  updateMember(action: $action, id: $id) {
    ...BaseCrew
  }
}
    ${BaseCrewFragmentDoc}`;
export type UpdateMemberMutationFn = Apollo.MutationFunction<UpdateMemberMutation, UpdateMemberMutationVariables>;

/**
 * __useUpdateMemberMutation__
 *
 * To run a mutation, you first call `useUpdateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMemberMutation, { data, loading, error }] = useUpdateMemberMutation({
 *   variables: {
 *      action: // value for 'action'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateMemberMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMemberMutation, UpdateMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMemberMutation, UpdateMemberMutationVariables>(UpdateMemberDocument, options);
      }
export type UpdateMemberMutationHookResult = ReturnType<typeof useUpdateMemberMutation>;
export type UpdateMemberMutationResult = Apollo.MutationResult<UpdateMemberMutation>;
export type UpdateMemberMutationOptions = Apollo.BaseMutationOptions<UpdateMemberMutation, UpdateMemberMutationVariables>;
export const TransferCrewOwnershipDocument = gql`
    mutation TransferCrewOwnership($to: ID!) {
  transferCrewOwnership(to: $to) {
    ...BaseCrew
  }
}
    ${BaseCrewFragmentDoc}`;
export type TransferCrewOwnershipMutationFn = Apollo.MutationFunction<TransferCrewOwnershipMutation, TransferCrewOwnershipMutationVariables>;

/**
 * __useTransferCrewOwnershipMutation__
 *
 * To run a mutation, you first call `useTransferCrewOwnershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferCrewOwnershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferCrewOwnershipMutation, { data, loading, error }] = useTransferCrewOwnershipMutation({
 *   variables: {
 *      to: // value for 'to'
 *   },
 * });
 */
export function useTransferCrewOwnershipMutation(baseOptions?: Apollo.MutationHookOptions<TransferCrewOwnershipMutation, TransferCrewOwnershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TransferCrewOwnershipMutation, TransferCrewOwnershipMutationVariables>(TransferCrewOwnershipDocument, options);
      }
export type TransferCrewOwnershipMutationHookResult = ReturnType<typeof useTransferCrewOwnershipMutation>;
export type TransferCrewOwnershipMutationResult = Apollo.MutationResult<TransferCrewOwnershipMutation>;
export type TransferCrewOwnershipMutationOptions = Apollo.BaseMutationOptions<TransferCrewOwnershipMutation, TransferCrewOwnershipMutationVariables>;
export const LeaveCrewDocument = gql`
    mutation LeaveCrew {
  leaveCrew {
    ...BaseCrew
  }
}
    ${BaseCrewFragmentDoc}`;
export type LeaveCrewMutationFn = Apollo.MutationFunction<LeaveCrewMutation, LeaveCrewMutationVariables>;

/**
 * __useLeaveCrewMutation__
 *
 * To run a mutation, you first call `useLeaveCrewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveCrewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveCrewMutation, { data, loading, error }] = useLeaveCrewMutation({
 *   variables: {
 *   },
 * });
 */
export function useLeaveCrewMutation(baseOptions?: Apollo.MutationHookOptions<LeaveCrewMutation, LeaveCrewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveCrewMutation, LeaveCrewMutationVariables>(LeaveCrewDocument, options);
      }
export type LeaveCrewMutationHookResult = ReturnType<typeof useLeaveCrewMutation>;
export type LeaveCrewMutationResult = Apollo.MutationResult<LeaveCrewMutation>;
export type LeaveCrewMutationOptions = Apollo.BaseMutationOptions<LeaveCrewMutation, LeaveCrewMutationVariables>;
export const SendMatchInviteDocument = gql`
    mutation sendMatchInvite($to: ID!, $totalMatches: Int!, $isMoneymatch: Boolean!, $amount: Int, $tournament: ID) {
  sendMatchInvite(
    to: $to
    totalMatches: $totalMatches
    isMoneymatch: $isMoneymatch
    amount: $amount
    tournament: $tournament
  ) {
    id
    total_matches
    opponent_wins
    initiator_wins
    state
    opponent {
      id
      tag
      profile_picture
    }
    initiator {
      id
      tag
      profile_picture
    }
  }
}
    `;
export type SendMatchInviteMutationFn = Apollo.MutationFunction<SendMatchInviteMutation, SendMatchInviteMutationVariables>;

/**
 * __useSendMatchInviteMutation__
 *
 * To run a mutation, you first call `useSendMatchInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMatchInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMatchInviteMutation, { data, loading, error }] = useSendMatchInviteMutation({
 *   variables: {
 *      to: // value for 'to'
 *      totalMatches: // value for 'totalMatches'
 *      isMoneymatch: // value for 'isMoneymatch'
 *      amount: // value for 'amount'
 *      tournament: // value for 'tournament'
 *   },
 * });
 */
export function useSendMatchInviteMutation(baseOptions?: Apollo.MutationHookOptions<SendMatchInviteMutation, SendMatchInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMatchInviteMutation, SendMatchInviteMutationVariables>(SendMatchInviteDocument, options);
      }
export type SendMatchInviteMutationHookResult = ReturnType<typeof useSendMatchInviteMutation>;
export type SendMatchInviteMutationResult = Apollo.MutationResult<SendMatchInviteMutation>;
export type SendMatchInviteMutationOptions = Apollo.BaseMutationOptions<SendMatchInviteMutation, SendMatchInviteMutationVariables>;
export const MatchesDocument = gql`
    query matches {
  matches(first: 10) {
    edges {
      cursor
      node {
        id
        total_matches
        opponent_wins
        initiator_wins
        state
        opponent {
          id
          tag
          profile_picture
        }
        initiator {
          id
          tag
          profile_picture
        }
        winner_id
        battles {
          id
          state
          opponent_character {
            id
            picture
          }
          initiator_character {
            id
            picture
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useMatchesQuery__
 *
 * To run a query within a React component, call `useMatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMatchesQuery(baseOptions?: Apollo.QueryHookOptions<MatchesQuery, MatchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MatchesQuery, MatchesQueryVariables>(MatchesDocument, options);
      }
export function useMatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MatchesQuery, MatchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MatchesQuery, MatchesQueryVariables>(MatchesDocument, options);
        }
export type MatchesQueryHookResult = ReturnType<typeof useMatchesQuery>;
export type MatchesLazyQueryHookResult = ReturnType<typeof useMatchesLazyQuery>;
export type MatchesQueryResult = Apollo.QueryResult<MatchesQuery, MatchesQueryVariables>;
export const MatchDocument = gql`
    query Match($id: ID!) {
  match(id: $id) {
    id
    total_matches
    opponent_wins
    opponent {
      id
      tag
      profile_picture
      in_match
      characters {
        ...CharacterData
      }
    }
    initiator_wins
    initiator {
      id
      tag
      profile_picture
      in_match
      characters {
        ...CharacterData
      }
    }
    state
    battles {
      id
      state
      winner_id
      opponent_character {
        ...CharacterData
      }
      opponent {
        id
        tag
        profile_picture
      }
      initiator_character {
        ...CharacterData
      }
      initiator {
        id
        tag
        profile_picture
      }
      initiator_vote {
        id
        tag
        profile_picture
      }
      opponent_vote {
        id
        tag
        profile_picture
      }
    }
  }
}
    ${CharacterDataFragmentDoc}`;

/**
 * __useMatchQuery__
 *
 * To run a query within a React component, call `useMatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMatchQuery(baseOptions: Apollo.QueryHookOptions<MatchQuery, MatchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MatchQuery, MatchQueryVariables>(MatchDocument, options);
      }
export function useMatchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MatchQuery, MatchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MatchQuery, MatchQueryVariables>(MatchDocument, options);
        }
export type MatchQueryHookResult = ReturnType<typeof useMatchQuery>;
export type MatchLazyQueryHookResult = ReturnType<typeof useMatchLazyQuery>;
export type MatchQueryResult = Apollo.QueryResult<MatchQuery, MatchQueryVariables>;
export const UpdateMatchDocument = gql`
    mutation updateMatch($state: MatchState!, $id: ID!) {
  updateMatch(state: $state, id: $id) {
    id
    state
  }
}
    `;
export type UpdateMatchMutationFn = Apollo.MutationFunction<UpdateMatchMutation, UpdateMatchMutationVariables>;

/**
 * __useUpdateMatchMutation__
 *
 * To run a mutation, you first call `useUpdateMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMatchMutation, { data, loading, error }] = useUpdateMatchMutation({
 *   variables: {
 *      state: // value for 'state'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateMatchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMatchMutation, UpdateMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMatchMutation, UpdateMatchMutationVariables>(UpdateMatchDocument, options);
      }
export type UpdateMatchMutationHookResult = ReturnType<typeof useUpdateMatchMutation>;
export type UpdateMatchMutationResult = Apollo.MutationResult<UpdateMatchMutation>;
export type UpdateMatchMutationOptions = Apollo.BaseMutationOptions<UpdateMatchMutation, UpdateMatchMutationVariables>;
export const UpdateBattleDocument = gql`
    mutation updateBattle($id: ID!, $character: ID, $vote: ID, $state: BattleState) {
  updateBattle(id: $id, character: $character, vote: $vote, state: $state) {
    id
    winner_id
    opponent {
      id
      tag
      profile_picture
    }
    opponent_character {
      ...CharacterData
    }
    initiator {
      id
      tag
      profile_picture
    }
    initiator_character {
      ...CharacterData
    }
  }
}
    ${CharacterDataFragmentDoc}`;
export type UpdateBattleMutationFn = Apollo.MutationFunction<UpdateBattleMutation, UpdateBattleMutationVariables>;

/**
 * __useUpdateBattleMutation__
 *
 * To run a mutation, you first call `useUpdateBattleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBattleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBattleMutation, { data, loading, error }] = useUpdateBattleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      character: // value for 'character'
 *      vote: // value for 'vote'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useUpdateBattleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBattleMutation, UpdateBattleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBattleMutation, UpdateBattleMutationVariables>(UpdateBattleDocument, options);
      }
export type UpdateBattleMutationHookResult = ReturnType<typeof useUpdateBattleMutation>;
export type UpdateBattleMutationResult = Apollo.MutationResult<UpdateBattleMutation>;
export type UpdateBattleMutationOptions = Apollo.BaseMutationOptions<UpdateBattleMutation, UpdateBattleMutationVariables>;
export const MatchUpdateStateDocument = gql`
    subscription matchUpdateState($id: ID!) {
  onMatchUpdate(id: $id) {
    id
    total_matches
    opponent_wins
    opponent {
      id
      tag
      profile_picture
      in_match
      characters {
        ...CharacterData
      }
    }
    initiator_wins
    initiator {
      id
      tag
      profile_picture
      in_match
      characters {
        ...CharacterData
      }
    }
    state
    battles {
      id
      state
      winner_id
      opponent_character {
        ...CharacterData
      }
      opponent {
        id
        tag
        profile_picture
      }
      initiator_character {
        ...CharacterData
      }
      initiator {
        id
        tag
        profile_picture
      }
      initiator_vote {
        id
        tag
        profile_picture
      }
      opponent_vote {
        id
        tag
        profile_picture
      }
    }
  }
}
    ${CharacterDataFragmentDoc}`;

/**
 * __useMatchUpdateStateSubscription__
 *
 * To run a query within a React component, call `useMatchUpdateStateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMatchUpdateStateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchUpdateStateSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMatchUpdateStateSubscription(baseOptions: Apollo.SubscriptionHookOptions<MatchUpdateStateSubscription, MatchUpdateStateSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MatchUpdateStateSubscription, MatchUpdateStateSubscriptionVariables>(MatchUpdateStateDocument, options);
      }
export type MatchUpdateStateSubscriptionHookResult = ReturnType<typeof useMatchUpdateStateSubscription>;
export type MatchUpdateStateSubscriptionResult = Apollo.SubscriptionResult<MatchUpdateStateSubscription>;
export const BattleUpdateDocument = gql`
    subscription battleUpdate($id: ID) {
  onBattleUpdate(id: $id) {
    id
    winner_id
    state
    opponent_character {
      ...CharacterData
    }
    opponent {
      id
      tag
      profile_picture
    }
    initiator_character {
      ...CharacterData
    }
    initiator {
      id
      tag
      profile_picture
    }
    initiator_vote {
      id
      tag
      profile_picture
    }
    opponent_vote {
      id
      tag
      profile_picture
    }
  }
}
    ${CharacterDataFragmentDoc}`;

/**
 * __useBattleUpdateSubscription__
 *
 * To run a query within a React component, call `useBattleUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBattleUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBattleUpdateSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBattleUpdateSubscription(baseOptions?: Apollo.SubscriptionHookOptions<BattleUpdateSubscription, BattleUpdateSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<BattleUpdateSubscription, BattleUpdateSubscriptionVariables>(BattleUpdateDocument, options);
      }
export type BattleUpdateSubscriptionHookResult = ReturnType<typeof useBattleUpdateSubscription>;
export type BattleUpdateSubscriptionResult = Apollo.SubscriptionResult<BattleUpdateSubscription>;
export const UserJoinDocument = gql`
    subscription userJoin($id: ID!) {
  onUserJoinMatch(id: $id) {
    id
    tag
    profile_picture
    in_match
    characters {
      id
    }
  }
}
    `;

/**
 * __useUserJoinSubscription__
 *
 * To run a query within a React component, call `useUserJoinSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserJoinSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserJoinSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserJoinSubscription(baseOptions: Apollo.SubscriptionHookOptions<UserJoinSubscription, UserJoinSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserJoinSubscription, UserJoinSubscriptionVariables>(UserJoinDocument, options);
      }
export type UserJoinSubscriptionHookResult = ReturnType<typeof useUserJoinSubscription>;
export type UserJoinSubscriptionResult = Apollo.SubscriptionResult<UserJoinSubscription>;
export const UserLeftDocument = gql`
    subscription userLeft($id: ID!) {
  onUserLeftMatch(id: $id) {
    id
    tag
    profile_picture
    in_match
    characters {
      id
    }
  }
}
    `;

/**
 * __useUserLeftSubscription__
 *
 * To run a query within a React component, call `useUserLeftSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserLeftSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserLeftSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserLeftSubscription(baseOptions: Apollo.SubscriptionHookOptions<UserLeftSubscription, UserLeftSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserLeftSubscription, UserLeftSubscriptionVariables>(UserLeftDocument, options);
      }
export type UserLeftSubscriptionHookResult = ReturnType<typeof useUserLeftSubscription>;
export type UserLeftSubscriptionResult = Apollo.SubscriptionResult<UserLeftSubscription>;
export const StatsDocument = gql`
    query Stats {
  stats {
    sets {
      wins
      total
    }
    matches {
      wins
      total
    }
    users {
      user {
        id
        tag
        profile_picture
      }
      stat {
        wins
        total
      }
    }
    characters {
      character {
        id
        name
        picture
      }
      stat {
        wins
        total
      }
    }
  }
}
    `;

/**
 * __useStatsQuery__
 *
 * To run a query within a React component, call `useStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatsQuery(baseOptions?: Apollo.QueryHookOptions<StatsQuery, StatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
      }
export function useStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatsQuery, StatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatsQuery, StatsQueryVariables>(StatsDocument, options);
        }
export type StatsQueryHookResult = ReturnType<typeof useStatsQuery>;
export type StatsLazyQueryHookResult = ReturnType<typeof useStatsLazyQuery>;
export type StatsQueryResult = Apollo.QueryResult<StatsQuery, StatsQueryVariables>;
export const TournamentsDocument = gql`
    query Tournaments($cursor: String, $filters: TournamentsFilter) {
  tournaments(first: 10, after: $cursor, filters: $filters) {
    edges {
      cursor
      node {
        id
        name
        city
        num_attendees
        start_at
        images
        participants(first: 3) {
          edges {
            cursor
            node {
              id
              tag
              profile_picture
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
          totalCount
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useTournamentsQuery__
 *
 * To run a query within a React component, call `useTournamentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTournamentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTournamentsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useTournamentsQuery(baseOptions?: Apollo.QueryHookOptions<TournamentsQuery, TournamentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TournamentsQuery, TournamentsQueryVariables>(TournamentsDocument, options);
      }
export function useTournamentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TournamentsQuery, TournamentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TournamentsQuery, TournamentsQueryVariables>(TournamentsDocument, options);
        }
export type TournamentsQueryHookResult = ReturnType<typeof useTournamentsQuery>;
export type TournamentsLazyQueryHookResult = ReturnType<typeof useTournamentsLazyQuery>;
export type TournamentsQueryResult = Apollo.QueryResult<TournamentsQuery, TournamentsQueryVariables>;
export const SingleTournamentDocument = gql`
    query SingleTournament($id: ID!, $cursor: String, $characters: [ID!]) {
  tournament(id: $id) {
    id
    city
    end_at
    lat
    lng
    name
    images
    num_attendees
    slug
    state
    tournament_id
    venue_address
    venue_name
    start_at
    end_at
    participants(first: 10, after: $cursor, characters: $characters) {
      edges {
        cursor
        node {
          id
          tag
          profile_picture
          crew {
            prefix
          }
          characters {
            id
            name
            picture
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
}
    `;

/**
 * __useSingleTournamentQuery__
 *
 * To run a query within a React component, call `useSingleTournamentQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleTournamentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleTournamentQuery({
 *   variables: {
 *      id: // value for 'id'
 *      cursor: // value for 'cursor'
 *      characters: // value for 'characters'
 *   },
 * });
 */
export function useSingleTournamentQuery(baseOptions: Apollo.QueryHookOptions<SingleTournamentQuery, SingleTournamentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SingleTournamentQuery, SingleTournamentQueryVariables>(SingleTournamentDocument, options);
      }
export function useSingleTournamentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleTournamentQuery, SingleTournamentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SingleTournamentQuery, SingleTournamentQueryVariables>(SingleTournamentDocument, options);
        }
export type SingleTournamentQueryHookResult = ReturnType<typeof useSingleTournamentQuery>;
export type SingleTournamentLazyQueryHookResult = ReturnType<typeof useSingleTournamentLazyQuery>;
export type SingleTournamentQueryResult = Apollo.QueryResult<SingleTournamentQuery, SingleTournamentQueryVariables>;
export const NextTournamentDocument = gql`
    query NextTournament {
  user {
    id
    nextTournament {
      id
      name
      city
      num_attendees
      start_at
      images
      participants(first: 3) {
        edges {
          cursor
          node {
            id
            profile_picture
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
        totalCount
      }
    }
  }
}
    `;

/**
 * __useNextTournamentQuery__
 *
 * To run a query within a React component, call `useNextTournamentQuery` and pass it any options that fit your needs.
 * When your component renders, `useNextTournamentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNextTournamentQuery({
 *   variables: {
 *   },
 * });
 */
export function useNextTournamentQuery(baseOptions?: Apollo.QueryHookOptions<NextTournamentQuery, NextTournamentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NextTournamentQuery, NextTournamentQueryVariables>(NextTournamentDocument, options);
      }
export function useNextTournamentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NextTournamentQuery, NextTournamentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NextTournamentQuery, NextTournamentQueryVariables>(NextTournamentDocument, options);
        }
export type NextTournamentQueryHookResult = ReturnType<typeof useNextTournamentQuery>;
export type NextTournamentLazyQueryHookResult = ReturnType<typeof useNextTournamentLazyQuery>;
export type NextTournamentQueryResult = Apollo.QueryResult<NextTournamentQuery, NextTournamentQueryVariables>;
export const UsersDocument = gql`
    query users($first: Int!, $after: String, $filter: UserFilter!) {
  users(first: $first, after: $after, filters: $filter) {
    edges {
      cursor
      node {
        id
        tag
        profile_picture
        characters {
          ...CharacterData
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    ${CharacterDataFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUsersQuery(baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserFilterDocument = gql`
    query userFilter($cursor: String) {
  characters {
    ...CharacterData
  }
  tournaments(first: 20, after: $cursor) {
    edges {
      cursor
      node {
        id
        name
        images
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    ${CharacterDataFragmentDoc}`;

/**
 * __useUserFilterQuery__
 *
 * To run a query within a React component, call `useUserFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFilterQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useUserFilterQuery(baseOptions?: Apollo.QueryHookOptions<UserFilterQuery, UserFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFilterQuery, UserFilterQueryVariables>(UserFilterDocument, options);
      }
export function useUserFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFilterQuery, UserFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFilterQuery, UserFilterQueryVariables>(UserFilterDocument, options);
        }
export type UserFilterQueryHookResult = ReturnType<typeof useUserFilterQuery>;
export type UserFilterLazyQueryHookResult = ReturnType<typeof useUserFilterLazyQuery>;
export type UserFilterQueryResult = Apollo.QueryResult<UserFilterQuery, UserFilterQueryVariables>;
export const SetOnlineDocument = gql`
    mutation setOnline($online: Boolean!) {
  setOnline(online: $online) {
    id
    tag
    in_match
  }
}
    `;
export type SetOnlineMutationFn = Apollo.MutationFunction<SetOnlineMutation, SetOnlineMutationVariables>;

/**
 * __useSetOnlineMutation__
 *
 * To run a mutation, you first call `useSetOnlineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetOnlineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setOnlineMutation, { data, loading, error }] = useSetOnlineMutation({
 *   variables: {
 *      online: // value for 'online'
 *   },
 * });
 */
export function useSetOnlineMutation(baseOptions?: Apollo.MutationHookOptions<SetOnlineMutation, SetOnlineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetOnlineMutation, SetOnlineMutationVariables>(SetOnlineDocument, options);
      }
export type SetOnlineMutationHookResult = ReturnType<typeof useSetOnlineMutation>;
export type SetOnlineMutationResult = Apollo.MutationResult<SetOnlineMutation>;
export type SetOnlineMutationOptions = Apollo.BaseMutationOptions<SetOnlineMutation, SetOnlineMutationVariables>;
export const ZonesDocument = gql`
    query Zones($countryCode: String!) {
  zones(countryCode: $countryCode) {
    id
    name
    country_code
  }
}
    `;

/**
 * __useZonesQuery__
 *
 * To run a query within a React component, call `useZonesQuery` and pass it any options that fit your needs.
 * When your component renders, `useZonesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useZonesQuery({
 *   variables: {
 *      countryCode: // value for 'countryCode'
 *   },
 * });
 */
export function useZonesQuery(baseOptions: Apollo.QueryHookOptions<ZonesQuery, ZonesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ZonesQuery, ZonesQueryVariables>(ZonesDocument, options);
      }
export function useZonesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ZonesQuery, ZonesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ZonesQuery, ZonesQueryVariables>(ZonesDocument, options);
        }
export type ZonesQueryHookResult = ReturnType<typeof useZonesQuery>;
export type ZonesLazyQueryHookResult = ReturnType<typeof useZonesLazyQuery>;
export type ZonesQueryResult = Apollo.QueryResult<ZonesQuery, ZonesQueryVariables>;