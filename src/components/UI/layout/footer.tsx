import { siteConfig } from "@/config/site.config"

const Footer = () => {
  const contacts = siteConfig.contacts

  return (
    <div className="w-full mt-20 md:mt-40 pt-10 md:pt-20 px-4 md:px-20 bg-blue text-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full max-w-2xl mb-5 md:mb-10">
        <div className="flex flex-col gap-1">
          <h2 className="mb-2 text-neutral-50 text-3xl">WhiskersTails</h2>
          <p className="text-gray-500">{contacts.adress}</p>
          <p className="text-gray-500">Тел.: {contacts.telephone}</p>
          <p className="text-gray-500">Email: {contacts.email}</p>
        </div>
        <div className="flex flex-col gap-1 md:gap-3 text-gray-300">
          <a href={contacts.whatsApp}>WhatsApp</a>
          <a href={contacts.telegram}>Telegram</a>
        </div>
        <div className="flex flex-col gap-1 md:gap-3 text-gray-300">
          <a href={contacts.instagram}>Instagram</a>
          <a href={contacts.whatsApp}>VK</a>
        </div>
      </div>
      <hr className="text-gray-500" />
      <div className="w-full py-10">
        <p className="font-nunito text-neutral-50">© 2025 Whiskers & Tails. Все права защищены.</p>
      </div>
    </div>
  )
}

export default Footer

     