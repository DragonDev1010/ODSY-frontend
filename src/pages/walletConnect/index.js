import { useContext } from "react"
import {WalletContext} from "../../context/walletContext"
import Metamask from "./Metamask"
function WalletConnect() {
    const {wallet} = useContext(WalletContext)
    return(
        <>
            <Metamask/>
            <p>Wallet address: {wallet}</p>
        </>
    )
}

export default WalletConnect