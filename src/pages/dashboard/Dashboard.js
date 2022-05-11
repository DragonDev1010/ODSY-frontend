import { useState, useEffect, useContext } from 'react'

import {WalletContext} from '../../context/walletContext'
import {MessageContext} from '../../context/messageContext'
import MetamaskConnect from '../../actions/metamaskConnect'

import Filter from './Filter'

function Dashboard() {
    const walContext = useContext(WalletContext)
    useEffect( async () => {
        if(walContext.wallet === null) {
            await MetamaskConnect()
        }
    }, [])

    const [status, setStatus] = useState([])
    const [currency, setCurrency] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [collects, setCollects] = useState([])
    const [chains, setChains] = useState([])
    useEffect(() => {
        let query = {}
        if(status.length > 0) 
            query['saleMethod'] = status;

        if(collects.length > 0) 
            query['collect'] = collects;

        if(minPrice !== null && maxPrice !== null){
            query['minPrice'] = minPrice
            query['maxPrice'] = maxPrice
        }

        if(chains.length > 0)
            query['chainId'] = chains
        
        let params = new URLSearchParams(query)
        console.log(params)
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'nfts?' + params,
            {
                method: 'GET',
                data: query
            }
        )
    }, [status, collects, chains])
    return (
        <>
            <Filter 
                setStatus={setStatus}
                setCollects={setCollects}
                setChains={setChains}
            />
        </>
    )
}

export default Dashboard