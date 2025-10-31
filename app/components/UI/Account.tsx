"use client"

import { TonConnectButton } from '@tonconnect/ui-react'
import { useTonStore } from '@/app/store/useTonStore'

const Account = () => {
  const { isInitialized, address, balance, walletName, walletImage } = useTonStore()
  
  if (!isInitialized)
    return (
      <div>
        <h2>Подключите кошелёк</h2>
        <TonConnectButton />
      </div>
    )

  return (
    <div className='flex flex-col gap-3 items-start'>
      <h1>Личный кабинет</h1>
      <TonConnectButton />

      <div>
        <p><strong>Ваш адрес:</strong> {address}</p>
        <p><strong>Баланс:</strong> {balance} TON</p>
      </div>

      {walletName && walletImage && (
        <div className="flex flex-col items-start gap-1 p-4 shadow rounded-2xl">
          <h3 className='text-xs'>Информация о кошельке:</h3>
          <div className="flex gap-2 items-center p-1 pr-13 bg-white shadow rounded-md">
            <img 
              className="h-7 w-7 rounded-md"
              src={walletImage} 
              alt={walletName}
            />
            <span className="text-md">{walletName}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Account

