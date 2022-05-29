import { useEffect, useState } from "react"
import * as FaIcons from 'react-icons/fa'
function Filter(props) {
    const [status, setStatus] = useState([])
    const [currency, setCurrency] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [collects, setCollects] = useState([])
    const [chains, setChains] = useState([])
    const [collectList, setCollectList] = useState(null)
    const [curName, setCurName] = useState('Currency')
    const [showStatus, setShowStatus] = useState(false)
    const [showCurrency, setShowCurrency] = useState(false)
    const [showCollects, setShowCollects] = useState(false)
    const [showChains, setShowChains] = useState(false)

    const handleStatus = (e) => {
        let temp = [...status]
        if (status.includes(+e.target.value)) {
            temp.splice(status.indexOf(+e.target.value), 1)
        } else {
            temp.push(+e.target.value)
        }
        setStatus(temp)
        props.setStatus(temp)
    }

    const applyPriceRange = () => {
        setCurrency(currency)
        setMinPrice(minPrice)
        setMaxPrice(maxPrice)
        props.setCurrency(currency)
        props.setMinPrice(minPrice)
        props.setMaxPrice(maxPrice)
    }

    const handleCollect = (e) => {
        let temp = [...collects]
        if (collects.includes(+e.target.value)) {
            temp.splice(collects.indexOf(+e.target.value), 1)
        } else {
            temp.push(+e.target.value)
        }
        setCollects(temp)
        props.setCollects(temp)
    }

    const handleChain = (e) => {
        let temp = [...chains]
        if (chains.includes(+e.target.value)) {
            temp.splice(chains.indexOf(+e.target.value), 1)
        } else {
            temp.push(+e.target.value)
        }
        setChains(temp)
        props.setChains(temp)
    }

    useEffect(() => {
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'collects',
            {method: 'GET'}
        )
            .then(res => res.json())
            .then(res => {
                if(res.length > 0)
                    setCollectList(res)
            })
    }, [])

    useEffect(() => {
        switch (currency) {
            case 0: setCurName('ODSY'); break;
            case 1: setCurName('BNB'); break;
            case 2: setCurName('ETH'); break;
            default: setCurName('Currency'); break;
        }
    }, [currency])
    
    return (
        <div className = 'filterCover'>
            <div className = 'statusCover'>
                <div className="heading">
                    <button onClick={e => setShowStatus(!showStatus)}>Status</button>
                </div>
                {
                    showStatus && 
                    <>
                        <div className="statusRow">
                            <button value = {0} onClick={e => handleStatus(e, 'value')} className={status.includes(0) ? 'selectedStatusBtn' : 'notSelectedStatusBtn'}>Buy Now</button>
                            <button value = {1} onClick={e => handleStatus(e, 'value')} className={status.includes(1) ? 'selectedStatusBtn' : 'notSelectedStatusBtn'}>On Auction</button>
                        </div>
                        <div className="statusRow">
                            <button value = {2} onClick={e => handleStatus(e, 'value')} className={status.includes(2) ? 'selectedStatusBtn' : 'notSelectedStatusBtn'}>New</button>
                            <button value = {3} onClick={e => handleStatus(e, 'value')} className={status.includes(3) ? 'selectedStatusBtn' : 'notSelectedStatusBtn'}>Has Offers</button>
                        </div>
                    </>
                }
            </div>
            <div className = 'priceCover'>
                <div className="heading">
                    <button onClick={e => setShowCurrency(!showCurrency)}>{curName}</button>
                </div>
                {
                    showCurrency && 
                    <div className = 'curDropDown'>
                        <div><button value={0} onClick={e=>{setCurrency(+e.target.value); setShowCurrency(false)}} className='curBtn'>ODSY</button></div>
                        <div><button value={1} onClick={e=>{setCurrency(+e.target.value); setShowCurrency(false)}} className='curBtn'>BNB</button></div>
                        <div><button value={2} onClick={e=>{setCurrency(+e.target.value); setShowCurrency(false)}} className='curBtn'>ETH</button></div>
                        <div><button onClick={e => {setCurrency(null); setShowCurrency(false)}} className='curBtn'>Clear</button></div>
                    </div>
                }
                <div className="priceInputCover">
                    <input type='number' placeholder="Min" onChange={e => setMinPrice(+e.target.value)}/>
                    <span>To</span>
                    <input type='number' placeholder="Max" onChange={e => setMaxPrice(+e.target.value)}/>
                </div>
                <div className="priceButton">
                    <button onClick={applyPriceRange}>apply</button>
                </div>
            </div>
            <div className = 'collectCover'>
                <div className="collectHead">
                    <button onClick={e => setShowCollects(!showCollects)}>Collections</button>
                </div>
                <ul>
                    {
                        showCollects && collectList &&
                        collectList.map((item, idx) => 
                            <li value={idx} onClick={e=>handleCollect(e, 'value')} className='collectItem'>
                                {item.name} 
                                <FaIcons.FaCheckCircle visibility={collects.includes(idx) ? "" : "hidden"} style={{marginLeft: '5px'}}/>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className = 'chainsCover'>
                <div className="chainsHead">
                    <button onClick={e => setShowChains(!showChains)}>Chains</button>
                </div>
                {
                    showChains && 
                    <div className="chainsBtnCover">
                        <div className="chainsBtnRow">
                            <button value={0} onClick={e=>handleChain(e, 'value')} className={chains.includes(0) ? 'selectedChainBtn' : 'nonSelectedChainsBtn'}>BSC</button>
                            <button value={1} onClick={e=>handleChain(e, 'value')} className={chains.includes(1) ? 'selectedChainBtn' : 'nonSelectedChainsBtn'}>Ethereum</button>
                        </div>
                        <div className="chainsBtnRow">
                            <button value={2} onClick={e=>handleChain(e, 'value')} className={chains.includes(2) ? 'selectedChainBtn' : 'nonSelectedChainsBtn'}>Polygon</button>
                            <button value={3} onClick={e=>handleChain(e, 'value')} className={chains.includes(3) ? 'selectedChainBtn' : 'nonSelectedChainsBtn'}>Solana</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Filter