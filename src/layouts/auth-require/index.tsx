import { me } from '@/services/auth.service'
import Router from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Sidebar from './sidebar'

const AuthRequireLayout = ({ children }: { children: ReactElement }) => {
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const f = async () => {
            try {
                const user = await me()
                if (user.isAdmin) {
                    setUser(user)
                    toast.success('Welcome!')
                } else {
                    Router.push('/')
                    toast.info('Your wallet is not admin wallet!')
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        f()

        return () => {
            console.log("Unmount");
        }
    }, [])

    if (isLoading) {
        return <div></div>
    }
    console.log('render');

    return (
        <div className='bg-slate-100 min-h-[100vh]'>
            <Sidebar />
            <main className='ml-[300px] px-4'>
                {children}
            </main>
        </div>
    )
}

export default AuthRequireLayout