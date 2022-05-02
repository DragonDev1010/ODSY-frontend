import {useState, useEffect} from 'react'
import * as FaIcons from 'react-icons/fa'
import bnbLogo from '../../assets/image/explorerPage/bscLogo.svg'
function MakeOfferForm(props) {
    const [price, setPrice] = useState(0)
    const [curType, setCurType] = useState(0)
    const [curSymbol, setCurSymbol] = useState('BNB')
    const [bal, setBal] = useState(0)
    const styles = {
        popupBox: {
            position: "fixed",
            background: "#000000a6",
            width: "100%",
            height: "100vh",
            top: "0",
            left: "0"
        },
        box: {
            position: "relative",
            width: "70%",
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
        }
    }
    const closePopup = () => {
        props.close(false)
    }
    const setBNB = () => {setCurType(0)}
    const setODSY = () => { setCurType(1) }
    const submitOffer = () => {
        var data = new FormData()
        data.append('nft_id', props.tokenId)
        data.append('offerPrice', price)
        data.append('offerCreator', localStorage.getItem('connectedWalletAddress'))
        fetch(
            process.env.REACT_APP_API_BASE_URL+'offers',
            {
                method: 'POST',
                body: data
            }
        )
    }  
    useEffect(() => {
        switch (curType) {
            case 0: setCurSymbol('BNB'); break;
            case 1: setCurSymbol('ODSY'); break;
            default: break;
        }
    }, [curType])
    return (
        <div style={styles.popupBox}>
            <div style={styles.box}>
                <button onClick={closePopup}><FaIcons.FaTimesCircle/></button>
                <form style={{color:'black'}}>
                    <button onClick={setBNB} style={{color:'black'}}>BNB</button>
                    <button onClick={setODSY} style={{color:'black'}}>ODSY</button>
                    price: <input value={price} onChange={e => setPrice(+e.target.value)} style={{color:'black'}}></input> {curSymbol}
                    <button onClick={submitOffer}>Make Offer</button>
                </form>
            </div>
        </div>
    )
}

export default MakeOfferForm