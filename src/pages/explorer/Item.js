import { useEffect, useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import { Link } from 'react-router-dom'
import bscLogo from "../../assets/image/explorerPage/bscLogo.svg"
import ethLogo from "../../assets/image/explorerPage/ethLogo.png"
import polyLogo from "../../assets/image/explorerPage/polyLogo.png"
import solLogo from "../../assets/image/explorerPage/solLogo.png"

function Item(props) {
    const styles = {
        cover: {
            flexBasis: "20%",
            padding: "20px"
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
        }
    }

    const [img, setImg] = useState(null)
    const [fav, setFav] = useState(false)
    const [favNftIds, setFavNftIds] = useState([])
    const [followers, setFollowers] = useState(props.nft.followerCnt)
    const [chainLogo, setChainLogo] = useState(bscLogo)
    const [chainName, setChainName] = useState('BNB')
    const [price, setPrice] = useState(0)

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }
    const setImgData = (buffer) => {
        let temp = 'data:image/jpeg;base64,' + arrayBufferToBase64(buffer)
        setImg(temp)
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
        fetch(process.env.REACT_APP_API_BASE_URL + 'user/' + localStorage.getItem('connectedWalletAddress'))
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
    useEffect(() => {
        setImgData(props.nft.img.data.data)
        getFavNftIds()
        getChainDetail()
        setPrice(props.nft.price)
    }, [])
    useEffect(() => {
        isFav()
    }, [favNftIds])
    return(
        <div style={styles.cover}>
            <img src={img} style={styles.img}/>
            <div style={styles.colCover}>
                <span>{props.nft.title}</span>
                <img src={chainLogo} style={styles.chainLogo}></img>
            </div>
            <div style={styles.ownerCover}>
                <img src={img} style={styles.ownerAvatar}></img>
                <div style={styles.owner}>
                    <p>Owned By</p>
                    <p>David</p>
                </div>
                <div style={styles.bidPrice}>
                    <p>Current Bid:</p>
                    <p>{price} {chainName}</p>
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