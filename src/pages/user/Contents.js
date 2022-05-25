import { useState, useEffect } from "react"
import Filter from "../explorer/Filter"
import Nfts from "./Nfts"

function Contents() {
    const [nfts, setNfts] = useState([])
    const [filter, setFilter] = useState({})
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
        getNfts(filter)
    }, [filter])
    return (
        <div className="contentsCover">
            <div className="contentsHeader">
                <button>On Sale</button>
                <button>Owned</button>
                <button>Created</button>
                <button>Collections</button>
                <button>Activity</button>
            </div>
            <div className="contents">
                <Filter setFilter={setFilter}/>
                <Nfts nfts={nfts}/>
            </div>
        </div>
    )
}

export default Contents