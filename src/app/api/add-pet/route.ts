import { NextResponse } from "next/server"
import { mkdir, writeFile } from "fs/promises"
import path from "path"
import prisma from "@/utils/prisma"
import { petSchema } from "@/schema/zod"
import { ZodError } from "zod"


type CreatePetResponse =
  | {
      success: true
      message: string
      petId: string
    }
  | {
      success: false
      error: string
    }

export async function POST(req: Request): Promise<NextResponse<CreatePetResponse>> {
  try {
    const formData = await req.formData()

    const file = formData.get("photo") 
    
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { 
          success: false,
          error: "Добавьте фотографию питомца",
        }, 
        { 
          status: 400,
        },
      )
    }

    const formObj = Object.fromEntries(formData.entries())
    
    const data = await petSchema.parseAsync(formObj)

    const pet = await prisma.pet.create({
      data: {
        ...data,
        photo: "",
      },
      select: { 
        id: true,
      },
    })

    const petsDir = path.join(process.cwd(), "public", "pets")
    await mkdir(petsDir, { recursive: true })

    const ext = file.name.split(".").pop()
    const fileName = `${pet.id}.${ext}`
    const filePath = path.join(petsDir, fileName)

    const bytes = await file.arrayBuffer()
    await writeFile(filePath, Buffer.from(bytes))

    const photoUrl = `/pets/${fileName}`

    await prisma.pet.update({
      where: { 
        id: pet.id,
      },
      data: { 
        photo: photoUrl,
      },
    })
    
    return NextResponse.json({ 
      success: true,
      message: "Питомец успешно добавлен",
      petId: pet.id, 
    })
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessage = error.issues.map(issue => issue.message).join(", ")
      return NextResponse.json(
        { 
          success: false,
          error: "Предупреждение: " + errorMessage
        },
        { 
          status: 400 
        }
      )
    }
    // console.error("При добавлении питомца возникла ошибка: ", error)
    return NextResponse.json(
      { 
        success: false,
        error: "При добавлении питомца возникла ошибка",
      }, 
      { 
        status: 500,
      },
    )
  }
}
