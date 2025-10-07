"use client"

import { useRouter } from "next/navigation"
import Image from 'next/image'
import { Button } from '@heroui/react'
import Photo from '@/assets/photo/hero.png'
import PhotoMobile from '@/assets/photo/hero-mobile.png'

const Hero = () => {
  const router = useRouter()

  return (
    <>
      <div className="relative min-h-screen w-full">
        <Image 
          src={Photo}
          fill
          priority
          alt="Кошки и собаки — баннер WhiskersTails"
          className="absolute top-0 left-0 hidden md:block object-cover"
        />
        <Image 
          src={PhotoMobile}
          fill
          priority
          alt="Кошки и собаки — баннер WhiskersTails"
          className="absolute top-0 left-0 block md:hidden object-cover"
        />
        <div className="absolute top-0 left-0 flex flex-col justify-end md:justify-center min-h-screen w-full pb-12 md:pb-0 px-4 md:px-20">
          <div className="flex flex-col items-start gap-6 w-full md:w-2/5">
            <h1 className="text-3xl md:text-4xl leading-9 md:leading-12 font-bold">WhiskersTails — место, где питомцы находят друзей, а люди находят радость общения.</h1>
            <p>Познакомиться с питомцами 🐾</p>
            <Button 
              color="primary" 
              variant="ghost" 
              size="lg"
              onPress={() => router.push("/pets")}
            >
              Анкеты
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
