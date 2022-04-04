import * as FaIcons from "react-icons/fa"
import Item from "./Item"

function LiveAuction() {
    return(
        <section>
            <div className = "title">
				<h2>Live Auctions</h2>
				<button className='normal'>See All</button>
			</div>
            <div className = "main__carousel-wrap">
				<button className = "main__nav main__nav--prev" data-nav="#liveAuction" type="button">
					<FaIcons.FaAngleLeft/>
				</button>

				<div className = "main__carousel main__carousel--liveAuction owl-carousel" id="liveAuction">
					<Item/>
                    <Item/>
                    <Item/>
                    <Item/>
				</div>

				<button className = "main__nav main__nav--next" data-nav="#liveAuction" type="button">
					<FaIcons.FaAngleRight />
				</button>
			</div>
        </section>
    )
}

export default LiveAuction