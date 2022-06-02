import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Carousel from 'react-elastic-carousel'
import Item from "./Item"

function LiveAuction() {
	let carousel
	const [data, setData] = useState(null)
	const goTo = (id) => {
		carousel.goTo(Number(id))
	}
	useEffect(() => {
		fetch(
			process.env.REACT_APP_API_BASE_URL + 'nfts?saleMethod=1',
			{method: 'GET'}
		)
			.then( res => res.json() )
			.then( res => {
				if(res.length > 0)
					setData(res)
			})
	}, [])
    return(
        <section className="liveAuction">
            <div className = "title">
				<h2>Live Auctions</h2>
				<button className='normal'><Link to={'/auctions'}>See All</Link></button>
			</div>
            <div className = "carouselCover">
				<Carousel 
					ref = { ref => (carousel = ref)}
					breakPoints = {[
                        {width: 1, itemsToShow: 1},
                        {width: 768, itemsToShow: 2},
                        {width: 1159, itemsToShow: 4}
                    ]}
					disableArrowsOnEnd = {false}
					onNextStart = { (curItem, nextItem) => {
						if(curItem.index == nextItem.index) {
							goTo(0)
						}
					}}
				>
					{
						data &&
						data.map((item) => (<Item data = {item}/>))
					}
				</Carousel>
			</div>
        </section>
    )
}

export default LiveAuction