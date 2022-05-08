import { useEffect, useState, useContext } from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link } from 'react-router-dom'
import defaultImg from '../../assets/image/noImgAlt.png'
import bscLogo from "../../assets/image/explorerPage/bscLogo.svg"
import ethLogo from "../../assets/image/explorerPage/ethLogo.png"
import polyLogo from "../../assets/image/explorerPage/polyLogo.png"
import solLogo from "../../assets/image/explorerPage/solLogo.png"
import getImageData from '../../getImageData'

import {WalletContext} from '../../context/walletContext'

function Item(props) {
    const walContext = useContext(WalletContext)
    const styles = {
        cover: {
            flexBasis: "20%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap:"10px"
        },
        img: {
            width: "100%",
            background: "#7A798A",
            borderRadius: "18px"
        },
        colCover: {
            display: "flex",
            justifyContent: "space-between"
        },
        chainLogo: {
            width: "10%"
        },
        ownerCover: {
            display: "flex",
            justifyContent: "space-around"
        },
        ownerAvatar: {
            width: "20%"
        },
        owner: {

        },
        buyCover: {
            display: "flex",
            justifyContent: "space-between"
        },
        heading: {
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '400',
            color: '#e4dfdf'
        },
        normal: {
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '700',
        },
        unknownName: {
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '700',
            color: '#403838'
        }
    }

    const [nftImg, setNftImg] = useState(defaultImg)
    const [fav, setFav] = useState(false)
    const [favNftIds, setFavNftIds] = useState([])
    const [followers, setFollowers] = useState(props.nft.followerCnt)
    const [chainLogo, setChainLogo] = useState(bscLogo)
    const [chainName, setChainName] = useState('BNB')
    const [price, setPrice] = useState(0)

    const [ownerName, setOwnerName] = useState(null)
    const [ownerAvatar, setOwnerAvatar] = useState(defaultImg)

    const updateFavNft = (updatedFavIds) => {
        try {
            fetch(
                // "http://localhost:8000/user/0x453B8D46D3D41d3B3DdC09B20AE53aa1B6aB186E",
                process.env.REACT_APP_API_BASE_URL + 'user/' + walContext.wallet,
                {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({favIds: updatedFavIds})
                }
            )
        } catch (e) {
            
        }
    }
    const updateFollowerCnt = (cnt) => {
        try {
            fetch(
                // "http://localhost:8000/user/0x453B8D46D3D41d3B3DdC09B20AE53aa1B6aB186E",
                process.env.REACT_APP_API_BASE_URL + 'nft/' + props.nft.nft_id,
                {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({followerCnt: cnt})
                }
            )
        } catch (e) {
            
        }

    }
    const getFavNftIds = () => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'user/' + walContext.wallet)
            .then( res => res.json())
            .then( data => {
                setFavNftIds(data[0].favIds)
            })
    }
    const getChainDetail = () => {
        switch (props.nft.chainId) {
            case 0: setChainLogo(bscLogo); setChainName('BNB'); break;
            case 1: setChainLogo(ethLogo); setChainName('ETH'); break;
            case 2: setChainLogo(polyLogo); setChainName('POLY'); break;
            case 3: setChainLogo(solLogo); setChainName('SOL'); break;
            default: break;
        }
    }
    const toggleFav = () => {
        if(fav) {
            let idx = favNftIds.indexOf(props.nft.nft_id)
            if (idx > -1)
                favNftIds.splice(idx, 1)
            updateFavNft(favNftIds)
            updateFollowerCnt(followers-1)
            setFollowers(followers-1)
        } else {
            favNftIds.push(props.nft.nft_id)
            updateFavNft(favNftIds)
            updateFollowerCnt(followers+1)
            setFollowers(followers+1)
        }
        setFav(!fav)
    }
    // check if user wallet address is included in nft's favorite user wallet array
    const isFav = () => {
        for(let i = 0 ; i < favNftIds.length ; i++) {
            if(props.nft.nft_id == favNftIds[i]) {
                setFav(true)
                return
            }
        }        
        setFav(false)
    }
    const getOwnerData = () => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'user/' + props.nft.ownerAddr)
            .then( res => res.json())
            .then( data => {
                setFavNftIds(data[0].favIds)
                setOwnerName(data[0].name)
                let avatarTemp = getImageData(data[0].avatar.data.data)
                setOwnerAvatar(avatarTemp)
            })
    }

    useEffect(() => {
        if( props.nft.img !== null) {
            let temp = getImageData(props.nft.img.data.data)
            setNftImg(temp)
        }
        
        // getFavNftIds()
        getOwnerData()
        getChainDetail()
        setPrice(props.nft.price)
    }, [])
    useEffect(() => {
        isFav()
    }, [favNftIds])
    return(
        <div style={styles.cover}>
            <img src={nftImg} style={styles.img}/>
            <div style={styles.colCover}>
                <span>{props.nft.title}</span>
                <img src={chainLogo} style={styles.chainLogo}></img>
            </div>
            <div style={styles.ownerCover}>
                <img src={ownerAvatar} style={styles.ownerAvatar}></img>
                <div style={styles.owner}>
                    <p style={styles.heading}>Owned By</p>
                    {
                        ownerName !== null ?
                        <p style={styles.normal}>{ownerName}</p>
                        :
                        <p style={styles.unknownName}>Unknown</p>
                    }
                </div>
                <div style={styles.bidPrice}>
                    <p style={styles.heading}>Current Bid:</p>
                    <p style={styles.normal}>{price} {chainName}</p>
                </div>
            </div>
            <div style={styles.buyCover}>
                <button className="smNormal"><Link to={'/assets/' + props.nft.nft_id}>Buy Now</Link></button>
                <button className="favBtn" onClick={toggleFav}>
                    {
                        fav ?
                            <FaIcons.FaHeart/>
                        :
                            <FaIcons.FaRegHeart/> 
                    }
                    {followers}
                </button>
            </div>
        </div>
    )
}

export default Item