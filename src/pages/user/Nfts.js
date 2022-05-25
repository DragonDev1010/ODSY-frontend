import Item from "./Item"

function Nfts(props) {
    const styles = {
        nftsCover: {
            display: "flex",
            flexWrap: "wrap"
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