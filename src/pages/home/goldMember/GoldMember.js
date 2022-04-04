import * as FaIcons from "react-icons/fa"
import Item from "./Item"

function GoldMember() {
    const styles = {
        sectionCover : {
            display: "flex"
        }
    }

    return(
        <section>
            <div className = "title">
				<h2>Gold Member Exclusives</h2>
				<button className='normal'>See All</button>
			</div>
            <div className = "main__carousel-wrap">
				<button className = "main__nav main__nav--prev" data-nav="#goldMember" type="button">
					<FaIcons.FaAngleLeft/>
				</button>

				<div className = "main__carousel main__carousel--goldMember owl-carousel" id="goldMember">
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
				</div>

				<button className = "main__nav main__nav--next" data-nav="#goldMember" type="button">
					<FaIcons.FaAngleRight />
				</button>
			</div>
        </section>
    )
}

export default GoldMember