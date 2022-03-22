import React, {useState} from "react"

export const WalletContext = React.createContext()

export const WalletContextProps = () => {
    const [wallet, setWallet] = useState(null)
    return {
        wallet,
        setWallet
    }
}