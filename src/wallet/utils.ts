import { goerli, mainnet } from './chains'
import { configureChains, createClient } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const CHAINS = [mainnet, goerli]
const getNodeRealUrl = (networkName: string) => {
    let host = null

    switch (networkName) {
        case 'homestead':
            if (process.env.NEXT_PUBLIC_NODE_REAL_API_ETH) {
                host = `eth-mainnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_ETH}`
            }
            break
        case 'rinkeby':
            if (process.env.NEXT_PUBLIC_NODE_REAL_API_RINKEBY) {
                host = `eth-rinkeby.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_RINKEBY}`
            }
            break
        case 'goerli':
            if (process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI) {
                host = `eth-goerli.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI}`
            }
            break
        default:
            host = null
    }

    if (!host) {
        return null
    }

    const url = `https://${host}`
    return {
        http: url,
        webSocket: url
            .replace(/^http/i, 'wss')
            .replace('.nodereal.io/v1', '.nodereal.io/ws/v1'),
    }
}

export const { provider, chains } = configureChains(CHAINS, [
    jsonRpcProvider({
        rpc: (chain) => {
            // if (!!process.env.NEXT_PUBLIC_NODE_PRODUCTION && chain.id === bsc.id) {
            //     return { http: process.env.NEXT_PUBLIC_NODE_PRODUCTION }
            // }
            if (process.env.NODE_ENV === 'test' && chain.id === mainnet.id) {
                return { http: 'https://cloudflare-eth.com' }
            }
            return (
                getNodeRealUrl(chain.network) || { http: String(chain.rpcUrls.default) }
            )
        },
    }),
])

export const injectedConnector = new InjectedConnector({
    chains,
    options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
    },
})

export const coinbaseConnector = new CoinbaseWalletConnector({
    chains,
    options: {
        appName: 'PancakeSwap',
        appLogoUrl: 'https://pancakeswap.com/logo.png',
    },
})

export const walletConnectConnector = new WalletConnectConnector({
    chains,
    options: {
        qrcode: true,
    },
})

export const walletConnectNoQrCodeConnector = new WalletConnectConnector({
    chains,
    options: {
        qrcode: false,
    },
})

export const metaMaskConnector = new MetaMaskConnector({
    chains,
    options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
    },
})

// export const bscConnector = new BinanceWalletConnector({ chains })
export const client = createClient({
    autoConnect: true,
    provider,
    connectors: [
        // new SafeConnector({ chains }),
        metaMaskConnector,
        injectedConnector,
        coinbaseConnector,
        walletConnectConnector,
        // bscConnector,
    ],
})

export const CHAIN_IDS = chains.map((c) => c.id)
// export const isChainSupported = memoize((chainId: number) =>
//     CHAIN_IDS.includes(chainId),
// )
// export const isChainTestnet = memoize(
//     (chainId: number) => chains.find((c) => c.id === chainId)?.testnet,
// )