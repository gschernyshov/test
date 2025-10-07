"use client"

import { useEffect, useState } from 'react'
import { CircularProgress, Link } from '@heroui/react'
import { useAuthStore } from '@/store/auth.store'
import { getUserPets } from '@/utils/user-pets'
import UserPet from '@/components/UI/layout/user-pet'
import { IPet } from '@/types/pet'

const UserPets = () => {
  const { session } = useAuthStore()
  const userId = session?.user?.id

  const [userPets, setUserPets] = useState<IPet[] | null | undefined>(undefined)

  useEffect(() => {
    if (!userId) return

    let cancelled = false

    const query = async () => {
      try {
        const result = await getUserPets(userId)

        if (cancelled) return

        if (result.success) {
          setUserPets(result.pets)
        } else{
          setUserPets(null)
          // console.error(result.error)
        }
      } catch(e) {
        setUserPets(null)
        // console.error(e)
      }
    }

    query()

    return () => { 
      cancelled = true 
    }
  }, [userId])

  if (userPets === undefined) {
    return (      
      <div className="flex flex-col gap-5 p-5">
        <h2 className="text-3xl leading-12 font-bold">Ваши анкеты</h2>
        <CircularProgress />
      </div>
    )
  }

  if (userPets === null) {
    return (
      <div className="flex flex-col gap-5 p-5">
        <h2 className="text-3xl leading-12 font-bold">Ваши анкеты</h2>
        <p>На данный момент у вас нет добавленных анкет. <Link className="text-blue-500" href="/add-pet">Хотите добавить?</Link></p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <h2 className="text-3xl leading-12 font-bold">Ваши анкеты</h2>
      <div className="flex flex-col gap-5">
        {userPets.map((pet) => <UserPet key={pet.id} pet={pet} />)}
      </div>
    </div>
  )
}

export default UserPets
