import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  fullName?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser: Scalars['Boolean']['output'];
  updateUser: User;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, fullName?: string | null, email: string, createdAt: any, updatedAt?: any | null } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, fullName?: string | null, email: string, createdAt: any, updatedAt?: any | null } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, fullName?: string | null, email: string, createdAt: any, updatedAt?: any | null }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, fullName?: string | null, email: string, createdAt: any, updatedAt?: any | null } | null };


export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    fullName
    email
    createdAt
    updatedAt
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    fullName
    email
    createdAt
    updatedAt
  }
}
    `;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
    `;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    fullName
    email
    createdAt
    updatedAt
  }
}
    `;

export function useGetUsersQuery(options?: Omit<Urql.UseQueryArgs<never, GetUsersQueryVariables | undefined>, 'query'>) {
  return Urql.useQuery<GetUsersQuery, GetUsersQueryVariables | undefined>({ query: GetUsersDocument, variables: undefined, ...options });
};
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  user(id: $id) {
    id
    fullName
    email
    createdAt
    updatedAt
  }
}
    `;

export function useGetUserQuery(options?: Omit<Urql.UseQueryArgs<never, GetUserQueryVariables | undefined>, 'query'>) {
  return Urql.useQuery<GetUserQuery, GetUserQueryVariables | undefined>({ query: GetUserDocument, variables: undefined, ...options });
};