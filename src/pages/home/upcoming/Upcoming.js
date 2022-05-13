import { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import Item from "./Item"

function Upcoming() {
    const [collects, setCollects] = useState(null)

	useEffect(() => {
		fetch(
			process.env.REACT_APP_API_BASE_URL + 'collects?newAndUpcoming=true',
			{
				method: 'GET'
			}
		)
			.then( res => res.json() )
			.then( res => setCollects(res) )
	}, [])
    return (
        <section>
            <div className = "title">
				<h2>New & Upcoming</h2>
			</div>
            <Carousel itemsToShow={5}>
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