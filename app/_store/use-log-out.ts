import { signOut as signOutAuth } from 'next-auth/react'

import useAuthStore from './user-config'
import { route } from '@/app/_constants'

type ClearStore = {
  all?: boolean
  shipment?: boolean
  user?: boolean
}

export function useSignOut() {
  const actionUserConfig = useAuthStore()

  const clearStores = (
    { all, user }: ClearStore = { all: false, user: false }
  ) => {
    if (user) {
      return actionUserConfig?.clearToken()
    }

    if (all) {
      return actionUserConfig?.clearToken()
    }
  }

  const signOut = async (redirect = true) => {
    clearStores({ all: true })
    return await signOutAuth({ redirect, callbackUrl: route.login })
  }

  return { signOut, clearStores }
}
