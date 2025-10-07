"use client"

import CustomModal from "@/components/common/modal"
import LoginForm from "@/app/forms/login.form"

interface IProps {
  isOpen: boolean,
  onClose: () => void
}

const LoginnModal = ({ isOpen, onClose}: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <LoginForm onClose={onClose}/>
    </CustomModal>
  )
}

export default LoginnModal
