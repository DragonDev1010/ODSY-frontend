import Item from "./Item"

function Nfts(props) {
    const styles = {
        nftsCover: {
            display: "flex",
            flexWrap: "wrap",
            margin: '140px 130px 0 180px'
        }
    }
    return(
        <div style={styles.nftsCover}>
            {
                props.nfts && 
                props.nfts.map(nft => <Item nft={nft}/>)
            }
        </div>
    )
}

export default Nfts