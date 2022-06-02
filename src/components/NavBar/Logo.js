import logoTxt from "../../assets/image/navbar/logo-txt.png"
import logoImg from "../../assets/image/OV-Logo.png"
function Logo(props) {
    return(
        <div className="logo">
            {
                props.isMobile ?
                <img src={logoImg} className="" alt=""/>
                :    
                <img src={logoTxt} className="" alt=""/>
            }
        </div>
    )
}

export default Logo