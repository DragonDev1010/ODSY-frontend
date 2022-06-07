import Item from "./Item"

function Nfts(props) {
    const styles = {
        mobileNftsCover: {
            display: "flex",
            flexWrap: "wrap",
            margin: '10px'
        }
    }
    return(
        <>
            <div className="desktop">
                <div className='nftsCover'>
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