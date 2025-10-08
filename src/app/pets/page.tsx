"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Chip, Spinner } from "@heroui/react"
import { getPets } from "@/utils/pet"
import { IPet } from "@/types/pet"

const PetsPage = () => {
  const [petsData, setPetsData] = useState<IPet[] | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false;

    const query = async () => {
      try {
        const result = await getPets()

        if (cancelled) return

        if (result.success) {
          setPetsData(result.pets)
        } else {
          setPetsData(null)
          // console.error(result.error)
        }
      } catch (e) {
        setPetsData(null)
        // console.error(e)
      } 
    }

    query()

    return () => {
      cancelled = true
    }
  }, [])

  if (petsData === undefined) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full pt-20 md:pt-40 px-4 md:px-20">
        <Spinner color="primary" size="lg" variant="gradient" />
      </div>
    )
  }

  if (petsData === null) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full pt-20 md:pt-40 px-4 md:px-20">
        <h2 className="text-3xl md:text-4xl text-center md:text-left leading-9 md:leading-12 font-bold">Питомцев пока нет 😿</h2>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-start items-start gap-7 md:gap-10 min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-10rem)] w-full pt-20 md:pt-40 px-4 md:px-20">
      <div className="flex flex-col gap-7 md:gap-10">
        <h2 className="text-3xl md:text-4xl text-center md:text-left leading-9 md:leading-12 font-bold">Анкеты питомцев</h2>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap gap-5 w-full">
        {petsData.map((petData) => (
          <div key={petData.id} className="flex flex-col md:flex-row gap-2 md:gap-7 p-3 w-full md:w-[calc(50%-2.5rem)] bg-white rounded-xl shadow-[0_0_5px_rgba(0,0,0,0.1)]">
            <div className="w-full md:w-2/5">
              <Image
                src={petData.photo || "/avatars/base.jpg"}
                alt={`Фотография ${petData.species}`}   
                height={750}
                width={750}    
                className="object-cover h-full w-full max-h-65 rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-between gap-10 w-full md:w-3/5 pt-2 ">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl leading-7 font-bold">{petData.species} из г. {petData.nameCity}<br /><span className="text-base text-gray-500 leading-none">(н. п. {petData.location})</span><br />ищет себе дом 🏠</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-1">
                    <Chip color="warning" variant="bordered" size="sm">{petData.species}</Chip>
                    <Chip color="warning" variant="bordered" size="sm">{petData.gender}</Chip>
                    <Chip color="warning" variant="bordered" size="sm">{petData.age} мес.</Chip>
                  </div>
                  <p className="text-sm">{petData.description}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <Link
                  className="text-sm text-blue-500" 
                  href={`/pet/${petData.id}`}
                >
                  Страница питомца
                </Link>
                <p className="text-sm text-gray-400">{new Date(petData.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PetsPage
