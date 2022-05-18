import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { WalletContext } from "../../context/walletContext";

function SignIn() {
    const [name, setName] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [walAddr, setWalAddr] = useState(null)

    const walletContext = useContext(WalletContext)
    const getUserInfo = () => {
        fetch( process.env.REACT_APP_API_BASE_URL + 'user/' +  walAddr)
            .then(res => res.json())
            .then( data => {
                if(data[0] !== undefined) {
                    setName(data[0].name)
                    setAvatar(data[0].avatar)
                }
            })
    }
    useEffect(() => {
        if(walletContext.wallet !== null) {
            getUserInfo()
            let abbre = walletContext.wallet.substr(0, 6) + ' . . . ' + walletContext.wallet.substr(-4)
            setWalAddr(abbre)
        }
    }, [walletContext])
    return (
        <div className="signIn">
            <Link to="/create"><button className='normal'>Create</button></Link>
            <Link to="/signin" className="signInCover">
                <div>
                {
                    walletContext.wallet !== null ?
                    <button className='normal'>{walAddr}</button>
                    :
                    <button className='normal'>Sign In</button>
                }
                    <div className="userProfileCover">
                        <p>profile</p>
                        <p>favorites</p>
                        <p>watchlist</p>
                        <p>my collections</p>
                        <p>setting</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default SignIn