import {useState, useEffect} from 'react'
import styles from './styles'

function CollectionList(props) {
    const [collections, setCollections] = useState(null)

    useEffect(() => {
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'collects',
            {method: 'GET'}
        )
            .then(res => res.json())
            .then(data => {
                if(data.length > 0)
                    setCollections(data)
            })
    }, [])
    return (
        <select style={styles.inputField} onChange={e=>props.setCollection(+e.target.value)}>
            {
                collections && collections.map((item, idx) => (<option style={styles.option} value={idx}>{item.name}</option>))
            }
        </select>
    )
}

export default CollectionList