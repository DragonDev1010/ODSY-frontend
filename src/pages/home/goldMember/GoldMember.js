import Item from "./Item"

function GoldMember() {
    const styles = {
        sectionCover : {
            display: "flex"
        }
    }

    return(
        <section style={styles.sectionCover}>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
        </section>
    )
}

export default GoldMember