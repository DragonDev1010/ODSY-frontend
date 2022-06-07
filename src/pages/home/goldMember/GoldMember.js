import { useEffect, useState } from "react"
import Carousel from 'react-elastic-carousel'
import Item from "./Item"

function GoldMember() {
    const [nfts, setNfts] = useState(null)
    let carousel
    const goTo = (id) => {
		carousel.goTo(Number(id))
	}
    useEffect(() => {
        let query = {}
        query['goldMember'] = true

        fetch(
            process.env.REACT_APP_API_BASE_URL + 'nfts?goldMember=true',
            { method: 'GET' }
        )
            .then(res => res.json())
            .then(res => {
                if(res.length > 0)
                    setNfts(res)
            })
    }, [])
    return(
        <section className="goldMember">
            <div className = "title">
				<h2>Gold Member Exclusives</h2>
				<button className='sectionNormalBtn'>See All</button>
			</div>
            <div className = "carouselCover">
                <Carousel
                    ref = { ref => (carousel = ref)}
                    breakPoints = {[
                        {width: 1, itemsToShow: 1},
                        {width: 768, itemsToShow: 2},
                        {width: 1159, itemsToShow: 3}
                    ]}
                    disableArrowsOnEnd = {false}
                    onNextStart = { (curItem, nextItem) => {
                        if(curItem.index == nextItem.index) {
                            goTo(0)
                        }
                    }}
                >
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