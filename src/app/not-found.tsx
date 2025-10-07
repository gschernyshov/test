"use client"

import { redirect } from "next/navigation"
import { Alert, Button } from "@heroui/react"

const NotFound = () => {
  return (
    <div className="flex justify-center items-start w-full px-20 pt-40" style={{ minHeight: "calc(100vh - 10rem)" }}>
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
