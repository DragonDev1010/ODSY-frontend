import {useContext, useEffect, useState} from 'react' 
import { useParams } from "react-router-dom"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { MessageContext } from '../../context/messageContext';
import { WalletContext } from '../../context/walletContext';
import Web3 from "web3"
import { auctionAddr } from '../../contractABI/address';
import { nftAddr } from '../../contractABI/address';
const auctionABI = require('../../contractABI/auctionABI.json')
const nftABI = require('../../contractABI/nftABI.json')

function NftUpdate() {
    const pathParams = useParams()
    const tokenId = pathParams.tokenId

    const msgContext = useContext(MessageContext)
    const walContext = useContext(WalletContext)

    let provider = window.ethereum
    const [startPrice, setStartPrice] = useState(0)
    const [startAt, setStartAt] = useState(null)
    const [endAt, setEndAt] = useState(null)
    const [saleMethod, setSaleMethod] = useState(null)
    const [owner, setOwner] = useState(null)

    const getNftInfo = () => {
        try {
            let fetchURL = process.env.REACT_APP_API_BASE_URL+'nft/' + tokenId.toString()

            fetch(fetchURL)
                .then(res => res.json())
                .then(data => {
                    if(data.length > 0) {
                        setSaleMethod(data[0].saleMethod)
                        setOwner(data[0].ownerAddr)
                    }
                })
        } catch (e) { msgContext.setMessage(e) }
    }

    const openAuction = async () => {
        await provider.request({method: 'eth_requestAccounts'})
        const web3 = new Web3(provider)
        const auctionContract = new web3.eth.Contract(auctionABI, auctionAddr)
        let started = startAt.getTime()/1000
        let ended = endAt.getTime()/1000
        const nftContract = new web3.eth.Contract(nftABI, nftAddr)
        try {
            let t = await nftContract.methods.approve(auctionAddr, tokenId).send({from: localStorage.getItem('connectedWalletAddress')})
        } catch (e) {msgContext.setMessage(e); return}
        try {
            let tx = await auctionContract.methods.openAuction(tokenId, startPrice, started, ended).send({from: localStorage.getItem('connectedWalletAddress')})
        } catch (e) {msgContext.setMessage(e); return}

        try {
            fetch(
                process.env.REACT_APP_API_BASE_URL+'nft/' + tokenId.toString(),
                {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        saleMethod: 1, 
                        auctionEndIn: endAt, 
                        auctionStartIn: startAt, 
                        auctionStartPrice: startPrice,
                        auctionHighestBid: startPrice,
                        auctionHighestBidder: owner
                    })
                }
            )
        } catch (e) { msgContext.setMessage(e) }
    }

    useEffect(() => {
        getNftInfo()
    },[])
    return(
        <div>
            {/* <button onClick={mint}>Mint</button> */}
            {/* <button onClick={setAsAuction}>Set as auction</button> */}
            {
                walContext.wallet && walContext.wallet.toLowerCase() == owner.toLowerCase() && saleMethod == 0 ?
                <>
                    Set NFT in Auction: <br/>
                    start price: <input onChange={e => setStartPrice(+e.target.value)}></input> <br/>
                    start at: <input></input> <br/>
                    <DatePicker
                        selected={startAt}
                        onChange={setStartAt}
                        name="startAt"
                        showTimeSelect
                        timeFormat="HH"
                        timeIntervals={60}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                    />
                    end at: <input></input> <br/>
                    <DatePicker
                        selected={ endAt }
                        onChange={ setEndAt }
                        name="endAt"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={20}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                    />

                    <button onClick={openAuction}>Open auction</button>
                </>
                :
                ""
            }
        </div>
    )
}

export default NftUpdate