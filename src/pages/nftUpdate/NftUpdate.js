import {useEffect, useState} from 'react' 
import { useParams } from "react-router-dom"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Web3 from "web3"
import { auctionAddr } from '../../contractABI/address';
import { nftAddr } from '../../contractABI/address';
const auctionABI = require('../../contractABI/auctionABI.json')
const nftABI = require('../../contractABI/nftABI.json')

function NftUpdate() {
    let provider = window.ethereum
    const [startPrice, setStartPrice] = useState(0)
    const [startAt, setStartAt] = useState(null)
    const [endAt, setEndAt] = useState(null)
    const pathParams = useParams()
    const tokenId = pathParams.tokenId
    const mint = async () => {
        await provider.request({method: 'eth_requestAccounts'})
        const web3 = new Web3(provider)
        const nftContract = new web3.eth.Contract(nftABI, nftAddr)
        
        let hash_, sale, currency, price, royalty, tx

        hash_ = "QmPAd7oqiiCqi7Z6LRWzaz8vhZeJT4jxmckWWeXydJsQwu"
        sale = 0 // {0:'sale', 1:'auction'}
        currency = 0 // {0:'native', 1:'erc20'}
        price = web3.utils.toWei('1', 'ether')
        royalty = 3 // 3%
        tx = await nftContract.methods.mint(hash_, sale, currency, price, royalty).send({from: localStorage.getItem('connectedWalletAddress')})
        console.log(tx)
    }
    const setAsAuction = async () => {
        await provider.request({method: 'eth_requestAccounts'})
        const web3 = new Web3(provider)
        const nftContract = new web3.eth.Contract(nftABI, nftAddr)
        
        let tx = await nftContract.methods.updateSaleMethod(0, 1).send({from: localStorage.getItem('connectedWalletAddress')})
        console.log(tx)
    }
    
    const openAuction = async () => {
        await provider.request({method: 'eth_requestAccounts'})
        const web3 = new Web3(provider)
        const auctionContract = new web3.eth.Contract(auctionABI, auctionAddr)
        let started = startAt.getTime()/1000
        let ended = endAt.getTime()/1000
        const nftContract = new web3.eth.Contract(nftABI, nftAddr)
        let t = await nftContract.methods.approve(auctionAddr, tokenId).send({from: localStorage.getItem('connectedWalletAddress')})
        console.log(t)
        await auctionContract.methods.openAuction(tokenId, startPrice, started, ended).send({from: localStorage.getItem('connectedWalletAddress')})
    }
    return(
        <div>
            <button onClick={mint}>Mint</button>
            <button onClick={setAsAuction}>Set as auction</button>
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
        </div>
    )
}

export default NftUpdate