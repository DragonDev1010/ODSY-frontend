import { useEffect, useState } from "react"
import Carousel from 'react-elastic-carousel'
import Item from "./Item"

function LiveAuction() {
	const [data, setData] = useState(null)
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
				<Carousel itemsToShow={4}>
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