import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import * as FaIcons from 'react-icons/fa'
import noImgAlt from '../../assets/image/nftDetailPage/noImgAlt.png'

import Web3 from "web3"

import { tradeAddr } from "../../contractABI/address"
import { nftAddr } from "../../contractABI/address"
import { odsyAddr } from "../../contractABI/address"
const tradeABI = require('../../contractABI/tradeABI.json')
const nftABI = require('../../contractABI/nftABI.json')
const odsyABI = require('../../contractABI/odsyABI.json')

function NftDetail(props) {
    const pathParams = useParams()
    const tokenId = pathParams.tokenId
    const [nftImg, setNftImg] = useState(noImgAlt)
    const [title, setTitle] = useState(null)
    const [saleOption, setSaleOption] = useState(0)
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

    const getNftDetail = () => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'nft/' + tokenId)
            .then(res => res.json())
            .then(
                data => {
                    setTitle(data[0].title)
                    setSaleOption(data[0].saleMethod)
                    setCurType(data[0].curType)
                    setOwnerAddr(data[0].ownerAddr)
                    setCreatorAddr(data[0].creatorAddr)
                    setDesc(data[0].description)
                    setPrice(data[0].price)
                    setChainId(data[0].chainId)
                    setFollowerCnt(data[0].followerCnt)
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
                    setOwnerName(data[0].name)
                }
            )
    }
    const getCreatorInfo = (address) => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'user/' + address)
            .then(res => res.json())
            .then(
                data => {
                    setCreatorName(data[0].name)
                }
            )
    }
    const getFavNftIds = () => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'user/' + localStorage.getItem('connectedWalletAddress'))
            .then( res => res.json())
            .then( data => {
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
    const mint = async () => {
        var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        let localAccounts = await web3.eth.getAccounts()
        const nftContract = new web3.eth.Contract(nftABI, nftAddr)
        try {
            let tx = await nftContract.methods.mint(
                "QmPAd7oqiiCqi7Z6LRWzaz8vhZeJT4jxmckWWeXydJsQwu", //ipfsHash
                0, // sale
                0, // curType
                web3.utils.toWei('1', 'ether'), // price
                1 // royalty
            ).send({from: localAccounts[0], gas:3000000})
            console.log(tx)
        } catch (e) { console.log(e.message) }
        await nftContract.methods.approve(tradeAddr, 0).send({from: localAccounts[0]})
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
        recentlyViewCover: {}
    }
    return(
        <div style={styles.nftDetailCover}>
            <button className="smNormal" onClick={mint}>Test Mint</button>
            <button className="smNormal" onClick={mint}>
                <Link to={'/update/' + tokenId}>Update</Link>
            </button>
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
                        <div style={{display:'flex', width:'50%'}}>
                            <img src={ownerAvatar}/>
                            <div>
                                <p>Owned By:</p>
                                <p>{ownerName}</p>
                            </div>
                        </div>
                        <div style={{display:'flex', width:'50%'}}>
                            <img src={creatorAvatar}/>
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
                            <span style={{color:'#FFBD0C', fontWeight:'normal', marginRight:'20px'}}>Sell Price</span>
                            <span style={{fontWeight:'bold'}}>{price}{currency}</span>
                        </div>
                        <div style={styles.priceCover}>
                            <span style={{color:'#FFBD0C', fontWeight:'normal', marginRight:'20px'}}>Sale Ends In</span>
                            {
                                saleOption == 0?
                                ""
                                :
                                <span style={{fontWeight:'bold'}}>04 : 23 : 10 : 39</span>
                            }
                        </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-around', margin:'40px 0 0 0'}}>
                        {
                            saleOption == 0 ? //{ 0: sale, 1: auction}
                                <>
                                    <button className="smNormal" onClick={buyNft}>Buy Now</button>
                                    <button className="smNormal" onClick={buyNft}>Make Offer</button>
                                </>
                            :
                                <button className="smNormal">Place Bid</button>
                        }
                    </div>
                </div>
            </div>
            <div style={styles.recentlyViewCover}>

            </div>
        </div>
    )
}

export default NftDetail