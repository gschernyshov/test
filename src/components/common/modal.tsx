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
          ? "fixed inset-0 w-screen h-screen rounded-none overflow-y-auto pt-20 px-4"
          : "fixed inset-0 max-w-sm max-h-[90vh] overflow-y-auto py-10 px-5 m-auto rounded-lg",
        closeButton: isMobile
          ? "absolute top-4 right-4 z-50 p-2 text-2xl text-gray-500 hover:text-black"
          : "absolute top-2 right-2 z-50 p-2 text-lg text-gray-500 hover:text-black",
        body: "overflow-y-auto max-h-full",
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
