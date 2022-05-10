import { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import Collection from './Collection'

function TopCollections() {
	const [data, setData] = useState(null)

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
			<Carousel itemsToShow={5}>
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