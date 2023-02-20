import React from 'react'


import { Connector, useConnect } from 'wagmi'

const ConnectWalletButton = () => {
    const { connect, connectors, isLoading, pendingConnector } = useConnect()
    const onConnect = (connector: Connector<any, any, any>) => {
        connect({ connector: connector })
    }
    return (
        <>
            {connectors.map((x) => (
                <button
                    key={x.name}
                    className="bg-primary rounded-[80px] py-[12px] px-[30px] cursor-pointer bg-blue-500 text-white"
                    onClick={() => onConnect(x)}
                >
                    {isLoading && x.id === pendingConnector?.id ? 'Connecting...' : 'Connect wallet'}
                </button>
            ))}
        </>
    )
}

export default ConnectWalletButton
