import img from "../../../assets/image/navbar/logo.png"
function Collection(props) {
    return(
        <div className="collectionGroup">
            <div className="collection top">
                <div className="img verified">
                    <img src={img} className="avatar" alt=""/>
                </div>
                <div className="info">
                    <span className="name">{props.name}</span>
                    <span className="balance">{props.balance} BSC</span>
                </div>
            </div>

            <div className="collection bottom">
                <div className="img">
                    <img src={img} className="avatar" alt=""/>
                </div>
                <div className="info">
                    <span className="name">{props.name}</span>
                    <span className="balance">{props.balance} ETH</span>
                </div>
            </div>
        </div>
    )
}

export default Collection