import { ConnectorNames, WalletConfigV2 } from './types'
// import { WalletFilledIcon } from '@pancakeswap/uikit'
import { metaMaskConnector, walletConnectNoQrCodeConnector } from './utils'
import { ExtendEthereum } from './types'

export const connectorLocalStorageKey = 'wallet'

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t))


const walletsConfig = ({
    chainId,
    connect,
}: {
    chainId: number
    connect: (connectorID: ConnectorNames) => void
}): WalletConfigV2<ConnectorNames>[] => {
    return [
        {
            id: 'metamask',
            title: 'Metamask',
            icon: '/images/metamask.png',
            installed:
                typeof window !== 'undefined' &&
                Boolean(window.ethereum?.isMetaMask) &&
                metaMaskConnector.ready,
            connectorId: ConnectorNames.MetaMask,
            deepLink: 'https://metamask.io/download/',
            downloadLink: 'https://metamask.io/download/',
        },
        // {
        //     id: 'binance',
        //     title: 'Binance Wallet',
        //     icon: '/images/wallets/binance.png',
        //     installed: typeof window !== 'undefined' && Boolean(window.BinanceChain),
        //     connectorId: ConnectorNames.BSC,
        //     guide: {
        //         desktop: 'https://www.bnbchain.org/en/binance-wallet',
        //     },
        //     downloadLink: {
        //         desktop: isFirefox
        //             ? 'https://addons.mozilla.org/en-US/firefox/addon/binance-chain/?src=search'
        //             : 'https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp',
        //     },
        // },
        {
            id: 'coinbase',
            title: 'Coinbase Wallet',
            icon: '/images/coinbase.png',
            connectorId: ConnectorNames.WalletLink,
        },
        {
            id: 'trust',
            title: 'Trust Wallet',
            icon: '/images/trust.png',
            connectorId: ConnectorNames.Injected,
            installed:
                typeof window !== 'undefined' &&
                !(window.ethereum as ExtendEthereum)?.isSafePal && // SafePal has isTrust flag
                (Boolean(window.ethereum?.isTrust) ||
                    // @ts-ignore
                    Boolean(window.ethereum?.isTrustWallet)),
            deepLink:
                'https://link.trustwallet.com/open_url?coin_id=20000714&url=https://pancakeswap.finance/',
            downloadLink: {
                desktop:
                    'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph/related',
            },
        },
        {
            id: 'walletconnect',
            title: 'WalletConnect',
            icon: '/images/walletconnect.png',
            connectorId: ConnectorNames.WalletConnect,
        },
    ]
}

export const createWallets = (
    chainId: number,
    connect: any,
): WalletConfigV2<ConnectorNames>[] => {
    const hasInjected = typeof window !== 'undefined' && !window.ethereum
    const config = walletsConfig({ chainId, connect })
    return hasInjected &&
        config.some(
            (c) => c.installed && c.connectorId === ConnectorNames.Injected,
        )
        ? config // add injected icon if none of injected type wallets installed
        : [
            ...config,
            // {
            //     id: 'injected',
            //     title: 'Injected',
            //     icon: '',
            //     connectorId: ConnectorNames.Injected,
            //     installed: typeof window !== 'undefined' && Boolean(window.ethereum),
            // },
        ]
}

const docLangCodeMapping: Record<string, string> = {
    it: 'italian',
    ja: 'japanese',
    fr: 'french',
    tr: 'turkish',
    vi: 'vietnamese',
    id: 'indonesian',
    'zh-cn': 'chinese',
    'pt-br': 'portuguese-brazilian',
}
const chainIcons: { [key: number]: string } = {
    1: '/images/ether.png',
    5: '/images/goerli.png',
}
export const getDocLink = (code: string) =>
    docLangCodeMapping[code]
        ? `https://docs.pancakeswap.finance/v/${docLangCodeMapping[code]}/get-started/connection-guide`
        : `https://docs.pancakeswap.finance/get-started/connection-guide`

export const getChainIcon = (chainId: number | undefined) => {
    if (chainId === undefined) return ''
    return chainIcons[chainId]
}
