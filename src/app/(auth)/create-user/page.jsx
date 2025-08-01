'use client';

import CreateUserForm from '@/ui/create-user'
import { Suspense } from 'react'

export default function CreateUserPage() {
  return (
    <div>
      <Suspense>
        <CreateUserForm />
      </Suspense>
      </div>
  )
}