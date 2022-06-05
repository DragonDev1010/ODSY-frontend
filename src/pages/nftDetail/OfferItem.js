import {useEffect, useState} from 'react'
import getImageData from '../../actions/getImageData'
import noImgAlt from '../../assets/image/noImgAlt.png'

function OfferItem(props) {
    const [makerAvatar, setMakerAvatar] = useState(noImgAlt)
    const [makerName, setMakerName] = useState(null)
    const [created,setCreated] = useState(null)
    const [state, setState] = useState(null)
    const [curSymbol, setCurSymbol] = useState(0)

    const getMakerInfo = () => {
        fetch(process.env.REACT_APP_API_BASE_URL + 'user/' + props.offer.offerCreator)
            .then(res => res.json())
            .then(
                data => {
                    if(data.length > 0) {
                        setMakerName(data[0].name)
                        let makerAvatarTemp = getImageData(data[0].avatar.data.data)
                        setMakerAvatar(makerAvatarTemp)
                    }
                }
            )
    }

    const getTime = () => {
        let seconds = Math.floor((new Date() - new Date(props.offer.created)) / 1000)
        let interval = seconds / 86400
        if( interval < 1 ) {
            let hour = Math.floor(seconds / 3600)
            setCreated(hour.toString() + ' hour ago')
        } else {
            let temp = new Date(props.offer.created).toDateString({ weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
            setCreated(temp.toString())
        }
    }
    const styles = {
        itemCover: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 5px',
            borderBottom: '1px solid white'
        },
        leftCover: {
            display: 'flex',
            width: '70%',
            gap: '20px',
            justifyContent: 'space-between'
        },
        makerAvatarCover: {
            width: '10%'
        },
        nameCover: {
            width: '30%'
        },
        makerName: {
            fontWeight: 'bold',
            fontSize: '20px'
        },
        created: {
            color: 'grey'
        },
        offerState: {
            width: '30%',
            fontWeight: 'bold',
            fontSize: '20px'
        },
        offerPrice: {
            width: '30%',
            textAlign: 'right',
            fontWeight: 'bold',
            fontSize: '20px'
        }, 
        makerAvatar: {
            width: '55px',
            height: '55px',
            borderRadius: '10px'
        }
    }
    useEffect(() => {
        getMakerInfo()
        getTime()
        switch (props.offer.state) {
            case 0: setState('Open'); break;
            case 1: setState('Accepted'); break;
            case 2: setState('Declined'); break;
            default: break;
        }
        switch (props.offer.currency) {
            case 0: setCurSymbol('BNB'); break;
            case 1: setCurSymbol('ODSY'); break;
            default: break;
        }
    }, [props])
    return (
        <div style={styles.itemCover}>
            <div className='makerAvatarCover'>
                <img src={makerAvatar} style={styles.makerAvatar}/>
            </div>
            <div className='nameCover'>
                <div style={styles.makerName}>
                    {
                        makerName === null ?
                        <span style={{color: 'grey'}}>Undefined</span>
                        :
                        <span>{makerName}</span>
                    }
                </div>
                <div style={styles.created}>{created}</div>
            </div>
            <div className='offerState'>{state}</div>
            <div className='offerPrice'>
                <span>{props.offer.offerPrice} {curSymbol}</span>
            </div>
        </div>
    )
}

export default OfferItem