"use client"

import CustomModal from "@/components/common/modal"
import RegistrationForm from "@/app/forms/registration.form"

interface IProps {
  isOpen: boolean,
  onClose: () => void
}

const RegistrationModal = ({ isOpen, onClose }: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <RegistrationForm onClose={onClose}/>
    </CustomModal>
  )
}

export default RegistrationModal
