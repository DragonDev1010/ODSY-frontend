import {useState, useEffect} from 'react'
import getImageData from '../../actions/getImageData'

function Item (props) {
    const [nftImg, setNftImg] = useState(null)
    const [collectName, setCollectName] = useState(null)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if( props.nft.img !== null) {
            let temp = getImageData(props.nft.img.data.data)
            setNftImg(temp)
        }

        fetch(
            process.env.REACT_APP_API_BASE_URL + 'collect/' + props.nft.collect,
            {method: 'GET'}
        )
            .then(res => res.json())
            .then(res => {
                setCollectName(res[0].name)
            })
    }, [])
    return (
        <div className="nftItemCover">
            <img src={nftImg} className="nftItemImg"/>
            <div className='collectNameCover'>
                <p>{collectName}</p>
                <p>{price}</p>
            </div>
            <div className='titleCover'>
                <p>{props.nft.title}</p>
            </div>
        </div>
    )
}

export default Item