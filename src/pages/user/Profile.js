import { useContext, useEffect, useState } from "react"
import {WalletContext} from '../../context/walletContext'
import Contents from "./Contents"

function Profile() {
    const [bgImg, setBgImg] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [name, setName] = useState(null)
    const walletContext = useContext(WalletContext)

    useEffect(() => {
        if(walletContext.wallet !== null) {
            fetch(
                process.env.REACT_APP_API_BASE_URL + 'user/' + walletContext.wallet,
                {method: 'GET'}
            )
                .then(res=>res.json())
                .then(res => {
                    if(res[0].name !== undefined)
                        setName(res[0].name)
                })
        }
    }, [walletContext])
    return (
        <div className="profileCover">
            <div className="userDetailCover">
                <div className="bgCover">
                    {
                        bgImg !== null ?
                        <img src={''} className='bgImg'></img>
                        :
                        <img src={''} className='bgImg'></img>
                    }
                </div>
                <div className="avatarCover">
                    {
                        avatar !== null ?
                        <img src={''} className='avatarImg'></img>
                        :
                        <img src={''} className='avatarImg'></img>
                    }
                    <div className="detailCover">
                        {name}
                    </div>
                    <Contents/>
                </div>
            </div>

        </div>
    )
}

export default Profile