"use client"

import { useTonAddress } from '@tonconnect/ui-react';
import { useTonWallet } from '@tonconnect/ui-react';

const Account = () => {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const wallet = useTonWallet();

  return (
    <>
    {userFriendlyAddress && (
      <div>
        <span>User-friendly address: {userFriendlyAddress}</span>
        <span>Raw address: {rawAddress}</span>
      </div>
    )}
{wallet && (
  <div>
    <span>Connected wallet address: {wallet.account.address}</span>
    <span>Device: {wallet.device.appName}</span>
    <span>Connected via: {wallet.provider}</span>

    <div>Connected wallet info:</div>
    <div>
      {('name' in wallet) && wallet.name}
      {('imageUrl' in wallet) && <img src={wallet.imageUrl} alt="Wallet logo" />}
    </div>
  </div>
)}
    </>
  )
}

export default Account
