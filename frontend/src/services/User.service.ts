import { getClient } from '@/lib/apollo/client'
import { EmailIsAvailableDocument, EmailIsAvailableQuery, EmailIsAvailableQueryVariables, LoginDocument, LoginQuery, LoginQueryVariables, RefreshAccessTokenDocument, RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables, RegisterDocument, RegisterMutation, RegisterMutationVariables, UserWithId } from '@/lib/graphql/generated/operations';
import { User } from '@/lib/interfaces/User'
import { decode } from 'jsonwebtoken';

export const registerUser = async (data: User) => {
  try {
    const client = getClient();
    const res = await client.mutate<RegisterMutation, RegisterMutationVariables>({
      mutation: RegisterDocument,
      variables: {
        user: {
          email: data.email,
          password: data.password || '',
          name: data.name || ''
        }
      }
    })

    if(res.data) {
      localStorage.setItem('access_token', res.data.register.accessToken)
      localStorage.setItem('refresh_token', res.data.register.refreshToken)
    }

    return res.data?.register

  } catch(e) {
    return undefined
  }
}

export const loginUser = async (data: User) => {
  try {
    const client = getClient();
    const res = await client.query<LoginQuery, LoginQueryVariables>({
      query: LoginDocument,
      variables: {
        credentials: {
          email: data.email,
          password: data.password || '',
        }
      }
    })

    if(res.data) {
      localStorage.setItem('access_token', res.data.login.accessToken)
      localStorage.setItem('refresh_token', res.data.login.refreshToken)
    }

    return res.data.login
  } catch {
    return undefined
  }
}

export const logOut = () => {
  const client = getClient();
  client.clearStore();

  window.location.href = "/";

  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export const emailIsAvailable = async (email: string) => {
  const client = getClient();
  const res = await client.query<EmailIsAvailableQuery, EmailIsAvailableQueryVariables>({
    query: EmailIsAvailableDocument,
    variables: {
      email: email
    }
  })

  return res.data.emailIsAvailable
}

export const refreshAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token')
  const refreshToken = localStorage.getItem('refresh_token')

  if(!accessToken || !refreshToken) {
    return
  }

  const decoded = decode(accessToken, { complete: true })

  if (!decoded || !decoded.payload || typeof decoded.payload === 'string' || !decoded.payload.exp) {
    return;
  }

  const expirationDate = new Date(decoded.payload.exp * 1000);
  const now = new Date();

  if(now < expirationDate) {
    return false;
  }

  try {
    const client = getClient();
    const res = await client.query<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>({
      query: RefreshAccessTokenDocument,
      variables: {
        id: decoded.payload.id,
        refreshToken: refreshToken
      }
    });

    if(res.data) {
      localStorage.setItem('access_token', res.data.refreshAccessToken)
    }

    return true
  } catch {
    logOut();
    return undefined;
  }
}

export const getAccessTokenData = () => {
  const accessToken = localStorage.getItem('access_token')

  if(!accessToken) {
    return undefined
  }

  const decoded = decode(accessToken);
  
  if (!decoded) {
    return;
  }

  if(typeof decoded === 'string') {
    return decoded;
  }

  return {
    id: decoded.id,
    name: decoded.name
  }
}