"use client"

import Link from "next/link"
import Image from 'next/image'
import { Button } from "@heroui/react"
import { Icon } from "@iconify/react"
import Photo from "@/assets/photo/about.jpg"

const AboutSection = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-14 md:gap-20 min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-10rem)] w-full pt-27 md:pt-40 px-4 md:px-20">
      <div className="text-center max-w-3xl">
        <h2 className="mb-6 text-3xl md:text-4xl leading-9 md:leading-12 font-bold">О нас</h2>
        <p className="text-lg md:text-xl">
          Мы — небольшая команда, объединённая любовью к животным и желанием делать жизнь питомцев и их владельцев лучше. 
          Каждый проект для нас важен, и мы подходим к работе с вниманием к деталям, заботой и искренним интересом к вашим питомцам.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={Photo}
            alt="Наша команда"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-7 max-w-xl py-6 px-8 bg-white rounded-2xl">
          <div className="flex items-start gap-4">
            <Icon icon="mdi:heart" className="text-4xl text-red-500" />
            <div className="pt-1">
              <h3 className="text-xl text-black font-bold">Любовь к каждому питомцу</h3>
              <p className="text-gray-700">
                Мы заботимся о каждом животном, учитываем его привычки и потребности, чтобы питомцы чувствовали себя комфортно.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Icon icon="mdi:lightbulb-on" className="text-4xl text-yellow-400" />
            <div className="pt-1">
              <h3 className="text-xl text-black font-bold">Индивидуальный подход</h3>
              <p className="text-gray-700">
                Нет двух одинаковых питомцев, и мы не применяем шаблоны. Для каждого подбираем оптимальные решения и внимание к мелочам.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Icon icon="mdi:emoticon-happy" className="text-4xl text-green-400" />
            <div className="pt-1">
              <h3 className="text-xl text-black font-bold">Счастье наших клиентов</h3>
              <p className="text-gray-700">
                Мы измеряем успех по радости ваших питомцев и вашей уверенности, что они в надежных руках.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Icon icon="mdi:account-group" className="text-4xl text-blue-500" />
            <div className="pt-1">
              <h3 className="text-xl text-black font-bold">Мы растём вместе с вами</h3>
              <p className="text-gray-700">
                Каждый новый проект — это возможность учиться, совершенствоваться и развивать наш сервис, чтобы делать его ещё полезнее для вас.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-5 md:gap-7 text-center max-w-[500px] md:mt-10">
        <p className="w-[95%] md:w-full text-lg md:text-xl">
          Хотите узнать больше или обсудить ваш проект? Мы всегда на связи и рады помочь!
        </p>
        <Link 
          href="https://t.me/hypepeak"
          aria-label="Наш Telegram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button color="primary" size="lg">Связаться с нами</Button>
        </Link>
        <p className="text-sm md:text-base max-w-[300px]">
          Мы ответим как можно быстрее — обычно в течение нескольких часов.
        </p>
      </div>
    </div>
  )
}

export default AboutSection
