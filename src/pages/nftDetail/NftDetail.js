import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as FaIcons from 'react-icons/fa'
import noImgAlt from '../../assets/image/nftDetailPage/noImgAlt.png'

function NftDetail(props) {
    const pathParams = useParams()
    const tokenId = pathParams.tokenId
    // const styles = {}
    const [nftImg, setNftImg] = useState(noImgAlt)
    const [title, setTitle] = useState(null)
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

    const getNftDetail = () => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'nft/' + tokenId)
            .then(res => res.json())
            .then(
                data => {
                    setTitle(data[0].title)
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

    const buyNft = () => {
        fetch( process.env.REACT_APP_API_BASE_URL + 'buyNft' )
    }
    useEffect( () => { getNftDetail(); getFavNftIds(); }, [])

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
            <div style={styles.mainCover}>
                <div style={styles.nftImg}>
                    <img src={nftImg} style={{width:'80%'}}/>
                </div>
                <div style={styles.nftInfo}>
                    <h1>{title}</h1>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div style={{display:'flex', gap: '10px'}}>
                            <button className="favBtn"><FaIcons.FaRegEye/>225</button>
                            <button className="favBtn" onClick={toggleFav}>{ fav ? <FaIcons.FaHeart/> : <FaIcons.FaRegHeart/> }{followerCnt}</button>
                        </div>
                        <div style={{display:'flex', gap: '10px'}}>
                            <button className="favBtn"><FaIcons.FaTelegramPlane/></button>
                            <button className="favBtn"><FaIcons.FaEllipsisH/></button>
                        </div>
                    </div>
                    <div style={{display:'flex'}}>
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
                    <div>
                        {desc}
                    </div>
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        <div style={styles.priceCover}>
                            <span style={{color:'#FFBD0C', fontWeight:'normal', marginRight:'20px'}}>Sell Price</span>
                            <span style={{fontWeight:'bold'}}>{price}{currency}</span>
                        </div>
                        <div style={styles.priceCover}>
                            <span style={{color:'#FFBD0C', fontWeight:'normal', marginRight:'20px'}}>Sale Ends In</span>
                            <span style={{fontWeight:'bold'}}>04 : 23 : 10 : 39</span>
                        </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        <button className="smNormal" onClick={buyNft}>Buy Now</button>
                        <button className="smNormal">Place Bid</button>
                    </div>
                </div>
            </div>
            <div style={styles.recentlyViewCover}>

            </div>
        </div>
    )
}

export default NftDetail