import img from "../../../assets/image/navbar/logo.png"
import * as FaIcons from "react-icons/fa"
function Card() {
    return(
        <div className="card">
            <div className="card-img">
                <img src={img} className="avatar" alt=""/>
                <FaIcons.FaCheckCircle/>
            </div>
            <div className="card-info">
                <span className="name">David</span>
                <span className="balance">100 ETH</span>
            </div>
        </div>
    )
}

export default Card