import * as FaIcons from "react-icons/fa"
import bscLogo from "../../../assets/image/landingPage/bscLogo.png"
import getImageData from '../../../actions/getImageData'
import { useEffect, useState } from "react"

function Item(props) {
    const [onwerName, setOwnerName] = useState(null)
    const [ownerAvatar, setOwnerAvatar] = useState(null)
    const [curSymbol, setCurSymbol] = useState(null)

    const styles = {
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
            background: "grey",
            borderRadius: "18px",
            width: "16%",
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
                setOwnerName(res[0].name)
                setOwnerAvatar(res[0].avatar.data.data)
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
                <img src={getImageData(props.data.img.data.data)} style={styles.img}/>
            </div>
            <div style={styles.title}>
                <span>{props.data.title}</span>
                <img src={bscLogo} style={styles.logo} alt=""/>
            </div>
            <div style={styles.info}>
                <img src={getImageData(ownerAvatar)} style={styles.avatar} alt="s"/>
                <div style={styles.owned}>
                    <span style={{fontFamily: 'Urbanist', fontStyle: 'normal', fontWeight: '400',color: 'rgb(228, 223, 223)'}}>Owned By</span> <br/>
                    <span style={{fontFamily: 'Urbanist', fontStyle: 'normal', fontWeight: '800'}}>{onwerName}</span>
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