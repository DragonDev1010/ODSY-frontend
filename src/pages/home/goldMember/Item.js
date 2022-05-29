import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as FaIcons from "react-icons/fa"
import bscLogo from "../../../assets/image/landingPage/bscLogo.png"
import getImageData from '../../../actions/getImageData'
import defaultImg from '../../../assets/image/noImgAlt.png'

function Item(props) {
    const [onwerName, setOwnerName] = useState(null)
    const [ownerAvatar, setOwnerAvatar] = useState(null)
    const [curSymbol, setCurSymbol] = useState(null)

    const styles = {
        itemCover: {
            width: '100%',
            margin: '0 10%'
        },
        itemImg: {
            width: "100%",
            marginBottom: "10px",
            background: "grey",
            borderRadius: "18px"
        },
        img: {
            width: '100%',
            height: '300px',
            objectFit: 'cover'
        },
        title: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px"
        },
        logo: {
            width: "16%"
        },
        info: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px"
        },
        avatar: {
            borderRadius: "18px",
            height: '60px',
            objectFit: 'cover'
        },
        buyNow: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px"
        }
    }
    const getOwnerInfo = () => {
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'user/' + props.data.ownerAddr,
            { method: 'GET' }
        )
            .then(res => res.json())
            .then(res => {
                if(res.length > 0) {
                    setOwnerName(res[0].name)
                    setOwnerAvatar(res[0].avatar.data.data)
                }
            })
    }
    const getCurrencySymbol = () => {
        switch (props.data.curType) {
            case 0: setCurSymbol('BNB'); break;
            case 1: setCurSymbol('ODSY'); break;
        }
    }
    useEffect(() => {
        getOwnerInfo()
        getCurrencySymbol()
    }, [])
    return (
        <div style={styles.itemCover}>
            <div style={styles.itemImg}>
                <Link to={'/assets/' + props.data.nft_id}><img src={getImageData(props.data.img.data.data)} style={styles.img}/></Link>
            </div>
            <div style={styles.title}>
                <span>{props.data.title}</span>
                <img src={bscLogo} style={styles.logo} alt=""/>
            </div>
            <div style={styles.info}>
                {
                    ownerAvatar ?
                    <Link to={'/user/' + props.data.ownerAddr}><img src={getImageData(ownerAvatar)} style={styles.avatar}/></Link>
                    :
                    <Link to={'/user/' + props.data.ownerAddr}><img src={defaultImg} style={styles.avatar}/></Link>
                }
                <div style={styles.owned}>
                    <span style={{fontFamily: 'Urbanist', fontStyle: 'normal', fontWeight: '400',color: 'rgb(228, 223, 223)'}}>Owned By</span> <br/>
                    <Link to={'/user/' + props.data.ownerAddr}>
                        <span style={{fontFamily: 'Urbanist', fontStyle: 'normal', fontWeight: '800'}}>{onwerName}</span>
                    </Link>
                </div>
                <div style={styles.bid}>
                    <span style={{fontFamily: 'Urbanist', fontStyle: 'normal', fontWeight: '400',color: 'rgb(228, 223, 223)'}}>Current Bid</span> <br/>
                    <span style={{fontFamily: 'Urbanist', fontStyle: 'normal', fontWeight: '800'}}>{props.data.price} {curSymbol}</span>
                </div>
            </div>
            <div style={styles.buyNow}>
                <button className="normal">Buy Now</button>
                <div style={styles.favCnt}>
                    <FaIcons.FaRegHeart/> {props.data.followerCnt}
                </div>
            </div>
        </div>
    )
}

export default Item