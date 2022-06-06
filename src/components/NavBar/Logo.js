import logoTxt from "../../assets/image/navbar/logo-txt.png"
import logoImg from "../../assets/image/OV-Logo.jpg"
function Logo() {
    return(
        <div className="logo">
            <img src={logoImg} className="logoImg" alt=""/>
            <img src={logoTxt} className="logoTxt" alt=""/>
        </div>
    )
}

export default Logo