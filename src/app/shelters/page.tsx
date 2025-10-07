"use client"

import { useState, useEffect } from "react"
import { getCitiesWithShelters } from "@/utils/cities-with-shelters"
import { Button, Card, CardBody } from "@heroui/react"
import ShelterCard from "@/components/UI/layout/shelter-card"
import CreateShelterModal from "@/components/UI/modals/create-shelter.modal"
import Donate from "@/components/UI/layout/donate"
import Faq from "@/components/UI/layout/faq"
import { ICity, IShelter } from "@/types/shelter-city"

const Shelters = () => {
  const [cities, setCities] = useState<ICity[] | null>(null)
  const [shelters, setShelters] = useState<IShelter[] | null>(null)
  const [isCreateShelter, setIsCreateShelter] = useState(false)

  useEffect(() => {
    let cancelled = false

    const query = async () => {
      try {
        const result = await getCitiesWithShelters()

        if (cancelled) return

        if (result.success) {
          setCities(result.cities)
        } else {
          // console.error(result.error)
        }
      } catch (e) {
        // console.error(e)
      } 
    }

    query()

    return () => {
      cancelled = true
    }
  }, []) 

  const getSheltersByCity = (cityId: string) => {
    cities?.map((city) => {
      if(city.id === cityId) setShelters(city.shelters)
    })
  }
  
  return (
    <>
      <div className="flex flex-col items-center w-full px-20 pt-40">
        <div className="flex flex-col gap-3 mb-7">
          <h1 className="text-4xl leading-12 font-bold text-center">Список приютов для животных в вашем городе</h1>
          <div className="flex justify-center gap-1">
            <p>Вы можете легко</p>
            <span 
              className="text-blue-500 border-b-1 border-blue-500 cursor-pointer" 
              onClick={() => setIsCreateShelter(true)}
            >
              добавить
            </span>
            <p> новый приют и помочь животным найти заботу!</p>
          </div>
        </div>
        <div className="flex gap-2 mb-10">
          {cities === null ? (
            <div className="flex items-center gap-2">
              <Button 
                isLoading 
                color="primary" 
                variant="flat" 
                radius="full"
                >
                Загрузка...
              </Button>
            </div>
          ) : (
            cities.length === 0 ? ( 
              <p>Города не найдены</p> 
            ) : (
              cities.map((city) => (
                <Button 
                  key={city.id} 
                  color={city.name === shelters?.[0].nameCity ? "danger" : "primary"}
                  radius="full"
                  onPress={() => (getSheltersByCity(city.id))}
                >
                  {city.name}
                </Button>
              ))
            )
          )}
        </div>
        <div className="w-full">
          {cities !== null && cities.length !== 0 && shelters === null ? (
            <Card className="max-w-[500px] m-auto pl-3">
              <CardBody>
                <p className="text-center">Выберите город из списка 🥰</p>
              </CardBody>
            </Card>
          ) : (
            shelters !== null && (
              shelters.length === 0 ? ( 
                <p>В данном городе нет приютов!</p> 
              ) : (
                shelters.map((shelter) => <ShelterCard key={shelter.id} shelter={shelter} />)
              )
            )
          )}
        </div>
      </div>
      
      <CreateShelterModal 
        isOpen={isCreateShelter}
        onClose={() => setIsCreateShelter(false)}
      />

      <Donate />
      <Faq />
    </>
  )
}

export default Shelters


