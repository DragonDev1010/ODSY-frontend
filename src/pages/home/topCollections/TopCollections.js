import { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import Collection from './Collection'

function TopCollections() {
	const [data, setData] = useState(null)
	let carousel
	const goTo = (id) => {
		carousel.goTo(Number(id))
	}

	useEffect(() => {
		fetch(
			process.env.REACT_APP_API_BASE_URL + 'collects/',
			{
				method: 'GET'
			}
		)
			.then( res => res.json() )
			.then( res => setData(res) )
	}, [])
    return (
        <section className = "topCollections">
			<div className = "title">
				<h2>Top Collections</h2>
				<button className='normal'>See All</button>
			</div>
			<Carousel
				ref = { ref => (carousel = ref)}
				itemsToShow={5}
				disableArrowsOnEnd = {false}
				onNextStart = { (curItem, nextItem) => {
					if(curItem.index == nextItem.index) {
						goTo(0)
					}
				}}
			>
				{
					data && 
					data.map((item, idx) => (
						<Collection data = {item} key={idx}/>
					))
				}
			</Carousel>
		</section>
    )
}

export default TopCollections