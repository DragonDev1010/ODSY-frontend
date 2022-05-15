import { Link } from 'react-router-dom'
import defaultImg from '../../../assets/image/noImgAlt.png'
import getImageData from '../../../actions/getImageData'
function Collection(props) {
    return(
            <div className="collection">
                <div className="img verified">
                    <Link to={'/collection/' + props.data.id}>
                    {
                        props.data.logoImg.data.data !== null ?
                            <img src={getImageData(props.data.logoImg.data.data)} className="avatar" alt=""/>
                        :
                            <img src={defaultImg} className="avatar" alt=""/>
                    }
                    </Link>
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

export default Collection