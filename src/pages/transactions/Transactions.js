import { useEffect, useState } from "react"
import Item from "./Item"
// import listingLogo from '../../assets/activitiesPage/listing.png'
import listingLogo from '../../assets/image/activitiesPage/listing.png'
import likeLogo from '../../assets/image/activitiesPage/like.png'
import purchaseLogo from '../../assets/image/activitiesPage/purchase.svg'
import saleLogo from '../../assets/image/activitiesPage/sales.png'
import transferLogo from '../../assets/image/activitiesPage/transfer.svg'
import bidsLogo from '../../assets/image/activitiesPage/bids.png'
import followingsLogo from '../../assets/image/activitiesPage/followings.png'
function Transactions() {
    const [activites, setActivities] = useState(null)
    const getNftTitle = (nftId) => {
        
    }
    useEffect(() => {
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'activities'
        )
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setActivities(data)
                }
            })
    }, [])
    return(
        <section className="transactions">
            <div className="filtercover">
                <p>Filter</p>
                <button className="normal"><img src = {listingLogo}/>Listings</button>
                <button className="normal"><img src = {likeLogo}/>Like</button>
                <button className="normal"><img src = {purchaseLogo}/>Purchases</button>
                <button className="normal"><img src = {saleLogo}/>Sales</button>
                <button className="normal"><img src = {transferLogo}/>Transfer</button>
                <button className="normal"><img src = {bidsLogo}/>Bids</button>
                <button className="normal"><img src = {followingsLogo}/>Followings</button>
            </div>
            <button className="clearBtn">Clear All Filters</button>
            <div className="listCover">
                {
                    activites && activites.length > 0 &&
                    activites.map((data, idx) => <Item data={data} key={idx}/>)
                }
            </div>
        </section>
    )
}

export default Transactions