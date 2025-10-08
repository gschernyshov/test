"use client"

import { useState } from "react"
import { Button, Alert, Spinner } from "@heroui/react"
import { useAuthStore } from "@/store/auth.store"
import AddPetForm from "../forms/add-pet.form"
import LoginnModal from "@/components/UI/modals/login.modal"

const AddPet = () => {
  const { isAuth, status } = useAuthStore()
  const [isLoginOpen, setIsLoginOpen] = useState(false)
 
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full pt-20 md:pt-40 px-4 md:px-20">
        <Spinner color="primary" size="lg" variant="gradient" />
      </div>
    )
  }

  if (!isAuth) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full pt-20 md:pt-40 px-4 md:px-20">
        <Alert
          variant="faded"
          color="primary"
          className="max-w-3xl "
          title={
            <div className="w-4/5 md:w-full">
              Данная страница доступна только для авторизованных пользователей!
            </div>
          }
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
    <div className="flex justify-center items-start min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-10rem)] w-full pt-20 md:pt-40 px-4 md:px-20">
      <div className="flex flex-col md:flex-row flex gap-7 md:gap-10 w-full md:p-6 md:p-10 md:rounded-4xl md:bg-white md:shadow-2xl">
        <div className="flex flex-col gap-6 md:gap-10 w-full md:w-1/2">
          <h1 className="text-3xl md:text-4xl md:text-left leading-9 md:leading-12 font-bold">Создание анкеты питомца ✨</h1>
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

