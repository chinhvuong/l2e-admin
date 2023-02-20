import { login, me } from '@/services/auth.service'
import { ConnectWalletButton, DisconnectWalletButton } from '@/wallet/ui'
import { verifyMessage } from 'ethers/lib/utils.js'
import Router from 'next/router'
import React, { useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
const SIGN_MESSAGE = 'Hello'

const LoginContainer = () => {
    const [error, setError] = useState('')
    const { address } = useAccount({
        onConnect: (data) => {
            if (!data.isReconnected) {
                signMessage.signMessage({ message: String(SIGN_MESSAGE) })
            }
        },
    })
    const signMessage = useSignMessage({
        onSuccess: async (data, variables) => {
            const address = verifyMessage(variables.message, data)
            const rs = await login({
                walletAddress: address,
                signature: String(data),
            })

            if (rs?.accessToken) {
                const user = await me()
                console.log("🚀 ~ file: login.container.tsx:28 ~ onSuccess: ~ user", user)
                if (!user?.isAdmin) {
                    setError('You are not admin')
                } else {
                    Router.replace('/dashboard')
                }
            }
        }
    })

    return (
        <div className='min-h-[100vh] flex items-center justify-center bg-slate-300'>
            <div className='rounded-lg shadow-md min-w-[400px] w-40 p-4 flex flex-col gap-4 items-center bg-white/50'>
                <h1 className='text-2xl font-semibold'>L2E Admin</h1>
                {
                    address ? <DisconnectWalletButton /> : <ConnectWalletButton />
                }
                {
                    error ? <p className='text-sm text-center text-red-500'>{error}</p> :
                        <p className='text-sm text-center'>Connect admin wallet to go to dashboard</p>
                }
            </div>

        </div>
    )
}

export default LoginContainer