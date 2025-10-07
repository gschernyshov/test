"use client"

import { useState } from "react"
import { Button, Alert, Spinner } from "@heroui/react"
import { useAuthStore } from "@/store/auth.store"
import AddPetForm from "../forms/add-pet.form"
import LoginnModal from "@/components/UI/modals/login.modal"
import Skeleton from "@/components/common/skeleton"

const AddPet = () => {
  const { isAuth, status } = useAuthStore()
  const [isLoginOpen, setIsLoginOpen] = useState(false)
 
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)] w-full px-20 pt-40">
        <Spinner color="primary" variant="gradient" size="lg" />
      </div>
    )
  }

  if (!isAuth) {
    return (
      <div className="flex flex-col justify-center items-start min-h-[calc(100vh-10rem)] w-full px-20 pt-40">
        <Alert
          variant="faded"
          color="primary"
          className="max-w-3xl "
          title="Данная страница доступна только для авторизованных пользователей!"
          endContent={
            <Button 
              color="primary" 
              size="sm" 
              variant="flat"
              onPress={() => setIsLoginOpen(true)}
            >
              Войти
            </Button>
          }
        />

        <LoginnModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      </div>
    ) 
  }

  return (
    <div className="flex  justify-center items-start min-h-[calc(100vh-10rem)] w-full px-4 md:px-20 pt-30 md:pt-40">
      <div className="flex flex-col md:flex-row flex gap-14 w-full md:p-6 md:p-10 md:rounded-4xl md:bg-white md:shadow-2xl">
        <div className="flex flex-col gap-6 md:gap-10 w-full md:w-1/2">
          <h1 className="w-4/5 md:w-full text-3xl md:text-4xl leading-10 md:leading-12 font-bold">Создание анкеты питомца ✨</h1>
          <p className="w-full md:w-2/3 text-gray-500">
            Заполните информацию о животном, прикрепите фото и расскажите его историю. Так вы поможете людям найти своего будущего друга 🐾
          </p>
        </div>
        <div className="md:w-1/2 py-5 px-4 md:px-15 rounded-4xl bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]">
          <AddPetForm />
        </div>
      </div>
    </div>
  )
}

export default AddPet

