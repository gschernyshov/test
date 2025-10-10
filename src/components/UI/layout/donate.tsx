"use client"

import { useRouter } from "next/navigation"
import { Button, Image } from '@heroui/react'

const Donate = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 w-full pt-20 md:pt-40 px-4 md:px-20">
      <div className="flex flex-col items-center md:items-start gap-7 md:gap-10 w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl text-center md:text-left leading-9 md:leading-12 font-bold">Каждый рубль имеет значение</h2>
        <p className="text-center md:text-left">
          Наш проект полностью бесплатный для всех пользователей и существует исключительно на добровольной инициативе волонтёров. Никто не получает прибыль, и проект не спонсируется компаниями.
          Все пожертвования направляются на корм, лечение и временные передержки животных, а также на развитие и поддержание платформы — чтобы сайт оставался доступным и удобным для всех.
          Вы можете помочь разными способами: перевести деньги, купить корм или лекарства, привезти вещи для ухода. Даже маленькая поддержка превращается в шанс на жизнь.
        </p>
        <Button 
          className="bg-linear-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          radius="full"
          size="lg"
          onPress={() => router.push("/add-pet")}
        >
          Сделать пожертвование
        </Button>
      </div>
      <div className="w-full md:w-1/4"> 
        <Image
          isBlurred
          alt="Фотография собаки"
          sizes="100vw"
          src='/donate.png'
        />
      </div>
    </div>
  )
}

export default Donate
