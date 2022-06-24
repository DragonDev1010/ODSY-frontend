import { useEffect, useState } from "react"
import getImageData from "../../actions/getImageData"
import { Link } from 'react-router-dom'

function Item(props) {
    const [nftImg, setNftImg] = useState(null)
    const [title, setTitle] = useState(null)
    const [activityType, setActivityType] = useState(null)
    const [desc, setDesc] = useState(null)
    const [activerName, setActiverName] = useState(null)
    const [currency, setCurrency] = useState('BNB')
    const [created, setCreated] = useState(null)
    const parseDate = (t) => {
        let hh
        let date = new Date(t)
        let h = date.getHours()
        let min = date.getMinutes()
        if (h > 11) {
            hh = (h-12).toString() + ':' + min.toString() + ' PM'
        } else {
            hh = h.toString() + ':' + min.toString() + ' AM'
        }
        let d = date.getDate()
        let m = date.toLocaleString('default', { month: 'short' })
        let y = date.getFullYear()
        console.log('At ' + hh + ' on ' + d + 'th' + m + ', ' + y)
        setCreated('At ' + hh + ' on ' + d + 'th ' + m + ', ' + y)
    }
    useEffect(() => {
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'nft/' + props.data.nft_id
        )
            .then(res => res.json())
            .then(data => {
                if(data.length == 1) {
                    let nftImgTemp = getImageData(data[0].img.data.data)
                    setNftImg(nftImgTemp)
                    setTitle(data[0].title)
                    fetch(
                        process.env.REACT_APP_API_BASE_URL + 'user/' + props.data.creator
                    )
                        .then(res => res.json())
                        .then(userdata => {
                            if(userdata[0] == undefined) setActiverName('undefined')
                            else setActiverName(userdata[0].name)
                        })
                    if(data[0].curType == 1)
                        setCurrency('ODSY')
                    switch (props.data.activity_type) {
                        case 0: setActivityType('NFT minted by '); break;
                        case 1: setActivityType('NFT sold by '); setDesc(' for ' + props.data.price.toString() + ' ' + currency); break;
                        case 2: setActivityType('NFT bidded by '); break;
                        default: break;
                    }
                    parseDate(props.data.created)
                }
            })
    }, [])
    return(
        <div className="rowCover">
                <div className="nftImgCover">
                    <Link to={'/assets/' + props.data.nft_id}>
                        <img src={nftImg}/>
                    </Link>
                </div>
                <div className="infoCover">
                    <Link to={'/assets/' + props.data.nft_id}><p className="nftTitle">{title}</p></Link>
                    <p className="desc">
                        {activityType}
                        <Link to={''}>{activerName}</Link>
                        {desc}
                    </p>
                    <p className="created">{created}</p> {/* At 2:30 PM on 19th June, 2021 */}
                </div>
        </div>
    )
}

export default Item