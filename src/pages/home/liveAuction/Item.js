import { useEffect, useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import getImageData from '../../../actions/getImageData'
import defaultImg from '../../../assets/image/noImgAlt.png'
import bscLogo from "../../../assets/image/explorerPage/bscLogo.svg"
import ethLogo from "../../../assets/image/explorerPage/ethLogo.png"
import polyLogo from "../../../assets/image/explorerPage/polyLogo.png"
import solLogo from "../../../assets/image/explorerPage/solLogo.png"
import bidFlame from "../../../assets/image/landingPage/bidFlame.png"

function Item(props) {
    const Ref = useRef(null);

    const [nftImg, setNftImg] = useState(defaultImg)
    const [fav, setFav] = useState(false)
    const [favNftIds, setFavNftIds] = useState([])
    const [followers, setFollowers] = useState(props.data.followerCnt)
    const [chainLogo, setChainLogo] = useState(bscLogo)
    const [chainName, setChainName] = useState('BNB')
    const [price, setPrice] = useState(0)

    const [ownerName, setOwnerName] = useState(null)
    const [ownerAvatar, setOwnerAvatar] = useState(defaultImg)
    const [timer, setTimer] = useState('00:00:00');
    const [started,setStarted] = useState(0)

    const updateFollowerCnt = (cnt) => {
        try {
            fetch(
                // "http://localhost:8000/user/0x453B8D46D3D41d3B3DdC09B20AE53aa1B6aB186E",
                process.env.REACT_APP_API_BASE_URL + 'nft/' + props.data.nft_id,
                {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({followerCnt: cnt})
                }
            )
        } catch (e) {
            
        }

    }

    const getChainDetail = () => {
        switch (props.data.chainId) {
            case 0: setChainLogo(bscLogo); setChainName('BNB'); break;
            case 1: setChainLogo(ethLogo); setChainName('ETH'); break;
            case 2: setChainLogo(polyLogo); setChainName('POLY'); break;
            case 3: setChainLogo(solLogo); setChainName('SOL'); break;
            default: break;
        }
    }
    
    // check if user wallet address is included in nft's favorite user wallet array
    const isFav = () => {
        for(let i = 0 ; i < favNftIds.length ; i++) {
            if(props.data.nft_id == favNftIds[i]) {
                setFav(true)
                return
            }
        }        
        setFav(false)
    }
    const getOwnerData = () => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'user/' + props.data.ownerAddr)
            .then( res => res.json())
            .then( data => {
                setFavNftIds(data[0].favIds)
                setOwnerName(data[0].name)
                let avatarTemp = getImageData(data[0].avatar.data.data)
                setOwnerAvatar(avatarTemp)
            })
    }

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {
        if (Ref.current) 
            clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let startIn = new Date(props.data.auctionStartIn)
        let endIn = new Date(props.data.auctionEndIn)
        
        let deadline;

        if(startIn > new Date()) {
            deadline = startIn;
            setStarted(0) // auction is not yet started
        }
        else if (startIn < new Date() && endIn > new Date()){
            deadline = endIn;
            setStarted(1) // auction is in progress
        } else {
            deadline = endIn;
            setStarted(2) // auction is already ended
        }
  
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }
    
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    useEffect(() => {
        if( props.data.img !== null) {
            let temp = getImageData(props.data.img.data.data)
            setNftImg(temp)
        }
        
        getOwnerData()
        getChainDetail()
        setPrice(props.data.price)
    }, [])

    useEffect(() => {
        isFav()
    }, [favNftIds])
    const styles = {
        cover: {
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap:"10px",
            width: '100%'
        },
        img: {
            width: "100%",
            height:'350px',
            objectFit: 'cover',
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
            width: "80px",
            height: '80px',
            borderRadius: '50%',
            objectFit: 'cover'
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
        },
        bidTimeCover: {
            width: "70%",
            display: "flex",
            height:"30px",
            background: "#14141F",
            padding: "5px",
            borderRadius: "10px",
            position: "relative",
            top: "-40px"
        },
        bidTimeCoverHide: {
            width: "70%",
            visibility: 'hidden',
            height:"30px",
            background: "#14141F",
            padding: "5px",
            borderRadius: "10px",
            position: "relative",
            top: "-40px",
        }
    }
    return(
        <div style={styles.cover}>
            <Link to={'/assets/' + props.data.nft_id}>
                <img src={nftImg} style={styles.img}/>
            </Link>
            {
                props.data.saleMethod == 0 ?
                <div style={styles.bidTimeCoverHide}>
                    <span>{timer} LEFT</span>
                    <img src={bidFlame} style={styles.flameLogo} alt=""/>
                </div>
                :
                <div style={styles.bidTimeCover}>
                    <span>{timer} LEFT</span>
                    <img src={bidFlame} style={styles.flameLogo} alt=""/>
                </div>
            }
            <div style={styles.colCover}>
                <Link to={'/assets/' + props.data.nft_id}>
                    <span>{props.data.title}</span>
                </Link>
                <img src={chainLogo} style={styles.chainLogo}></img>
            </div>
            <div style={styles.ownerCover}>
                <Link to={'/user/' + props.data.ownerAddr}>
                    <img src={ownerAvatar} style={styles.ownerAvatar}></img>
                </Link>
                <div style={styles.owner}>
                    <p style={styles.heading}>Owned By</p>
                    <Link to={'/user/' + props.data.ownerAddr}>
                        {
                            ownerName !== null ?
                            <p style={styles.normal}>{ownerName}</p>
                            :
                            <p style={styles.unknownName}>Unknown</p>
                        }
                    </Link>
                </div>
                <div style={styles.bidPrice}>
                    {
                        props.data.saleMethod == 0 ?
                        <p style={styles.heading}>Price:</p>
                        :
                        <p style={styles.heading}>Highest Bid:</p>
                    }
                    <p style={styles.normal}>{price} {chainName}</p>
                </div>
            </div>
            <div style={styles.buyCover}>
                {
                    props.data.saleMethod == 0 ?
                    <button className="smNormal"><Link to={'/assets/' + props.data.nft_id}>Buy Now</Link></button>
                    :
                    <button className="smNormal"><Link to={'/assets/' + props.data.nft_id}>Place Bid</Link></button>
                }
                <button className="favBtn">
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