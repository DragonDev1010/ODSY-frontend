import { useState, useEffect } from "react"

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
                offers.map((offer) => {
                    return (
                        <>
                            <p>{offer.offerCreator}</p>
                            <p>{offer.offerPrice}</p>
                        </>
                    )
                })
            }
        </>
    )
}

export default OfferList