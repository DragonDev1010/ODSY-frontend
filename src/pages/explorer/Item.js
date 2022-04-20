import * as FaIcons from 'react-icons/fa'
import img from "../../assets/image/navbar/logo.png"

function Item() {
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
        colLogo: {
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
    return(
        <div style={styles.cover}>
            <img src={img} style={styles.img}/>
            <div style={styles.colCover}>
                <span>"The RenaiXance Rising...</span>
                <img src={img} style={styles.colLogo}></img>
            </div>
            <div style={styles.ownerCover}>
                <img src={img} style={styles.ownerAvatar}></img>
                <div style={styles.owner}>
                    <p>Owned By</p>
                    <p>David</p>
                </div>
                <div style={styles.bidPrice}>
                    <p>Current Bid:</p>
                    <p>4.89 BNB</p>
                </div>
            </div>
            <div style={styles.buyCover}>
                <button className="smNormal">Buy Now</button>
                <button className="favBtn"><FaIcons.FaRegHeart/> 100</button>
            </div>
        </div>
    )
}

export default Item