import { Link } from 'react-router-dom'
import getImageData from '../../../actions/getImageData'
import bscLogo from "../../../assets/image/landingPage/bscLogo.png"
import { useEffect, useState } from "react"
function Item(props) {
    const [nfts, setNfts] = useState(null)
    const styles = {
        itemCover: {
            width: "75%"
        },
        images: {
            display: "flex",
            flexWrap: "wrap"
        },
        imgCover: {
            width: "50%",
            padding: "10px"
        },
        imageItem: {
            width: "100%",
            height: '150px',
            objectFit: 'cover',
            background: "grey",
            borderRadius: "20px",
        },
        info: {
            display: "flex",
            justifyContent: "space-between",
            color:"white"
        },
        favCnt: {
            background: "#14141F",
            padding: "10px 20px",
            borderRadius: "18px",
            float: "right",
            color:"white"
        },
        collectName: {
            marginLeft: '30px',
            fontSize: '30px',
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '800'
        }
    }
    useEffect(() => {
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'nfts?collect=' + props.collects.id,
            {method: 'GET'}
        )
            .then(res => res.json())
            .then(res => {
                if(res.length > 0) {
                    let i = 0
                    let temp = []
                    while (i < 4) {
                        temp.push(res[(i%res.length)])
                        i++
                    }
                    setNfts(temp)
                }
            })
    }, [])
    return(
        <div style={styles.itemCover}>
            <div style={styles.images}>
                {
                    nfts &&
                    nfts.map((item) => (
                        <div style={styles.imgCover}>
                            <Link to={'/assets/' + item.nft_id}><img src={getImageData(item.img.data.data)} style={styles.imageItem} alt=""/></Link>
                        </div>        
                    ))
                }
            </div>
            <div style={styles.info}>
                <Link to={'/collection/' + props.collects.id}><span style={styles.collectName}>{props.collects.name}</span></Link>
                <img src={bscLogo} style={styles.logo} alt=""/>
            </div>
        </div>
    )
}

export default Item