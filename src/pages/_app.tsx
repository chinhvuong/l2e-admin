import AuthRequireLayout from '@/layouts/auth-require'
import '@/styles/globals.css'
import WagmiProvider from '@/wallet/provider'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  useEffect(() => {

    return () => {
      console.log('Unmount app')
    }
  })
  return (
    <WagmiProvider>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {
        Component.getLayout ? Component.getLayout(<Component {...pageProps} />) :
          (
            <AuthRequireLayout>
              <Component {...pageProps} />
            </AuthRequireLayout>
          )
      }
    </WagmiProvider>
  )
}
