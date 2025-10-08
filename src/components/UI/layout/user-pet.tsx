import Link from "next/link"
import Image from "next/image"
import { Chip } from "@heroui/react"
import { IPet } from "@/types/pet"

interface IUserPetProps {
  pet: IPet
}

const UserPet = ({ pet }: IUserPetProps) => {
  return (
    <div key={pet.id} className="flex flex-col md:flex-row gap-2 md:gap-7 p-3 w-full bg-white rounded-xl shadow-[0_0_5px_rgba(0,0,0,0.1)]">
      <div className="w-full md:w-2/5">
        <Image
          src={pet.photo || "/avatars/base.jpg"}
          alt={`Фотография ${pet.species}`}   
          height={750}
          width={750}    
          className="object-cover h-full w-full max-h-65 rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-between gap-10 w-full md:w-3/5 pt-2 ">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl leading-7 font-bold">{pet.species} из г. {pet.nameCity}<br /><span className="text-base text-gray-500 leading-none">(н. п. {pet.location})</span><br />ищет себе дом 🏠</h3>
          <div className="flex flex-col gap-4">
            <div className="flex gap-1">
              <Chip color="warning" variant="bordered" size="sm">{pet.species}</Chip>
              <Chip color="warning" variant="bordered" size="sm">{pet.gender}</Chip>
              <Chip color="warning" variant="bordered" size="sm">{pet.age} мес.</Chip>
            </div>
            <p className="text-sm">{pet.description}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <Link
            className="text-sm text-blue-500" 
            href={`/pet/${pet.id}`}
          >
            Страница питомца
          </Link>
          <p className="text-sm text-gray-400">{new Date(pet.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

export default UserPet
