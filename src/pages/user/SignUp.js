import { useContext, useEffect, useState } from "react"
import {WalletContext} from '../../context/walletContext'
import {MessageContext} from '../../context/messageContext'

function Signup() {
    const walContext = useContext(WalletContext)
    const msgContext = useContext(MessageContext)

    const [avatar, setAvatar] = useState(null)
    const [name, setName] = useState(null)
    const [wallet, setWallet] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(walContext.wallet === null) { msgContext.setMessage('Please connect wallet to create a new collection.');  return; }
        if(name === null || name === '') { msgContext.setMessage('Name is required.'); return; }
        if(avatar === null || avatar === '') { msgContext.setMessage('Avatar image is required.'); return; }
        let data = new FormData()

        data.append('name', name)
        data.append('avatar', avatar)
        data.append('wallet', walContext.wallet)

        fetch(
            process.env.REACT_APP_API_BASE_URL + 'users',
            {
                method: 'POST',
                body: data
            }
        )
            .then(() => {msgContext.setMessage('User signup is successful!');})
    }

    useEffect(() => {
        if(walContext.wallet !== null)
            setWallet(walContext.wallet)
    }, [walContext])
    return(
        <>
            <form>
                <input type='file' onChange={e => setAvatar(e.target.files[0])}></input>
                name: <input type="text" onChange={e => setName(e.target.value)}></input>
                wallet: <input value={wallet} disabled></input>
                <button onClick={handleSubmit}>Sing up</button>
            </form>  
        </>
    )
}

export default Signup