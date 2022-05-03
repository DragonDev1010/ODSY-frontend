import { useContext } from "react"

import metamaskIcon from "../../assets/image/signPage/metamask.png"
import bitskiIcon from "../../assets/image/signPage/bitski.png"
import { WalletContext } from "../../context/walletContext"
import { MessageContext } from "../../context/messageContext"
const {ethereum} = window

function WalletConn() {
    // get the entire `WalletContext` object
    const walContext = useContext(WalletContext)
    const msgContext = useContext(MessageContext)

    const styles = {
        groupCover: {
            display: "flex",
            flexWrap: "wrap",
            padding: "100px",
            justifyContent: "space-between"
        },
        walletCover: {
            width:"22%",
            background: "#343444",
            borderRadius: "12px",
            margin: "10px 0",
            textAlign: "center",
            border: "none"
        }
    }

    const metamaskConn = async () => {
        if(!ethereum) {
            msgContext.setMessage("Make sure you have Metamask installed")
            return
        }
        try {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})
            if(accounts.length > 0) {
                walContext.setWallet(accounts[0]) // set `WalletContext` state `wallet`
                localStorage.setItem('connectedWallet', accounts[0])
            }
        } catch (e) {
            msgContext.setMessage(e.message)
        }
    }

    return(
        <div style={{paddingTop: "100px"}}>
            <h1 style={{textAlign: "center"}}>Connect Your Wallet</h1>
            <h4 style={{textAlign: "center"}}>Connect your wallet to sign in and start using Odyssey Venture</h4>
            <div style={styles.groupCover}>
                <button style={styles.walletCover} onClick={metamaskConn}>
                    <img src={metamaskIcon} />
                    <p style={styles.walName}>Metamask</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
                <button style={styles.walletCover}>
                    <img src={bitskiIcon} />
                    <p style={styles.walName}>Bitski</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
                <button style={styles.walletCover}>
                    <img src={metamaskIcon} />
                    <p style={styles.walName}>Metamask</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
                <button style={styles.walletCover}>
                    <img src={metamaskIcon} />
                    <p style={styles.walName}>Metamask</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
                <button style={styles.walletCover}>
                    <img src={metamaskIcon} />
                    <p style={styles.walName}>Metamask</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
                <button style={styles.walletCover}>
                    <img src={metamaskIcon} />
                    <p style={styles.walName}>Metamask</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
                <button style={styles.walletCover}>
                    <img src={metamaskIcon} />
                    <p style={styles.walName}>Metamask</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
                <button style={styles.walletCover}>
                    <img src={metamaskIcon} />
                    <p style={styles.walName}>Metamask</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
            </div>
        </div>
    )
}

export default WalletConn