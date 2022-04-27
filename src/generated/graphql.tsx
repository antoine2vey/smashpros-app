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
  /** Date custom scalar type */
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
  adversary: User;
  adversary_character: Character;
  id: Scalars['ID'];
  initiator: User;
  initiator_character: Character;
  winner?: Maybe<User>;
};

export type Character = {
  __typename?: 'Character';
  id: Scalars['ID'];
  name: Scalars['String'];
  picture: Scalars['String'];
  users: Array<User>;
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
  adversary: User;
  adversary_wins: Scalars['Int'];
  amount?: Maybe<Scalars['Int']>;
  battles: Array<Battle>;
  id: Scalars['ID'];
  initiator: User;
  intiator_wins: Scalars['Int'];
  is_moneymatch: Scalars['Boolean'];
  state: MatchState;
  total_matches: Scalars['Int'];
};

export type MatchConnection = {
  __typename?: 'MatchConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<MatchEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type MatchEdge = {
  __typename?: 'MatchEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
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
  kickMember?: Maybe<Crew>;
  login?: Maybe<AuthPayload>;
  participateTournament?: Maybe<Tournament>;
  passwordReset?: Maybe<Scalars['Boolean']>;
  refresh?: Maybe<RefreshPayload>;
  register?: Maybe<User>;
  sendMatchInvite?: Maybe<Match>;
  synchronizeTournaments?: Maybe<Array<Maybe<Tournament>>>;
  updateMatchScore?: Maybe<Match>;
  updateMatchState?: Maybe<Match>;
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
};


export type MutationUpdateMatchScoreArgs = {
  adversaryCharacter: Scalars['ID'];
  id: Scalars['ID'];
  initiatorCharacter: Scalars['ID'];
};


export type MutationUpdateMatchStateArgs = {
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

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  battles?: Maybe<Array<Battle>>;
  characters?: Maybe<Array<Maybe<Character>>>;
  crew?: Maybe<Crew>;
  crews?: Maybe<Array<Maybe<Crew>>>;
  events?: Maybe<Array<Event>>;
  matches?: Maybe<MatchConnection>;
  suggestedName?: Maybe<SuggestedName>;
  tournament?: Maybe<Tournament>;
  tournaments?: Maybe<TournamentConnection>;
  user?: Maybe<User>;
  usersByCharacter?: Maybe<Array<User>>;
};


export type QueryCrewArgs = {
  id?: InputMaybe<Scalars['ID']>;
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
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersByCharacterArgs = {
  id: Scalars['ID'];
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

export type Subscription = {
  __typename?: 'Subscription';
  userEnteredTournament: User;
  userLeftTournament: User;
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
  participants?: Maybe<TournamentParticipants_Connection>;
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
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<TournamentEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type TournamentEdge = {
  __typename?: 'TournamentEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Tournament>;
};

export type TournamentParticipants_Connection = {
  __typename?: 'TournamentParticipants_Connection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type TournamentQuery = {
  id?: InputMaybe<Scalars['ID']>;
  player?: InputMaybe<Scalars['String']>;
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
  in_tournament: Scalars['Boolean'];
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

export type UserEdge = {
  __typename?: 'UserEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<User>;
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

export type UserUpdatePayload = {
  characters: Array<Scalars['ID']>;
  email: Scalars['String'];
  password: Scalars['String'];
  profilePicture?: InputMaybe<Scalars['Upload']>;
  smashGGPlayerId?: InputMaybe<Scalars['Int']>;
  smashGGSlug?: InputMaybe<Scalars['String']>;
  smashGGUserId?: InputMaybe<Scalars['Int']>;
  tag: Scalars['String'];
  twitchUsername?: InputMaybe<Scalars['String']>;
  twitterUsername?: InputMaybe<Scalars['String']>;
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

export type CrewQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type CrewQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, roles: Array<{ __typename?: 'Role', id: string, name: RoleEnum }>, crew?: { __typename?: 'Crew', id: string } | null } | null, crew?: { __typename?: 'Crew', id: string, banner: string, icon: string, name: string, prefix: string, admin: { __typename?: 'User', id: string }, members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }> }>, waiting_members: Array<{ __typename?: 'User', id: string, profile_picture?: string | null, tag: string, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }> }> } | null };

export type TournamentsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type TournamentsQuery = { __typename?: 'Query', tournaments?: { __typename?: 'TournamentConnection', edges?: Array<{ __typename?: 'TournamentEdge', cursor: string, node?: { __typename?: 'Tournament', id: string, name: string, city?: string | null, num_attendees?: number | null, start_at?: any | null, images: Array<string>, participants?: { __typename?: 'TournamentParticipants_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'UserEdge', cursor: string, node?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null } | null } | null> | null } | null } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } | null, crew?: { __typename?: 'Crew', id: string } | null, crews?: Array<{ __typename?: 'Crew', banner: string, icon: string, id: string, name: string } | null> | null };

export type SingleTournamentQueryVariables = Exact<{
  id: Scalars['ID'];
  cursor?: InputMaybe<Scalars['String']>;
  characters?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type SingleTournamentQuery = { __typename?: 'Query', tournament?: { __typename?: 'Tournament', id: string, city?: string | null, end_at?: any | null, lat?: number | null, lng?: number | null, name: string, images: Array<string>, num_attendees?: number | null, slug: string, state: number, tournament_id: number, venue_address?: string | null, venue_name?: string | null, participants?: { __typename?: 'TournamentParticipants_Connection', totalCount?: number | null, edges?: Array<{ __typename?: 'UserEdge', cursor: string, node?: { __typename?: 'User', id: string, tag: string, profile_picture?: string | null, crew?: { __typename?: 'Crew', prefix: string } | null, characters: Array<{ __typename?: 'Character', id: string, name: string, picture: string }> } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } | null } | null };

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
    id
    name
    picture
  }
}
    `;

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
    id
    banner
    icon
    name
    prefix
    admin {
      id
    }
    members {
      id
      profile_picture
      tag
      characters {
        id
        name
        picture
      }
    }
    waiting_members {
      id
      profile_picture
      tag
      characters {
        id
        name
        picture
      }
    }
  }
}
    `;

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
export const TournamentsDocument = gql`
    query Tournaments($cursor: String) {
  tournaments(first: 10, after: $cursor) {
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
          totalCount
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  crew {
    id
  }
  crews {
    banner
    icon
    id
    name
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
    slug
    state
    tournament_id
    venue_address
    venue_name
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