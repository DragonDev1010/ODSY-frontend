import { useEffect, useState } from "react"
import Carousel from 'react-elastic-carousel'
import Item from "./Item"

function TopSellers() {
    let carousel
	const [data, setData] = useState(null)
	const [itemsToShow, setItemsToShow] = useState(1)
	const goTo = (id) => {
		carousel.goTo(Number(id))
	}
	
    useEffect(() => {
		fetch(
			process.env.REACT_APP_API_BASE_URL + 'users?topSeller=true',
			{method: 'GET'}
		)
			.then( res => res.json() )
			.then( res => {
				if(res.length > 0)
					setData(res)
			})
	}, [])

    return (
        <section className="topSellers">
            <div className = "title">
				<h2>Top Sellers</h2>
				<button className='normal'>See All</button>
			</div>
			{
				data && data.length > 0 && data.length < 5 ?
					data.map((item) => (<Item data={item}/>))
				:
				<Carousel 
					ref = { ref => (carousel = ref)}
					breakPoints = {[
						{ width: 1, itemsToShow: 1 },
						{ width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
						{ width: 850, itemsToShow: 3 },
						{ width: 1450, itemsToShow: 5 },
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
			}
        </section>
    )
}

export default TopSellers