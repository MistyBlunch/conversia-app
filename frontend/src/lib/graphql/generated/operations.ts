import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Contact = {
  age: Scalars['Int']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type ContactWithId = {
  __typename?: 'ContactWithId';
  age: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContact: ContactWithId;
  deleteContact?: Maybe<Scalars['Boolean']['output']>;
  register: UserWithId;
  updateContact: ContactWithId;
};


export type MutationCreateContactArgs = {
  contact: Contact;
};


export type MutationDeleteContactArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRegisterArgs = {
  user: User;
};


export type MutationUpdateContactArgs = {
  contact: PartialContact;
  id: Scalars['Int']['input'];
};

export type PartialContact = {
  age?: InputMaybe<Scalars['Int']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  emailIsAvailable: Scalars['Boolean']['output'];
  findContacts: Array<ContactWithId>;
  login: UserWithId;
  refreshAccessToken: Scalars['String']['output'];
};


export type QueryEmailIsAvailableArgs = {
  email: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  credentials: UserCredentials;
};


export type QueryRefreshAccessTokenArgs = {
  id: Scalars['Int']['input'];
  refreshToken: Scalars['String']['input'];
};

export type User = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserCredentials = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserWithId = {
  __typename?: 'UserWithID';
  accessToken: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type LoginQueryVariables = Exact<{
  credentials: UserCredentials;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'UserWithID', id: number, name: string, accessToken: string, refreshToken: string } };

export type RegisterMutationVariables = Exact<{
  user: User;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserWithID', id: number, name: string, accessToken: string, refreshToken: string } };

export type EmailIsAvailableQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type EmailIsAvailableQuery = { __typename?: 'Query', emailIsAvailable: boolean };

export type RefreshAccessTokenQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshAccessTokenQuery = { __typename?: 'Query', refreshAccessToken: string };

export type CreateContactMutationVariables = Exact<{
  contact: Contact;
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact: { __typename?: 'ContactWithId', id: number, name: string, lastName: string, age: number, phone: string } };

export type FindContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindContactsQuery = { __typename?: 'Query', findContacts: Array<{ __typename?: 'ContactWithId', id: number, name: string, lastName: string, age: number, phone: string }> };

export type UpdateContactMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  contact: PartialContact;
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', updateContact: { __typename?: 'ContactWithId', id: number, name: string, lastName: string, age: number, phone: string } };

export type DeleteContactMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact?: boolean | null };


export const LoginDocument = gql`
    query Login($credentials: UserCredentials!) {
  login(credentials: $credentials) {
    id
    name
    accessToken
    refreshToken
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($user: User!) {
  register(user: $user) {
    id
    name
    accessToken
    refreshToken
  }
}
    `;
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
 *      user: // value for 'user'
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
export const EmailIsAvailableDocument = gql`
    query EmailIsAvailable($email: String!) {
  emailIsAvailable(email: $email)
}
    `;

/**
 * __useEmailIsAvailableQuery__
 *
 * To run a query within a React component, call `useEmailIsAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmailIsAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmailIsAvailableQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useEmailIsAvailableQuery(baseOptions: Apollo.QueryHookOptions<EmailIsAvailableQuery, EmailIsAvailableQueryVariables> & ({ variables: EmailIsAvailableQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmailIsAvailableQuery, EmailIsAvailableQueryVariables>(EmailIsAvailableDocument, options);
      }
export function useEmailIsAvailableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmailIsAvailableQuery, EmailIsAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmailIsAvailableQuery, EmailIsAvailableQueryVariables>(EmailIsAvailableDocument, options);
        }
export function useEmailIsAvailableSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EmailIsAvailableQuery, EmailIsAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EmailIsAvailableQuery, EmailIsAvailableQueryVariables>(EmailIsAvailableDocument, options);
        }
export type EmailIsAvailableQueryHookResult = ReturnType<typeof useEmailIsAvailableQuery>;
export type EmailIsAvailableLazyQueryHookResult = ReturnType<typeof useEmailIsAvailableLazyQuery>;
export type EmailIsAvailableSuspenseQueryHookResult = ReturnType<typeof useEmailIsAvailableSuspenseQuery>;
export type EmailIsAvailableQueryResult = Apollo.QueryResult<EmailIsAvailableQuery, EmailIsAvailableQueryVariables>;
export const RefreshAccessTokenDocument = gql`
    query RefreshAccessToken($id: Int!, $refreshToken: String!) {
  refreshAccessToken(id: $id, refreshToken: $refreshToken)
}
    `;

/**
 * __useRefreshAccessTokenQuery__
 *
 * To run a query within a React component, call `useRefreshAccessTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefreshAccessTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefreshAccessTokenQuery({
 *   variables: {
 *      id: // value for 'id'
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshAccessTokenQuery(baseOptions: Apollo.QueryHookOptions<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables> & ({ variables: RefreshAccessTokenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>(RefreshAccessTokenDocument, options);
      }
export function useRefreshAccessTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>(RefreshAccessTokenDocument, options);
        }
export function useRefreshAccessTokenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>(RefreshAccessTokenDocument, options);
        }
export type RefreshAccessTokenQueryHookResult = ReturnType<typeof useRefreshAccessTokenQuery>;
export type RefreshAccessTokenLazyQueryHookResult = ReturnType<typeof useRefreshAccessTokenLazyQuery>;
export type RefreshAccessTokenSuspenseQueryHookResult = ReturnType<typeof useRefreshAccessTokenSuspenseQuery>;
export type RefreshAccessTokenQueryResult = Apollo.QueryResult<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>;
export const CreateContactDocument = gql`
    mutation CreateContact($contact: Contact!) {
  createContact(contact: $contact) {
    id
    name
    lastName
    age
    phone
  }
}
    `;
export type CreateContactMutationFn = Apollo.MutationFunction<CreateContactMutation, CreateContactMutationVariables>;

/**
 * __useCreateContactMutation__
 *
 * To run a mutation, you first call `useCreateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContactMutation, { data, loading, error }] = useCreateContactMutation({
 *   variables: {
 *      contact: // value for 'contact'
 *   },
 * });
 */
export function useCreateContactMutation(baseOptions?: Apollo.MutationHookOptions<CreateContactMutation, CreateContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContactMutation, CreateContactMutationVariables>(CreateContactDocument, options);
      }
export type CreateContactMutationHookResult = ReturnType<typeof useCreateContactMutation>;
export type CreateContactMutationResult = Apollo.MutationResult<CreateContactMutation>;
export type CreateContactMutationOptions = Apollo.BaseMutationOptions<CreateContactMutation, CreateContactMutationVariables>;
export const FindContactsDocument = gql`
    query FindContacts {
  findContacts {
    id
    name
    lastName
    age
    phone
  }
}
    `;

/**
 * __useFindContactsQuery__
 *
 * To run a query within a React component, call `useFindContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindContactsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindContactsQuery(baseOptions?: Apollo.QueryHookOptions<FindContactsQuery, FindContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindContactsQuery, FindContactsQueryVariables>(FindContactsDocument, options);
      }
export function useFindContactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindContactsQuery, FindContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindContactsQuery, FindContactsQueryVariables>(FindContactsDocument, options);
        }
export function useFindContactsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindContactsQuery, FindContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindContactsQuery, FindContactsQueryVariables>(FindContactsDocument, options);
        }
export type FindContactsQueryHookResult = ReturnType<typeof useFindContactsQuery>;
export type FindContactsLazyQueryHookResult = ReturnType<typeof useFindContactsLazyQuery>;
export type FindContactsSuspenseQueryHookResult = ReturnType<typeof useFindContactsSuspenseQuery>;
export type FindContactsQueryResult = Apollo.QueryResult<FindContactsQuery, FindContactsQueryVariables>;
export const UpdateContactDocument = gql`
    mutation UpdateContact($id: Int!, $contact: PartialContact!) {
  updateContact(id: $id, contact: $contact) {
    id
    name
    lastName
    age
    phone
  }
}
    `;
export type UpdateContactMutationFn = Apollo.MutationFunction<UpdateContactMutation, UpdateContactMutationVariables>;

/**
 * __useUpdateContactMutation__
 *
 * To run a mutation, you first call `useUpdateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContactMutation, { data, loading, error }] = useUpdateContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *      contact: // value for 'contact'
 *   },
 * });
 */
export function useUpdateContactMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContactMutation, UpdateContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContactMutation, UpdateContactMutationVariables>(UpdateContactDocument, options);
      }
export type UpdateContactMutationHookResult = ReturnType<typeof useUpdateContactMutation>;
export type UpdateContactMutationResult = Apollo.MutationResult<UpdateContactMutation>;
export type UpdateContactMutationOptions = Apollo.BaseMutationOptions<UpdateContactMutation, UpdateContactMutationVariables>;
export const DeleteContactDocument = gql`
    mutation DeleteContact($id: Int!) {
  deleteContact(id: $id)
}
    `;
export type DeleteContactMutationFn = Apollo.MutationFunction<DeleteContactMutation, DeleteContactMutationVariables>;

/**
 * __useDeleteContactMutation__
 *
 * To run a mutation, you first call `useDeleteContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContactMutation, { data, loading, error }] = useDeleteContactMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteContactMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContactMutation, DeleteContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContactMutation, DeleteContactMutationVariables>(DeleteContactDocument, options);
      }
export type DeleteContactMutationHookResult = ReturnType<typeof useDeleteContactMutation>;
export type DeleteContactMutationResult = Apollo.MutationResult<DeleteContactMutation>;
export type DeleteContactMutationOptions = Apollo.BaseMutationOptions<DeleteContactMutation, DeleteContactMutationVariables>;