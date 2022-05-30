import {useState, useEffect, useContext} from 'react'
import * as FaIcons from 'react-icons/fa'
import bnbLogo from '../../assets/image/explorerPage/bscLogo.png'
import {WalletContext} from '../../context/walletContext'
import { MessageContext } from '../../context/messageContext'
import Web3 from "web3"
import { odsyAddr } from "../../contractABI/address"

const odsyABI = require('../../contractABI/odsyABI.json')

function MakeOfferForm(props) {
    const walContext = useContext(WalletContext)
    const msgContext = useContext(MessageContext)

    const submitOffer = () => {
        if(walContext.wallet === null) {msgContext.setMessage('Unlock your wallet!')}
        if(offerPrice > available) {msgContext.setMessage('Your balance is not enough')}
        var data = new FormData()

        data.append('nft_id', props.tokenId)
        data.append('offerPrice', offerPrice)
        data.append('offerCreator', walContext.wallet)
        data.append('expireDay', expire)
        
        fetch(
            process.env.REACT_APP_API_BASE_URL+'offers',
            {
                method: 'POST',
                body: data
            }
        )
    }  
    const [offerPrice, setOfferPrice] = useState(0)
    const [available, setAvailable] = useState(0)
    const [expire, setExpire] = useState(0)
    const [curSymbol, setCurSymbol] = useState('BNB')
    const styles = {
        box: {
            position: "relative",
            width: "40%",
            margin: "0 auto",
            height: "auto",
            maxHeight: "70vh",
            marginTop: "calc(100vh - 85vh - 20px)",
            background: "#fff",
            color: "black",
            borderRadius: "4px",
            padding: "20px",
            border: "1px solid #999",
            overflow: "auto",
        },
        headerCover: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        closeBtn: {
            background: 'none',
            border: 'none',
        },
        formCover: {
            padding: '10px'
        },
        inputCover: {
            border: '1px solid black',
            borderRadius: '10px',
            padding: '5px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        input: {
            border: 'none',
            textAlign: 'right',
            fontSize: '25px',
            width: '40%'
        },
        available: {
            padding: '30px 0 50px',
            textAlign: 'right'
        },
        btnCover: {
            textAlign: 'right',
            padding: '30px 0 20px 0'
        }
    }

    useEffect(async () => {
        let provider = window.ethereum
        if (typeof provider !== 'undefined') {
            const web3 = new Web3(provider)
            const odsyContract = new web3.eth.Contract(odsyABI, odsyAddr)
            if(props.currency == 0) {
                let temp = await web3.eth.getBalance(walContext.wallet)
                setAvailable(Number(web3.utils.fromWei(temp, 'ether')).toFixed(5))
            } else {
                let temp = await odsyContract.methods.balanceOf(walContext.wallet)
                setAvailable(Number(web3.utils.fromWei(temp, 'ether')).toFixed(5))
            }
        }
    }, [props.currency])
    return (
        <div className="makeOfferForm">
            <div style={styles.box}>
                <div style={styles.headerCover}>
                    <div style={{width:'100%', textAlign:'center'}}>
                        <h2 style={{marginBottom:'0'}}>Make an offer</h2>
                    </div>
                    <button onClick={() => props.close(false)} style={styles.closeBtn}><FaIcons.FaTimesCircle fill='black'/></button>
                </div>
                <div style={styles.formCover}>
                    <div style={styles.priceCover}>
                        <div style={styles.inputCover}>
                            <span>Offer Price:</span> 
                            <input type="number" style={styles.input} value={offerPrice} onChange={e => setOfferPrice(+e.target.value)}></input>
                            <div className='currencyFilterCover'>
                                <button className = "normal">
                                    {curSymbol}
                                </button>
                                <div className = "dropContent">
                                    <button onClick={() => setCurSymbol('BNB')}> BSC</button>
                                    <button onClick={() => setCurSymbol('ODSY')}> ODSY</button>
                                </div>
                            </div>
                        </div>
                        <div style={styles.available}>
                            <span>Available : {available} ({curSymbol})</span>
                        </div>
                    </div>
                    <div style={styles.inputCover}>
                        <span>Offer Expiration: </span>
                        <input type="number" style={styles.input} value={expire} onChange={e => setExpire(+e.target.value)}></input>
                        <button className = "normal">Days</button>
                    </div>
                    <div style={styles.btnCover}>
                        <button style={styles.offerBtn} className='inverseNormal' onClick={submitOffer}>Make Offer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakeOfferForm