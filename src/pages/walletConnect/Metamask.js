import { useContext, useState } from "react"
import {WalletContext} from "../../context/walletContext"
function Metamask() {
    const {setWallet} = useContext(WalletContext)

    async function connectWallet() {
        if (window.ethereum) {
            try {
                const addressArray = await window.ethereum.request({method: 'eth_requestAccounts'});
                if (!addressArray.length) {
                    return;
                }
                setWallet(addressArray[0])
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("you do not have installed metamask")
        }
    }

    return (
        <>
            <button onClick={connectWallet}>Meta Mask</button>
        </>
    )
}

export default Metamask