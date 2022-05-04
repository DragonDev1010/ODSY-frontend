import { useState, useContext } from "react"
import { WalletContext } from '../../context/walletContext'
import { MessageContext } from '../../context/messageContext'

function CreateCollection() {
    const walContext = useContext(WalletContext)
    const msgContext = useContext(MessageContext)

    const [logo, setLogo] = useState(null)
    const [name, setName] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = (e) => {
        if(walContext.wallet === null) {
            msgContext.setMessage('Please connect wallet to create a new collection.')
            return
        }
        e.preventDefault()
        let data = new FormData()

        data.append('name', name)
        data.append('logo', logo)
        data.append('creator', walContext.wallet)

        fetch(
            process.env.REACT_APP_API_BASE_URL + 'collects',
            {
                method: 'POST',
                body: data
            }
        )
    }

    return(
        <div>
            <h1>Create Collection</h1>
            <form>
                <input type="file" accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg" onChange={e=>setLogo(e.target.files[0])}/>
                <input type="text" onChange={e=>setName(e.target.value)}/>
                <button onClick={handleSubmit}>Create</button>
            </form>
        </div>
    )
}

export default CreateCollection