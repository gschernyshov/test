"use server"

import nodemailer, { Transporter } from "nodemailer"

interface IDataMail {
  email: string
  telephone: string
  message: string
}

export async function sendMail({ email, telephone, message }: IDataMail) {
  try{    
    const htmlContent = `<p><b>Номер телефона отправителя:</b>${telephone}</p><p><b>Его сообщение:</b>${message}</p>`

    const transporter: Transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.YANDEX_USER, 
        pass: process.env.YANDEX_PASS, 
      },
    })

    const mailOptions: nodemailer.SendMailOptions = {
      from: {
        name: "WhiskersTails",
        address: "test-grchafv@yandex.ru",
      },
      to: email,
      subject: "Кто-то хочет забрать питомца :)",
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)
    transporter.close()
  } catch(error) {
    // console.error("При отправке сообщения возникла ошибка: ", error)
    throw error
  }
}
