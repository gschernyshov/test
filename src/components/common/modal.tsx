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
          ? "h-screen w-screen rounded-none overflow-y-auto px-4 py-4" 
          : "max-w-sm max-h-[90vh] overflow-y-auto px-5 py-10",                  
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
