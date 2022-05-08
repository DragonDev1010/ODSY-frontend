import { useState, useEffect } from "react"
import OfferItem from './OfferItem'

function OfferList(props) {
    const [offers, setOffers] = useState(null)
    const tokenId = props.tokenId
    useEffect(() => {
        fetch( process.env.REACT_APP_API_BASE_URL + 'offers/' + tokenId )
            .then(res => res.json())
            .then( data => {
                setOffers(data)
            })
    }, [])
    return (
        <>
        this is offer list
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
        </>
    )
}

export default OfferList