import * as FaIcons from "react-icons/fa"
import img from "../../../assets/image/navbar/logo.png"
import bscLogo from "../../../assets/image/landingPage/bscLogo.png"
function Item() {
    const styles = {
        itemCover: {
            width: "25%"
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
        }
    }
    return(
        <div style={styles.itemCover}>
            <div style={styles.images}>
                <div style={styles.imgCover}>
                    <img src={img} style={styles.imageItem} alt=""/>
                </div>
                <div style={styles.imgCover}>
                    <img src={img} style={styles.imageItem} alt=""/>
                </div>
                <div style={styles.imgCover}>
                    <img src={img} style={styles.imageItem} alt=""/>
                </div>
                <div style={styles.imgCover}>
                    <img src={img} style={styles.imageItem} alt=""/>
                </div>
            </div>
            <div style={styles.info}>
                <span>"The RenaiXance Rising...</span>
                <img src={bscLogo} style={styles.logo} alt=""/>
            </div>
            <div style={styles.favCnt}>
                <FaIcons.FaRegHeart/> 100
            </div>
        </div>
    )
}

export default Item