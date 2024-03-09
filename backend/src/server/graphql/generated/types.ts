import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Contact: Contact;
  ContactWithId: ResolverTypeWrapper<ContactWithId>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PartialContact: PartialContact;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: User;
  UserCredentials: UserCredentials;
  UserWithID: ResolverTypeWrapper<UserWithId>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Contact: Contact;
  ContactWithId: ContactWithId;
  Int: Scalars['Int']['output'];
  Mutation: {};
  PartialContact: PartialContact;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
  UserCredentials: UserCredentials;
  UserWithID: UserWithId;
};

export type ContactWithIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContactWithId'] = ResolversParentTypes['ContactWithId']> = {
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createContact?: Resolver<ResolversTypes['ContactWithId'], ParentType, ContextType, RequireFields<MutationCreateContactArgs, 'contact'>>;
  deleteContact?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteContactArgs, 'id'>>;
  register?: Resolver<ResolversTypes['UserWithID'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'user'>>;
  updateContact?: Resolver<ResolversTypes['ContactWithId'], ParentType, ContextType, RequireFields<MutationUpdateContactArgs, 'contact' | 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  emailIsAvailable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryEmailIsAvailableArgs, 'email'>>;
  findContacts?: Resolver<Array<ResolversTypes['ContactWithId']>, ParentType, ContextType>;
  login?: Resolver<ResolversTypes['UserWithID'], ParentType, ContextType, RequireFields<QueryLoginArgs, 'credentials'>>;
  refreshAccessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryRefreshAccessTokenArgs, 'id' | 'refreshToken'>>;
};

export type UserWithIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWithID'] = ResolversParentTypes['UserWithID']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ContactWithId?: ContactWithIdResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UserWithID?: UserWithIdResolvers<ContextType>;
};

