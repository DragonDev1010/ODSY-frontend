import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import * as FaIcons from 'react-icons/fa'
import noImgAlt from '../../assets/image/noImgAlt.png'

import Web3 from "web3"

import MakeOfferForm from "./MakeOfferForm"
import OfferList from './OfferList'
import getImageData from "../../actions/getImageData"
import { tradeAddr } from "../../contractABI/address"
import { odsyAddr } from "../../contractABI/address"
import Properties from "./Properties"
import About from "./About"
const tradeABI = require('../../contractABI/tradeABI.json')
const odsyABI = require('../../contractABI/odsyABI.json')

function NftDetail(props) {
    const pathParams = useParams()
    const tokenId = pathParams.tokenId

    const [nftImg, setNftImg] = useState(noImgAlt)
    const [title, setTitle] = useState(null)
    const [saleOption, setSaleOption] = useState(0) // {0: sale, 1: auction}
    const [curType, setCurType] = useState(0)
    const [viewCnt, setViewCnt] = useState(0)
    const [followerCnt, setFollowerCnt] = useState(0)
    const [ownerAddr, setOwnerAddr] = useState(null)
    const [ownerAvatar, setOwnerAvatar] = useState(noImgAlt)
    const [ownerName, setOwnerName] = useState(null)
    const [creatorAddr, setCreatorAddr] = useState(null)
    const [creatorAvatar, setCreatorAvatar] = useState(noImgAlt)
    const [creatorName, setCreatorName] = useState(null)
    const [desc, setDesc] = useState(null)
    const [price, setPrice] = useState(0)
    const [chainId, setChainId] = useState(0)
    const [currency, setCurrency] = useState('BNB')
    const [fav, setFav] = useState(false)
    const [favNftIds, setFavNftIds] = useState([])
    const [buyer, setBuyer] = useState(null)
    const [makeOffer, setMakeOffer] = useState(false)

    const [selectedDetailPad, setSelectedDetailPad] = useState(0)
    const [properties, setProperties] = useState(null)

    const getNftDetail = () => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'nft/' + tokenId)
            .then(res => res.json())
            .then(
                data => {
                    if(data.length > 0) {
                        setTitle(data[0].title)
                        setSaleOption(data[0].saleMethod)
                        setCurType(data[0].curType)
                        setOwnerAddr(data[0].ownerAddr)
                        setCreatorAddr(data[0].creatorAddr)
                        setDesc(data[0].description)
                        setPrice(data[0].price)
                        setChainId(data[0].chainId)
                        setFollowerCnt(data[0].followerCnt)
    
                        let nftImgTemp = getImageData(data[0].img.data.data)
                        setNftImg(nftImgTemp)
                        setProperties(data[0].properties)
                    }
                }
            )
    }
    const getCurrency = () => {
        switch (chainId) {
            case 0: setCurrency('BNB'); break;
            case 1: setCurrency('ETH'); break;
            case 2: setCurrency('POLY'); break;
            case 3: setCurrency('SOL'); break;
            default: break;
        }
    }
    const getOwnerInfo = (address) => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'user/' + address)
            .then(res => res.json())
            .then(
                data => {
                    if(data.length > 0) {
                        setOwnerName(data[0].name)
                        let ownerImgTemp = getImageData(data[0].avatar.data.data)
                        setOwnerAvatar(ownerImgTemp)
                    }
                }
            )
    }
    const getCreatorInfo = (address) => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'user/' + address)
            .then(res => res.json())
            .then(
                data => {
                    if(data.length > 0) {
                        setCreatorName(data[0].name)
                        let creatorImgTemp = getImageData(data[0].avatar.data.data)
                        setCreatorAvatar(creatorImgTemp)
                    }
                }
            )
    }
    const getFavNftIds = () => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'user/' + localStorage.getItem('connectedWalletAddress'))
            .then( res => res.json())
            .then( data => {
                if(data.length > 0)
                    setFavNftIds(data[0].favIds)
            })
    }
    const isFav = () => {
        for(let i = 0 ; i < favNftIds.length ; i++) {
            if(Number(tokenId) == favNftIds[i]) {
                setFav(true)
                return
            }
        }        
        setFav(false)
    }
    const updateFavNft = (updatedFavIds) => {
        try {
            fetch(
                // "http://localhost:8000/user/0x453B8D46D3D41d3B3DdC09B20AE53aa1B6aB186E",
                process.env.REACT_APP_API_BASE_URL + 'user/' + localStorage.getItem('connectedWalletAddress'),
                {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({favIds: updatedFavIds})
                }
            )
        } catch (e) {}
    }
    const updateFollowerCnt = (cnt) => {
        try {
            fetch(
                // "http://localhost:8000/user/0x453B8D46D3D41d3B3DdC09B20AE53aa1B6aB186E",
                process.env.REACT_APP_API_BASE_URL + 'nft/' + tokenId,
                {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({followerCnt: cnt})
                }
            )
        } catch (e) {}
    }
    const toggleFav = () => {
        if(fav) {
            let idx = favNftIds.indexOf(Number(tokenId))
            if (idx > -1)
                favNftIds.splice(idx, 1)
            updateFavNft(favNftIds)
            updateFollowerCnt(followerCnt-1)
            setFollowerCnt(followerCnt-1)
        } else {
            favNftIds.push(Number(tokenId))
            updateFavNft(favNftIds)
            updateFollowerCnt(followerCnt+1)
            setFollowerCnt(followerCnt+1)
        }
        setFav(!fav)
    }

    const buyNft = async() => {
        let provider = window.ethereum
        if (typeof provider !== 'undefined') {
            await provider.request({method: 'eth_requestAccounts'})
            const web3 = new Web3(provider)
            const tradeContract = new web3.eth.Contract(tradeABI, tradeAddr)
            if (curType == 0) {
                try {
                    await tradeContract.methods.buy(tokenId).send({from:buyer, gas: 3000000, value: web3.utils.toWei(price.toString(), 'ether')})
                } catch (e) { console.log(e.message) }
            } else if (curType == 1) {
                const odsyContract = new web3.eth.Contract(odsyABI, odsyAddr)
                try {
                    await odsyContract.methods.approve(tradeAddr, web3.utils.toWei(price.toString(), 'ether')).send({from: buyer, gas: 3000000})
                } catch (e) { console.log(e.message) }

                try {
                    await tradeContract.methods.buy(tokenId).send({from: buyer, gas: 3000000})
                } catch (e) { console.log(e.message) }
            }
        } else {
            console.log('Please install metamask!')
        }
    }

    useEffect( () => { 
        getNftDetail(); 
        getFavNftIds(); 
        setBuyer(localStorage.getItem('connectedWalletAddress'))
    }, [])

    useEffect( () => { isFav() }, [favNftIds])

    useEffect( () => { getCurrency() }, [chainId])

    useEffect( () => { getOwnerInfo(ownerAddr) }, [ownerAddr])

    useEffect( () => { getCreatorInfo(creatorAddr) }, [creatorAddr])
    const styles = {
        nftDetailCover: {
            padding: '20px 10% 0 10%'
        },
        mainCover: {
            display: 'flex'
        },
        nftImg: {
            width: '50%'
        },
        nftInfo: {
            width: '50%'
        },
        priceCover: {
            display:'flex',
            justifyContent: 'space-between',
            width: '40%',
            background: 'rgb(20, 20, 31)',
            padding: '12px 20px',
            borderRadius: '8px'
        },
        recentlyViewCover: {},
        avatarImg: {
            width: '120px',
            height: '120px',
            borderRadius: '50%'
        }
    }

    return(
        <div style={styles.nftDetailCover}>
            <div style={styles.mainCover}>
                <div style={styles.nftImg}>
                    <img src={nftImg} style={{width:'80%'}}/>
                </div>
                <div style={styles.nftInfo}>
                    <h1>{title}</h1>
                    <div style={{display:'flex', justifyContent:'space-between', margin:'40px 0 0 0'}}>
                        <div style={{display:'flex', gap: '10px'}}>
                            <button className="favBtn"><FaIcons.FaRegEye/>225</button>
                            <button className="favBtn" onClick={toggleFav}>{ fav ? <FaIcons.FaHeart/> : <FaIcons.FaRegHeart/> }{followerCnt}</button>
                        </div>
                        <div style={{display:'flex', gap: '10px'}}>
                            <button className="favBtn"><FaIcons.FaTelegramPlane/></button>
                            <button className="favBtn"><FaIcons.FaEllipsisH/></button>
                        </div>
                    </div>
                    <div style={{display:'flex', margin:'40px 0 0 0'}}>
                        <div style={{display:'flex', width:'50%', justifyContent: 'space-evenly'}}>
                            <img src={ownerAvatar} style={styles.avatarImg}/>
                            <div>
                                <p>Owned By:</p>
                                <p>{ownerName}</p>
                            </div>
                        </div>
                        <div style={{display:'flex', width:'50%', justifyContent: 'space-evenly'}}>
                            <img src={creatorAvatar} style={styles.avatarImg}/>
                            <div>
                                <p>Created By:</p>
                                <p>{creatorName}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{margin: '40px 0 0 0'}}>
                        {desc}
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', margin:'40px 0 0 0'}}>
                        <div style={styles.priceCover}>
                            <span style={{color:'#FFBD0C', fontWeight:'normal', marginRight:'20px'}}>{saleOption == 0 ? "Sell Price" : "Highest Bid"}</span>
                            <span style={{fontWeight:'bold'}}>{price}{currency}</span>
                        </div>
                            {
                                saleOption == 0?
                                ""
                                :
                                <div style={styles.priceCover}>
                                    <span style={{color:'#FFBD0C', fontWeight:'normal', marginRight:'20px'}}>Auction Ends In</span>
                                        <span style={{fontWeight:'bold'}}>04 : 23 : 10 : 39</span>
                                </div>
                            }
                    </div>
                    <div style={{display:'flex', justifyContent:'space-around', margin:'40px 0 0 0'}}>
                        {
                            saleOption == 0 ? //{ 0: sale, 1: auction}
                                <>
                                    <button className="smNormal" onClick={buyNft}>Buy Now</button>
                                    <button className="smNormal" onClick={() => setMakeOffer(true)}>Make Offer</button>
                                </>
                            :
                                <button className="smNormal">Place Bid</button>
                        }
                        {
                            makeOffer && <MakeOfferForm close={setMakeOffer} tokenId = {tokenId} currency={curType}/>
                        }
                    </div>
                    {/* <div style={{marginTop: '100px'}}>
                        <h3 style={{marginBottom: '20px'}}>Offer List</h3>
                        <OfferList tokenId={tokenId}/>
                    </div> */}
                    <div className="nftDetailInfoCover">
                        <div className="nftDetailInfoHeader">
                            <button style={selectedDetailPad == 0?{color:'#e1b70c'}:{}} onClick={e => setSelectedDetailPad(0)}>Offer List</button>
                            <button style={selectedDetailPad == 1?{color:'#e1b70c'}:{}} onClick={e => setSelectedDetailPad(1)}>Traits/Properties</button>
                            <button style={selectedDetailPad == 2?{color:'#e1b70c'}:{}} onClick={e => setSelectedDetailPad(2)}>About</button>
                        </div>
                        <div className="nftDetailInfoBody">
                        {
                            selectedDetailPad == 0 ? 
                            <OfferList tokenId={tokenId}/>
                            :
                                selectedDetailPad == 1 ?
                                <Properties data={properties}/>
                                :
                                <About mint={'250'} rarity={'5'}/>
                        }
                        </div>
                    </div>
                </div>
            </div>
            <div style={styles.recentlyViewCover}>

            </div>
        </div>
    )
}

export default NftDetail