"use client"

import { ReactNode } from "react"
import {
  Modal,
  ModalContent,
  ModalBody,
} from "@heroui/react"

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    size?: "xs" | "sm" | "md" | "lg" | "xl"
}

const CustomModal = ({ isOpen, onClose, size = "md", children }: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              {children}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
