"use client"

import { Avatar, Button } from '@heroui/react'
import { useAccount } from '@/context/account.context'
import CameraIcon from '@/components/common/camera-icon'

const UpdateUserAvatarForm = () => {
  const {
    userData,
    selectedFile,
    loadingUpdateUserDataById,
    handleFileChange,
    handleUpload,
  } = useAccount()
  
  return (
    <div className="flex gap-5 items-center">
      <Avatar
        className="w-33 md:w-40 h-33 md:h-40 text-large border-5 border-neutral-50"
        src={userData!!.avatar}
      />
      <div className="flex flex-col gap-1 w-1/2">
        <div className="flex items-center gap-1">
          <Button isIconOnly aria-label="Выбрать фото" color="warning" variant="faded">
            <label
              htmlFor="image_uploads"
              className="cursor-pointer"
            >
              <CameraIcon />
            </label>
          </Button>
          <input
            id="image_uploads"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={loadingUpdateUserDataById}
          />
          <Button 
            isLoading={!selectedFile && loadingUpdateUserDataById}
            size="md" 
            color="default" 
            variant="bordered" 
            onPress={handleUpload} 
            disabled={loadingUpdateUserDataById}
          >
            Обновить фото
          </Button>
        </div>
        {selectedFile && <p className="font-nunito text-sm pl-3">😻 фото выбрано</p>}
      </div>
    </div>
  )
}

export default UpdateUserAvatarForm
