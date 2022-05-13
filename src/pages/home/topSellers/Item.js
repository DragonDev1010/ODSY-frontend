import defaultImg from '../../../assets/image/noImgAlt.png'
import getImageData from '../../../actions/getImageData'

function Item (props) {
    return (
        <div className="topSeller">
            <div className="img verified">
                {
                    props.data.avatar.data.data !== null ?
                        <img src={getImageData(props.data.avatar.data.data)} className="avatar" alt=""/>
                    :
                        <img src={defaultImg} className="avatar" alt=""/>
                }
            </div>
            <div className="info">
                {
                    props.data.name === undefined || props.data.name === null ?
                    <span className="name">Undefined</span>
                    :
                    <span className="name">{props.data.name}</span>
                }
                {
                    props.data.volume === undefined || props.data.volume === null ?
                    <span className="balance">Undefined</span>
                    :
                    <span className="balance">{props.data.volume} BSC</span>
                }
            </div>
        </div>
    )
}

export default Item