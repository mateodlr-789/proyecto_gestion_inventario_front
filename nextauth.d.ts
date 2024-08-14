import { DefaultSession, ProviderType } from 'next-auth'

interface AuthResponse {
  uid: string
  token: string
}

declare module 'next-auth/jwt' {
  export interface JWT {
    tokenHeader: string
    provider?: ProviderType
  }
}

declare module 'next-auth' {
  export interface User extends AuthResponse {}

  export interface Session {
    user: {
      info: AuthResponse
    } & DefaultSession['user']
    token: {
      header: string | JWT
    }
  }
}
