"use client"

import { useRouter } from 'next/navigation'
import { Alert, Button } from "@heroui/react"

const NotFound = () => {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full px-4 md:px-20">
      <div className="w-full md:w-xl md:m-auto">
        <Alert
          color="danger"
          className="w-full md:w-xl"
          endContent={
            <Button 
              color="danger"  
              size="sm" 
              variant="flat"
              onClick={() => router.push("/")}
            >
              Главная
            </Button> 
          }
          title="Страница не найдена!"
          variant="faded"
        />
      </div>
    </div>
  )
}

export default NotFound
