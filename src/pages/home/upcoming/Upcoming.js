import Item from "./Item"

function Upcoming() {
    const styles = {
        sectionCover: {
            display: "flex"
        }
    }

    return (
        <section className="upcoming" style={styles.sectionCover}>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
        </section>
    )
}

export default Upcoming