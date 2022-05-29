import { useState, useEffect } from "react"
import OfferItem from './OfferItem'

function OfferList(props) {
    const [offers, setOffers] = useState(null)
    const tokenId = props.tokenId
    useEffect(() => {
        fetch( process.env.REACT_APP_API_BASE_URL + 'offers/' + tokenId )
            .then(res => res.json())
            .then( data => {
                if(data.length > 0)
                    setOffers(data)
            })
    }, [])
    return (
        <div style={{overflowY:'auto', height:'200px', padding:'10px'}}>
            {
                offers !== null ?
                offers.map((offer) => {
                    return (
                        <OfferItem offer={offer}/>
                    )
                })
                :
                ""
            }
        </div>
    )
}

export default OfferList