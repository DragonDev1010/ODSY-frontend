import { useState, useEffect, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import {WalletContext} from '../../context/walletContext'
import {MessageContext} from '../../context/messageContext'
import MetamaskConnect from '../../actions/metamaskConnect'

import Filter from './Filter'
import Nfts from './Nfts'
import CollectList from './CollectList'

function Dashboard() {
    let navigate = useNavigate();
    const walContext = useContext(WalletContext)
    
    const [data, setData] = useState(null)
    const [status, setStatus] = useState([])
    const [currency, setCurrency] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [collects, setCollects] = useState([])
    const [chains, setChains] = useState([])
    const [panelSwitcher, setPanelSwitcher] = useState(true)
    const [admins, setAdmins] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)

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
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'nfts?' + params,
            {
                method: 'GET'
            }
        )
            .then(res => res.json())
            .then(res => {
                if(data.length > 0)
                    setData(res)
            })
    }

    useEffect( async () => {
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'users?admin=true',
            {method:'GET'}
        )
            .then(res => res.json())
            .then(res => {
                if(res.length > 0) {
                    let temp = []
                    res.map(item => {
                        temp.push(item.wallet.toLowerCase())
                    })
                    setAdmins(temp)
                }
            })
        if(walContext.wallet === null) {
            await MetamaskConnect()
        }
    }, [])
    
    useEffect(() => {
        getNftData()
    }, [status, collects, chains, currency, minPrice, maxPrice, chains])

    useEffect(() => {
        if(walContext.wallet !== null && admins !== null) {
            if(admins.includes(walContext.wallet.toLowerCase()))
                setIsAdmin(true)
            else {
                setIsAdmin(false)
                console.log('redirect')
                return navigate("/");
            }
        }
    }, [admins, walContext])
    return (
        <>
        {
            isAdmin ?
            <>
                <div style={{paddingLeft: '50px'}}>
                    <button className='normal' onClick={() => setPanelSwitcher(!panelSwitcher)}>
                        {panelSwitcher ? "Show Collect List" : "Show NFT List"}
                    </button>
                </div>
                <div className='adminDashboard'>
                    {
                        panelSwitcher ?
                        <>
                            <Filter 
                                setStatus={setStatus}
                                setCollects={setCollects}
                                setChains={setChains}
                                setCurrency={setCurrency}
                                setMinPrice={setMinPrice}
                                setMaxPrice={setMaxPrice}
                                />
                            <Nfts data={data} getNftData={getNftData}/>
                        </>
                        :
                        <>
                            <CollectList/>
                        </>
                    }
                </div>
            </>
            :
            ""
        }
            
        </>
    )
}

export default Dashboard