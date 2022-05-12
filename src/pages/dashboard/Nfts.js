import { useState, useEffect } from "react";
import getImageData from "../../actions/getImageData"
function Nfts (props) {
    const [collectList, setCollectList] = useState(null)
    
    const styles = {
        cover: {
            width: '80%',
            padding: '20px 10% 10px 10%'
        },
        listHead: {
            padding: '10px 0',
            fontWeight: 'bolder',
            fontSize: '20px',
            display: 'flex'
        }
    }

    const parseStatus = (id) => {
        switch (id) {
            case 0: return 'Buy Now'; break;
            case 1: return 'On Auction'; break;
            case 2: return 'New'; break;
            case 3: return 'Has Offers'; break;
            default: return 'Undefined'; break;                
        }
    }
    
    const parseCurrency = (id) => {
        switch (id) {
            case 0: return 'ODSY'; break;
            case 1: return 'BNB'; break;
            case 2: return 'ETH'; break;
            default: return 'Undefined'; break;                
        }
    }
    
    const getCollectName = (id) => {
        if(collectList !== null) {
            return collectList[id].name
        } else {
            return 'Undefined'
        }
    }
    
    const getChainName = (id) => {
        switch (id) {
            case 0: return 'BSC'; break;
            case 1: return 'Ethereum'; break;
            case 2: return 'Polygon'; break;
            case 3: return 'Solana'; break;
            default: return 'Undefined'; break;
        }
    }
    
    const handleClick = (e) => {
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'nft/' + e.target.value,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({goldMember: !e.target.checked})
            }
        )
            .then(props.getNftData())
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
        <div style={styles.cover} className='nftCover'>
            <div style={styles.listHead}>
                <div style={{width: '5%'}}><span>ID</span></div>
                <div style={{width: '15%'}}><span>Image</span></div>
                <div style={{width: '16%'}}><span>Title</span></div>
                <div style={{width: '10%'}}><span>Status</span></div>
                <div style={{width: '7%'}}><span>Price</span></div>
                <div style={{width: '11%'}}><span>Currency</span></div>
                <div style={{width: '16%'}}><span>Collections</span></div>
                <div style={{width: '10%'}}><span>Chains</span></div>
            </div>
            <ul style={{paddingLeft: '0'}}>
            {
                props.data &&
                props.data.map(item => (
                    <li style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
                        <div style={{width: '5%'}}><span>{item.nft_id}</span></div>
                        <div style={{width: '15%'}}><img src={getImageData(item.img.data.data)} style={{width: '80px', height:'80px'}}></img></div>
                        <div style={{width: '16%'}}><span>{item.title}</span></div>
                        <div style={{width: '10%'}}><span>{parseStatus(item.saleMethod)}</span></div>
                        <div style={{width: '7%'}}><span>{item.price}</span></div>
                        <div style={{width: '11%'}}><span>{parseCurrency(item.curType)}</span></div>
                        <div style={{width: '16%'}}><span>{getCollectName(item.collect)}</span></div>
                        <div style={{width: '10%'}}><span>{getChainName(item.chainId)}</span></div>
                        <div>
                            <button 
                                value={item.nft_id} 
                                checked={item.goldMember}
                                onClick={e => handleClick(e, 'value', 'checked')}
                                className={item.goldMember ? 'selectedBtn' : 'nonSelectedBtn'}
                            >
                                {item.goldMember ? 'Yes' : 'No'}
                            </button>
                        </div>
                    </li>
                ))
            }
            </ul>
            
        </div>
    )
}

export default Nfts