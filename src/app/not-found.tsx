"use client"

import { redirect } from "next/navigation"
import { Alert, Button } from "@heroui/react"

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-2.5rem)] md:h-[calc(100vh-10rem)] w-full pt-20 md:pt-40 px-4 md:px-20">
      <div>
        <Alert
          color="danger"
          className="w-2xl"
          endContent={
            <Button 
              color="danger"  
              size="sm" 
              variant="flat"
              onPress={() => redirect("/")}
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
