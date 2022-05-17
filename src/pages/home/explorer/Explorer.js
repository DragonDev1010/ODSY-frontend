import * as FaIcons from "react-icons/fa"
import Item from "./Item"

function Explorer() {
    const styles = {
        viewMoreCover: {
            textAlign: "center",
            color:"#FFBD0C",
            marginTop: "30px"
        }
    }
    return(
        <section className='explorer'>
            <div className = "title">
				<h2>Explorer</h2>
				<button className='normal'>Blockchain</button>
                <button className='normal'>Categories</button>
                <button className='normal'>Rarity</button>
                <button className='normal'>Price Range</button>
                <button className='normal'>Search All</button>
                <button className='normal'>Filter & Sort</button>
			</div>
            <div className = "carouselCover">
				<button className = "main__nav main__nav--prev" data-nav="#explorer" type="button">
					<FaIcons.FaAngleLeft/>
				</button>

				<div className = "main__carousel main__carousel--explorer owl-carousel" id="explorer">
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
				</div>

				<button className = "main__nav main__nav--next" data-nav="#explorer" type="button">
					<FaIcons.FaAngleRight />
				</button>
			</div>
            <div style={styles.viewMoreCover}>
                <span>View More</span>
                <br/>
                <FaIcons.FaCaretDown/>
            </div>
        </section>
    )
}

export default Explorer