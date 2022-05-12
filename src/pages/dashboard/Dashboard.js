import { useState, useEffect, useContext } from 'react'

import {WalletContext} from '../../context/walletContext'
import {MessageContext} from '../../context/messageContext'
import MetamaskConnect from '../../actions/metamaskConnect'

import Filter from './Filter'
import Nfts from './Nfts'

function Dashboard() {
    const walContext = useContext(WalletContext)
    useEffect( async () => {
        if(walContext.wallet === null) {
            await MetamaskConnect()
        }
    }, [])
    const [data, setData] = useState(null)
    const [status, setStatus] = useState([])
    const [currency, setCurrency] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [collects, setCollects] = useState([])
    const [chains, setChains] = useState([])
    const getNftData = () => {
        let query = {}
        if(status.length > 0) 
            query['saleMethod'] = status;

        if(collects.length > 0) 
            query['collect'] = collects;

        if(minPrice !== null && maxPrice !== null){
            query['minPrice'] = minPrice
            query['maxPrice'] = maxPrice
        }

        if(currency != null)
            query['curType'] = currency

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
            .then(res => res.json())
            .then(res => setData(res))
    }
    useEffect(() => {
        getNftData()
    }, [status, collects, chains, currency, minPrice, maxPrice, chains])
    return (
        <div className='adminDashboard'>
            <Filter 
                setStatus={setStatus}
                setCollects={setCollects}
                setChains={setChains}
                setCurrency={setCurrency}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
            />
            <Nfts data={data} getNftData={getNftData}/>
        </div>
    )
}

export default Dashboard