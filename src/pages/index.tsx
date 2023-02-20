import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import dynamic from 'next/dynamic'
import { NextPage } from 'next'

const LoginContainer = dynamic(
  () => import('@/containers/login.container'),
  { ssr: false }
)
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <LoginContainer />
    </>
  )
}
Home.getLayout = (page: NextPage) => page