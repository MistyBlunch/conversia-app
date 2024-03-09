import { getClient } from '@/lib/apollo/client';
import { ContactWithId, CreateContactDocument, CreateContactMutation, CreateContactMutationVariables, DeleteContactDocument, DeleteContactMutation, DeleteContactMutationVariables, FindContactsDocument, FindContactsQuery, FindContactsQueryVariables, UpdateContactDocument, UpdateContactMutation, UpdateContactMutationVariables } from '@/lib/graphql/generated/operations';
import { Contact } from '@/lib/interfaces/Contact'
import { refreshAccessToken } from './User.service';

export const createContact = async (data: Contact) => {
  refreshAccessToken()

  const client = getClient()
  const res = await client.mutate<CreateContactMutation, CreateContactMutationVariables>({
    mutation: CreateContactDocument,
    variables: {
      contact: data
    }
  })

  return res.data?.createContact.id
}

export const updateContact = async (data: Contact) => {
  refreshAccessToken()

  const client = getClient()
  const res = await client.mutate<UpdateContactMutation, UpdateContactMutationVariables>({
    mutation: UpdateContactDocument,
    variables: {
      id: data.id || -1,
      contact: {
        name: data.name,
        lastName: data.lastName,
        age: data.age,
        phone: data.phone
      }
    }
  })

  return res.data?.updateContact.id
}

export const getContacts = async () => {
  refreshAccessToken()

  const client = getClient()
  const res = await client.query<FindContactsQuery, FindContactsQueryVariables>({
    query: FindContactsDocument,
  })

  return res.data.findContacts
}

export const removeContact = async (id: number | undefined) => {
  if (!id) return

  refreshAccessToken()

  const client = getClient()
  await client.mutate<DeleteContactMutation, DeleteContactMutationVariables>({
    mutation: DeleteContactDocument,
    variables: {
      id: id
    }
  })
}
