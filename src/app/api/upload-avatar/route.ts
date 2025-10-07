import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

type UploadAvatarResponse =
  | {
      success: true
      message: string
      avatarUrl: string
    }
  | {
      success: false
      error: string
    }

export async function POST(req: Request): Promise<NextResponse<UploadAvatarResponse>> {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        { 
          success: false,
          error: "ID пользователя обязательно",
        }, 
        { 
          status: 400,
        },
      )
    }

    const formData = await req.formData()
    const file = formData.get("avatar") as File | null

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { 
          success: false,
          error: "Добавьте Вашу фотографию" ,
        }, 
        { 
          status: 400,
        },
      )
    }

    // Получаем расширение файла
    const ext = file.name.split(".").pop()
    const fileName = `${userId}.${ext}`
    const filePath = path.join(process.cwd(), "public", "avatars", fileName)

    // Читаем содержимое файла
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Сохраняем файл в public/uploads
    await writeFile(filePath, buffer)

    // Путь для клиента
    const avatarUrl = `/avatars/${fileName}`

    return NextResponse.json(
      { 
        success: true,
        message: "Фотография обновлена",
        avatarUrl,
      },
    )
  } catch (error) {
    // console.error("При добавлении фотографии возникла ошибка: ", error)
    return NextResponse.json(
      { 
        success: false,
        error: "Не удалось обновить фотографию пользователя",
      }, 
      { 
        status: 500,
      },
    )
  }
}
