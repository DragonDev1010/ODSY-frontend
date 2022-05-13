import { useEffect, useState } from "react"
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
			.then( res => setData(res) )
	}, [])
    return(
        <section>
            <div className = "title">
				<h2>Live Auctions</h2>
				<button className='normal'>See All</button>
			</div>
            <div className = "main__carousel-wrap">
				<Carousel 
					ref = { ref => (carousel = ref)}
					itemsToShow={4}
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