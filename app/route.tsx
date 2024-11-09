import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { route } from '@/app/_constants'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) redirect(route.login)
  redirect(route.orders)
}
