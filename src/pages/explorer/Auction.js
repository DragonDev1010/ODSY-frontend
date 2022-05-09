import { useEffect, useState } from "react"
import Filter from "./Filter"
import Nfts from "./Nfts"
import pageTitle from '../../assets/image/auctionPage/auctionsLogo.png'

function Auctions() {
    const [nfts, setNfts] = useState([])
    const [filter, setFilter] = useState({})
    const [chain, setChain] = useState(null)
    // `filter` : `Object` type
    // filter : {"chain":0, "category":0, "rarity":0, "currency":0, "price":0, "sort":0}
    const getNfts = (filter) => {
        // http://localhost:3000/explorer?chain=0&category=0&rarity=0&currency=0&price=0&sort=0
        // {chain, category, rarity, currency, price, sort}
        try {
            let params = new URLSearchParams(filter)
            let fetchURL = process.env.REACT_APP_API_BASE_URL+'nfts?saleMethod=1&' + params

            fetch(fetchURL)
                .then(res => res.json())
                .then(res => setNfts([...res]))
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getNfts(filter)
    }, [])

    useEffect(() => { 
        if(chain !== null) {
            filter['chainId'] = chain;
            getNfts(filter) 
        }
    }, [chain])
    return(
        <div>
            <div style={{textAlign:'center', margin:'60px 0 110px'}}>
                <img src={pageTitle} style={{}}></img>
            </div>
            <Filter chain={setChain}/>
            <Nfts nfts={nfts}/>
        </div>
    )
}

export default Auctions