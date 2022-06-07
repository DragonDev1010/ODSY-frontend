import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
			.then( res => {
				if(res.length > 0)
					setData(res)
			})
	}, [])
    return (
        <section className = "topCollections">
			<div className = "title">
				<h2>Top Collections</h2>
				<button className='sectionNormalBtn'><Link to={'/collections'}>See All</Link></button>
			</div>
			<Carousel
				ref = { ref => (carousel = ref)}
				disableArrowsOnEnd = {false}
				onNextStart = { (curItem, nextItem) => {
					if(curItem.index == nextItem.index) {
						goTo(0)
					}
				}}
				breakPoints = {[
					{ width: 1, itemsToShow: 1 },
					{ width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
					{ width: 850, itemsToShow: 3 },
					{ width: 1150, itemsToShow: 4, itemsToScroll: 2 },
					{ width: 1450, itemsToShow: 5 },
					{ width: 1750, itemsToShow: 6 },
				]}
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