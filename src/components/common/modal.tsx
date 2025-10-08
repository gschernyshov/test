"use client"

import { 
  useState, 
  useEffect, 
  ReactNode,
} from "react"
import {
  Modal,
  ModalContent,
  ModalBody,
} from "@heroui/react"

interface IProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    size?: "xs" | "sm" | "md" | "lg" | "xl"
}

const CustomModal = ({ isOpen, onClose, size = "md", children }: IProps) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768)

    checkScreen()

    window.addEventListener("resize", checkScreen)
    
    return () => {
      window.removeEventListener("resize", checkScreen)
    }
  }, [])

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={isMobile ? "full" : size}
      classNames={{
        base: isMobile
          ? "fixed top-0 left h-screen w-screen overflow-y-auto rounded-none py-4 px-4" 
          : "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-sm w-full max-h-[90vh] overflow-y-auto rounded-lg bg-white dark:bg-default-200 py-5 px-6",     
        closeButton: isMobile
          ? "fixed top-4 right-4 z-50 p-2 text-2xl text-gray-500 hover:text-black"
          : "absolute top-2 right-2 p-2 text-lg text-gray-500 hover:text-black",
        body: "overflow-y-auto",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            {children}
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
