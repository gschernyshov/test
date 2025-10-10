"use client"

import { use } from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Chip, Link, Spinner } from "@heroui/react"
import { useAuthStore } from "@/store/auth.store"
import { getPet } from "@/utils/pet"
import petNotFound from "@/assets/illustrations/pet-not-found.jpg"
import SendLetterForm from "@/app/forms/send-letter.form"
import { IPet } from "@/types/pet"

const PetPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: petId } = use(params)
  const { isAuth, status } = useAuthStore()
  const [petData, setPetData] = useState<IPet | null | undefined>(undefined)

  useEffect(() => {
    if (!petId) return

    let cancelled = false

    const query = async () => {
      try {
        const result = await getPet(petId)

        if (cancelled) return

        if (result.success) {
          setPetData(result.pet)
        } else {
          setPetData(null)
          // console.error(result.error)
        }
      } catch(e) {
        setPetData(null)
        // console.error(e)
      }
    }

    query()

    return () => {
      cancelled = true 
    }
  }, [petId])

 if (petData === undefined || status === "loading") {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full">
        <Spinner className="mt-10 md:mt-40" color="primary" size="lg" variant="gradient" />
      </div>
    )
  }

  if (petData === null) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full pt-27 md:pt-40 px-4 md:px-20">
        <h1 className="text-3xl md:text-4xl text-center leading-9 md:leading-12 font-bold">К сожалению, данная анкета<br className="hidden md:block"/> больше недоступна<br className="block md:hidden"/>:(</h1>
        <Image
          src={petNotFound}
          alt="Фотография кота"  
          height={300}
          width={300}     
        />
      </div>
    )
  }
    
  return (
   <div className="flex flex-col justify-start md:justify-center items-start md:items-center gap-7 md:gap-10 min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-10rem)] w-full pt-27 md:pt-40 px-4 md:px-20">
      <div className="flex flex-col gap-7 md:gap-10">
        <div className="flex flex-col gap-4 md:gap-4 md:ml-4">
          <h2 className="text-3xl md:text-4xl leading-9 md:leading-12 font-bold">Анкета питомца</h2>
          <p className="max-w-[800px]">
            В этой анкете вы познакомитесь с питомцем, который ищет заботливый дом. Прочитайте его историю, узнайте о характере и привычках. Вы также можете помочь —{" "}
            <Link
              href="/add-pet"
              className="relative text-blue-500 hover:text-blue-600 after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] hover:after:h-[2px] after:bg-blue-500 after:transition-all"
            >
              добавить свою анкету 
            </Link>
            {" "}или поделиться информацией, чтобы помочь животному найти хозяина ❤️
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-12 p-7 bg-white rounded-4xl shadow-[0_0_5px_rgba(0,0,0,0.1)]">
          <div className="w-full md:w-1/2">
            <Image
              src={petData.photo || "/avatars/base.jpg"}
              alt={`Фотография ${petData.species}`}   
              height={750}
              width={750}    
              className="h-full w-full max-h-120 object-cover rounded-2xl"
            />
          </div>
          <div className="flex flex-col justify-between gap-20 w-full md:w-1/2 pt-5 ">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl leading-8 font-bold">{petData.species} из г. {petData.nameCity}<br /><span className="text-base text-gray-500 leading-none">(н. п. {petData.location})</span><br />ищет себе дом 🏠</h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-1">
                  <Chip color="warning" variant="bordered">{petData.species}</Chip>
                  <Chip color="warning" variant="bordered">{petData.gender}</Chip>
                  <Chip color="warning" variant="bordered">{petData.age} мес.</Chip>
                </div>
                <p>{petData.description}</p>
                <p className="text-sm text-gray-400">От {new Date(petData.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            {!isAuth ? (
              <p className="text-sm text-gray-400">Чтобы написать владельцу питомца<br />необходимо авторизоваться.</p>
            ) : (
              petData.userId && <SendLetterForm userId={petData.userId} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}     

export default PetPage
