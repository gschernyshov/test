"use client"

import { use } from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Chip, Spinner } from "@heroui/react"
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
      <div className="flex justify-center items-center h-[calc(100vh-10rem)] w-full px-20 pt-40">
        <Spinner color="primary" variant="gradient" size="lg" />
      </div>
    )
  }

  if (petData === null) {
    return (
      <div className="flex justify-center items-start min-h-[calc(100vh-10rem)] w-full px-20 pt-40">
        <h1 className="text-3xl text-center leading-12 font-bold">К сожалению, данная анкета<br />больше недоступна :(</h1>
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
    <div className="flex justify-center items-start min-h-[calc(100vh-10rem)] w-full px-2 md:px-20 pt-40">
      <div className="flex flex-col md:flex-row md:gap-12 p-7 bg-white rounded-4xl shadow-[0_0_5px_rgba(0,0,0,0.1)]">
        <div className="w-full md:w-1/2">
          <Image
            src={petData.photo}
            alt={`Фотография ${petData.species}`}   
            height={750}
            width={750}    
            className="object-cover h-full w-full max-h-120 rounded-2xl"
          />
        </div>
        <div className="flex flex-col justify-between gap-20 w-full md:w-1/2 pt-5 ">
          <div className="flex flex-col gap-3">
            <h1 className="mb-5 text-3xl leading-10 font-bold">{petData.species} из г. {petData.nameCity}<span className="text-base text-gray-500">(н. п. {petData.location})</span><br />ищет себе дом</h1>
            <div className="flex flex-col gap-2">
              <p>{petData.description}</p>
              <div className="flex gap-2">
                <Chip color="warning" variant="bordered">{petData.species}</Chip>
                <Chip color="warning" variant="bordered">{petData.gender}</Chip>
                <Chip color="warning" variant="bordered">{petData.age} мес.</Chip>
              </div>
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
  )
}     

export default PetPage
