import { useEffect, useState } from "react"

function Filter(props) {
    const styles = {
        filterCover: {
        }
    }
    const [status, setStatus] = useState([])
    const [currency, setCurrency] = useState(null)
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [collects, setCollects] = useState([])
    const [collectList, setCollectList] = useState(null)
    const [chains, setChains] = useState([])
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
            .then(res => setCollectList(res))
    }, [])
    return (
        <div style={styles.filterCover}>
            <div style={styles.statusCover}>
                <button value = {0} onClick={e => handleStatus(e, 'value')}>Buy Now</button>
                <button value = {1} onClick={e => handleStatus(e, 'value')}>On Auction</button>
                <button value = {2} onClick={e => handleStatus(e, 'value')}>New</button>
                <button value = {3} onClick={e => handleStatus(e, 'value')}>Has Offers</button>
            </div>
            <div style={styles.priceCover}>
                <select onChange={e=>setCurrency(+e.target.value)}>
                    <option value={0}>ODSY</option>
                    <option value={1}>BNB</option>
                </select>
                <input type='number' onChange={e => setMinPrice(+e.target.value)}/>
                <input type='number' onChange={e => setMaxPrice(+e.target.value)}/>
                <button onClick={applyPriceRange}>apply</button>
            </div>
            <div style={styles.collectCover}>
                <ul>
                    {
                        collectList &&
                        collectList.map((item, idx) => <li value={idx} onClick={e=>handleCollect(e, 'value')}>{item.name}</li>)
                    }
                </ul>
            </div>
            <div style={styles.chainCover}>
                <button value={0} onClick={e=>handleChain(e, 'value')}>BSC</button>
                <button value={1} onClick={e=>handleChain(e, 'value')}>Ethereum</button>
                <button value={2} onClick={e=>handleChain(e, 'value')}>Polygon</button>
                <button value={3} onClick={e=>handleChain(e, 'value')}>Solana</button>
            </div>
        </div>
    )
}

export default Filter