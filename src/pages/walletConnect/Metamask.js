import { useContext } from "react"
import {WalletContext} from "../../context/walletContext"
function Metamask() {
    const {wallet, setWallet} = useContext(WalletContext)
    function connect() {
        setWallet("0x234234234")
    }
    return (
        <>
            <button onClick={connect}>Meta Mask</button>
        </>
    )
}

export default Metamask