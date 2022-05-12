import { useEffect, useState } from "react"
import Carousel from 'react-elastic-carousel'
import * as FaIcons from "react-icons/fa"
import Item from "./Item"

function GoldMember() {
    const [nfts, setNfts] = useState(null)
    const styles = {
        sectionCover : {
            display: "flex"
        }
    }
    useEffect(() => {
        let query = {}
        query['goldMember'] = true

        fetch(
            process.env.REACT_APP_API_BASE_URL + 'nfts?goldMember=true',
            { method: 'GET' }
        )
            .then(res => res.json())
            .then(res => setNfts(res))
    }, [])
    return(
        <section>
            <div className = "title">
				<h2>Gold Member Exclusives</h2>
				<button className='normal'>See All</button>
			</div>
            <div className = "main__carousel-wrap">
                <Carousel itemsToShow={4}>
                    {
                        nfts && 
                        nfts.map((item, idx) => (
                            <Item data = {item} key={idx}/>
                        ))
                    }
                </Carousel>
			</div>
        </section>
    )
}

export default GoldMember