import { useEffect, useState } from "react"
import Filter from "../explorer/Filter"
import Nfts from "../explorer/Nfts"
import pageTitle from '../../assets/image/exclusivesPage/exclusivesLogo.png'

function Exclusives() {
    const [nfts, setNfts] = useState([])
    const [filter, setFilter] = useState({})
    const getNfts = (filter) => {
        try {
            let params = new URLSearchParams(filter)
            let fetchURL = process.env.REACT_APP_API_BASE_URL+'nfts?goldMember=true&' + params

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

    return(
        <div>
            <div style={{textAlign:'center', margin:'60px 0 110px'}}>
                <img src={pageTitle} style={{}}></img>
            </div>
            <Filter setFilter={setFilter}/>
            <Nfts nfts={nfts}/>
        </div>
    )
}

export default Exclusives