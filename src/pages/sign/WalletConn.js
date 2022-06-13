import { useContext } from "react"

import { WalletContext } from "../../context/walletContext"
import { MessageContext } from "../../context/messageContext"
import MetamaskConnect from "../../actions/metamaskConnect"
import metamaskIcon from "../../assets/image/signPage/metamask.png"
import bitskiIcon from "../../assets/image/signPage/bitski.png"
import fortmatic from "../../assets/image/signPage/Fortmatic.png"
import walletConnect from '../../assets/image/signPage/WalletConnect.png'
import coinbaseWallet from '../../assets/image/signPage/CoinbaseWallet.png'
import authereum from '../../assets/image/signPage/Authereum.png'
import kaikas from '../../assets/image/signPage/Kaikas.png'
import torus from '../../assets/image/signPage/Torus.png'

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
        let connect = await MetamaskConnect()
        if(connect.address !== null) {
            walContext.setWallet(connect.address) // set `WalletContext` state `wallet`
        } else {
            msgContext.setMessage(connect.error)
            return 
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
                    <img src={fortmatic} />
                    <p style={styles.walName}>Fortmatic</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
                <button style={styles.walletCover}>
                    <img src={walletConnect} />
                    <p style={styles.walName}>Wallet Connect</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
                <button style={styles.walletCover}>
                    <img src={coinbaseWallet} />
                    <p style={styles.walName}>Coinbase Wallet</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
                <button style={styles.walletCover}>
                    <img src={authereum} />
                    <p style={styles.walName}>Authereum</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
                <button style={styles.walletCover}>
                    <img src={kaikas} />
                    <p style={styles.walName}>Kaikas</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
                <button style={styles.walletCover}>
                    <img src={torus} />
                    <p style={styles.walName}>Torus</p>
                    <p style={styles.walDetail}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </button>
            </div>
        </div>
    )
}

export default WalletConn