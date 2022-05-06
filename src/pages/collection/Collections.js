import { useEffect, useState } from "react"
import CollectionItem from "./CollectionItem"
import pageTitle from '../../assets/image/topCollectionPage/topCollectionLogo.png'

function Collections() {
    const [collectionList, setCollectionList] = useState(null)
    
    const styles = {
        cover: {
            margin: '100px'
        },
        title: {
            textAlign: 'center',
            margin: '60px 0 110px'
        },
        collectionTableCover: {
            fontSize: '30px'
        },
        collectionTableHeader: {
            marginBottom: '40px',
            display: 'flex'
        },
        headerId: {
            width: '10%',
            paddingLeft: '5px'
        },
        headerName: {
            width: '60%'
        },
        headerVolume: {
            width: '10%'
        },
        headerAverage: {
            width: '20%'
        }
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'collects')
            .then(res => res.json())
            .then(data => {
                setCollectionList(data)
            })
    }, [])
    return(
        <div style={styles.cover}>
            <div style={styles.title}>
                <img src={pageTitle}></img>
            </div>
            <div style={styles.collectionTableCover}>
                <div style={styles.collectionTableHeader}>
                    <div style={styles.headerId}>#</div>
                    <div style={styles.headerName}>Collection</div>
                    <div style={styles.headerVolume}>Volume</div>
                    <div style={styles.headerAverage}>Average</div>
                </div>
                <div style={styles.collectionTableData}>
                {
                    collectionList !== null ?
                        collectionList.map((item, idx) => {
                            return (<CollectionItem item = {item} idx = {idx}/>)
                        })
                    :
                    ""
                }
                </div>
            </div>
        </div>
    )
}

export default Collections