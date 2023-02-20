import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useDisconnect } from 'wagmi'

const data = [
    {
        text: "Dashboard",
        route: '/dashboard'
    },
    {
        text: "Approve Request",
        route: '/dashboard/approve-requests'
    },
    {
        text: "Users",
        route: '/dashboard/users'
    },
    {
        text: "Courses",
        route: '/dashboard/courses'
    }
]
const Sidebar = () => {
    const router = useRouter()
    const { disconnect } = useDisconnect()
    const onLogout = () => {
        disconnect()
        localStorage.clear()
        router.replace('/')

    }

    return (
        <div className='min-w-[300px] min-h-[100vh] fixed top-0 left-0 shadow-md bg-white'>
            <div className="logo">
                <Image alt='logo' className='w-full max-h-[200px]' src='/graduation-cap.png' width={150} height={75} />
            </div>
            <ul className="flex flex-col h-[calc(100vh-200px)]">
                {
                    data.map(item => (
                        <li key={item.route} className={`${router.asPath === item.route && 'bg-slate-300'}`}>
                            <Link href={item.route} className='p-4 hover:bg-slate-200 transition-colors cursor-pointer w-full block'>
                                {item.text}
                            </Link>
                        </li>
                    ))
                }
                <li className='grow'></li>
                <li>
                    <button className='w-full p-4 cursor-pointer shadow-sm hover:bg-slate-200 transition-colors'
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar