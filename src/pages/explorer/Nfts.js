import Item from "./Item"

function Nfts() {
    const styles = {
        nftsCover: {
            display: "flex",
            flexWrap: "wrap"
        }
    }
    return(
        <div style={styles.nftsCover}>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
        </div>
    )
}

export default Nfts