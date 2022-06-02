import { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import Item from "./Item"

function Upcoming() {
	let carousel
    const [collects, setCollects] = useState(null)

	const goTo = (id) => {
		carousel.goTo(Number(id))
	}
	useEffect(() => {
		fetch(
			process.env.REACT_APP_API_BASE_URL + 'collects?newAndUpcoming=true',
			{
				method: 'GET'
			}
		)
			.then( res => res.json() )
			.then( res => {
				if(res.length > 0)
					setCollects(res)
			})
	}, [])
    return (
        <section className='upcoming'>
            <div className = "title">
				<h2>New & Upcoming</h2>
			</div>
            <Carousel 
				ref = { ref => (carousel = ref)}
				breakPoints = {[
					{ width: 1, itemsToShow: 1 },
					{ width: 850, itemsToShow: 2 },
					{ width: 1150, itemsToShow: 3, itemsToScroll: 2 },
				]}
				disableArrowsOnEnd = {false}
				onNextStart = { (curItem, nextItem) => {
					if(curItem.index == nextItem.index) {
						goTo(0)
					}
				}}
			>
                {
					collects && 
					collects.map((item, idx) => (
						<Item collects = {item} key={idx}/>
					))
				}
            </Carousel>
        </section>
    )
}

export default Upcoming