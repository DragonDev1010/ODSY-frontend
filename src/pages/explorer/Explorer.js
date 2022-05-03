import { useEffect, useState } from "react"
import Filter from "./Filter"
import Nfts from "./Nfts"

function Explorer() {
    const [nfts, setNfts] = useState([])

    // `filter` : `Object` type
    // filter : {"chain":0, "category":0, "rarity":0, "currency":0, "price":0, "sort":0}
    const getNfts = (filter) => {
        // http://localhost:3000/explorer?chain=0&category=0&rarity=0&currency=0&price=0&sort=0
        // {chain, category, rarity, currency, price, sort}
        try {
            let params = new URLSearchParams(filter)
            let fetchURL = process.env.REACT_APP_API_BASE_URL+'nfts?' + params

            fetch(fetchURL)
                .then(res => res.json())
                .then(res => setNfts([...res]))
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        let filter = {"chain":0, "category":0, "rarity":0, "currency":0, "price":0, "sort":0}
        getNfts(filter)
    }, [])
    return(
        <div>
            <h1 style={{textAlign: 'center', marginBottom: '100px', marginTop:"100px"}}>Explorer</h1>
            <Filter/>
            <Nfts nfts={nfts}/>
        </div>
    )
}

export default Explorer