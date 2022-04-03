import Item from "./Item"

function Upcoming() {
    const styles = {
        sectionCover: {
            display: "flex"
        }
    }

    return (
        <section>
            <div className = "title">
				<h2>New & Upcoming</h2>
			</div>
            <div style={styles.sectionCover}>
                <Item/>
                <Item/>
                <Item/>
                <Item/>
            </div>
        </section>
    )
}

export default Upcoming