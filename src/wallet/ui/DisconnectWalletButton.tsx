import React from 'react'


import { useDisconnect } from 'wagmi'

const DisconnectWalletButton = () => {
    const { disconnect, isLoading } = useDisconnect()
    const onDisconnect = () => {
        disconnect()
    }
    return (
        <>

            <button

                className="bg-primary rounded-[80px] py-[12px] px-[30px] cursor-pointer bg-blue-500 text-white"
                onClick={onDisconnect}
            >
                Disconnect
                {isLoading && ' …'}
            </button>

        </>
    )
}

export default DisconnectWalletButton
