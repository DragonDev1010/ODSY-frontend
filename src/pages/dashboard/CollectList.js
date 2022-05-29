import { useEffect, useState } from "react"
import getImageData from "../../actions/getImageData"
import * as FaIcons from 'react-icons/fa'

function CollectList () {
    const [collects, setCollects] = useState(null)
    
    const styles = {
        cover: {
            width: '100%',
            padding: '20px 10% 10px 10%'
        },
        listHead: {
            padding: '10px 0',
            fontWeight: 'bolder',
            fontSize: '20px',
            display: 'flex'
        }
    }
    const getCollects = () => {
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'collects',
            {method: 'GET'}
        )
            .then( res => res.json() )
            .then( res => {
                if(res.length > 0)
                    setCollects(res)
            })
    }
    const handleClick = (e) => {
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'collect/' + e.target.value,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({newAndUpcoming: !e.target.checked})
            }
        ).then(() => getCollects())
    }
    const abbreviate = (str) => {
        return str.slice(0, 6) + ' . . . . . ' + str.slice(-5)
    }

    useEffect(() => {
        getCollects()
    }, [])
    return(
        <div style={styles.cover} className='nftCover'>
            <div style={styles.listHead}>
                <div style={{width: '5%'}}><span>ID</span></div>
                <div style={{width: '15%'}}><span>Image</span></div>
                <div style={{width: '15%'}}><span>Title</span></div>
                <div style={{width: '15%'}}><span>Status</span></div>
                <div style={{width: '20%'}}><span>Creator</span></div>
            </div>
            <ul style={{paddingLeft: '0'}}>
            {
                collects &&
                collects.map(item => (
                    <li style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
                        <div style={{width: '5%'}}><span>{item.id}</span></div>
                        <div style={{width: '15%'}}><img src={getImageData(item.logoImg.data.data)} style={{width: '80px', height:'80px'}}></img></div>
                        <div style={{width: '15%'}}><span>{item.name}</span></div>
                        <div style={{width: '15%'}}><span>{item.verified ? <FaIcons.FaCheckCircle/> : "" }</span></div>
                        <div style={{width: '20%'}}><span>{abbreviate(item.creator)}</span></div>
                        <div>
                            <button 
                                value={item.id} 
                                checked={item.newAndUpcoming}
                                onClick={e => handleClick(e, 'value', 'checked')}
                                className={item.newAndUpcoming ? 'selectedBtn' : 'nonSelectedBtn'}
                            >
                                {item.newAndUpcoming ? 'Yes' : 'No'}
                            </button>
                        </div>
                    </li>
                ))
            }
            </ul>
            
        </div>
    )
}

export default CollectList