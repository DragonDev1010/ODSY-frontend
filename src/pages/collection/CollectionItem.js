import { useEffect, useState } from "react"
import getImageData from "../../getImageData"

function CollectionItem(props) {
    const [collectionLogo, setCollectionLogo] = useState(null)
    
    const styles = {
        itemCover: {
            display: 'flex',
            alignItems: 'center',
            padding: '10px 0',
            borderBottom: '1px solid white'
        },
        itemId : {
            width: '10%',
            paddingLeft: '5px'
        },                            
        itemLogo : {
            width: '20%'
        },                            
        itemName : {
            width: '40%'
        },                        
        itemVolume : {
            width: '10%'
        },                        
        itemAvrPrice : {
            width: '10%'
        },
        logoImg: {
            width: '70px',
            height: '70px',
            borderRadius: '50%'
        }
    }

    useEffect(() => {
        let img = getImageData(props.item.logoImg.data.data)
        setCollectionLogo(img)
    })
    return (
        <div style={styles.itemCover}>
            <div style={styles.itemId}>{props.idx}</div>
            <div style={styles.itemLogo}><img src={collectionLogo} style={styles.logoImg}/></div>
            <div style={styles.itemName}>{props.item.name}</div>
            <div style={styles.itemVolume}>{"44.8M"}</div>
            <div style={styles.itemAvrPrice}>{"5.8K"}</div>
            <div><button className="normal">View</button></div>
        </div>
    )
}

export default CollectionItem