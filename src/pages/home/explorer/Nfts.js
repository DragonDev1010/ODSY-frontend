import Item from "./Item"

function Nfts(props) {
    const styles = {
        nftsCover: {
            display: "flex",
            flexWrap: "wrap",
            margin: '140px 130px 0 180px'
        },
        mobileNftsCover: {
            display: "flex",
            flexWrap: "wrap",
            margin: '10px'
        }
    }
    return(
        <>
            <div className="desktop">
                <div style={styles.nftsCover}>
                    {
                        props.nfts && 
                        props.nfts.map(nft => <Item nft={nft}/>)
                    }
                </div>
            </div>
            <div className="mobile">
                <div style={styles.mobileNftsCover}>
                    {
                        props.nfts && 
                        props.nfts.map(nft => <Item nft={nft}/>)
                    }
                </div>
            </div>
        </>
    )
}

export default Nfts