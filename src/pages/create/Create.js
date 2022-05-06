import { useState, useRef, useContext } from "react"
import * as FaIcons from "react-icons/fa"
import alterImg from "../../assets/image/navbar/logo.png"
import { WalletContext } from "../../context/walletContext"
import { MessageContext } from "../../context/messageContext"
import loadingGif from '../../assets/image/createPage/loading.gif'
import styles from './styles'

import Web3 from "web3"
import { nftAddr } from "../../contractABI/address"
const nftABI = require('../../contractABI/nftABI.json')

function Create() {
    const messageContext = useContext(MessageContext)
    const walContext = useContext(WalletContext)
    const inputFile = useRef(null) 
    const [title, setTitle] = useState("")
    const [description, setDesc] = useState("")
    const [saleMethod, setSaleMethod] = useState(0)
    const [currency, setCurrency] = useState(0)
    const [price, setPrice] = useState(0)
    const [royalty, setRoyalty] = useState(0)
    const [size, setSize] = useState(0)
    const [collection, setCollection] = useState(0)
    const [imgFile, setImgFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [hash, setHash] = useState(null)

    const openFile = (e) => {
        e.preventDefault()
        inputFile.current.click();
    };
    const changeSaleMethod = (e) => {
        e.preventDefault()
        setSaleMethod(parseInt(e.target.value))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(walContext.wallet == null) {
            messageContext.setMessage('You have to connect Metamask.')
            return
        }

        if(imgFile == null) {
            messageContext.setMessage('You have to upload image file.')
            return
        }
        setLoading(true)
        let pinataData = new FormData();
        pinataData.append('file', imgFile)
        fetch(
            `https://api.pinata.cloud/pinning/pinFileToIPFS`,
            {
                method: 'POST',
                body: pinataData,
                headers: {
                    pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
			        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY
                }
            }
        )
            .then(res => res.json())
            .then(async (data) => {
                setHash(data.IpfsHash)
                let provider = window.ethereum
                if (typeof provider !== 'undefined') {
                    await provider.request({method: 'eth_requestAccounts'})
                    const web3 = new Web3(provider)
                    const nftContract = new web3.eth.Contract(nftABI, nftAddr)
                    try {
                        console.log(data.IpfsHash)
                        console.log(saleMethod)
    
                        let mintTx = await nftContract.methods.mint(data.IpfsHash, saleMethod, currency, price, royalty).send({from:walContext.wallet, gas: 3000000})
                        console.log('transaction: ', mintTx)
                        return mintTx.events.Transfer.returnValues.tokenId
                    } catch (e) {
                        console.log(e)
                    }
                }
            })
            .then( tokenId => {
                var data = new FormData()

                data.append('nft_id', tokenId)
                data.append('title', title)
                data.append('description', description)
                data.append('saleMethod', saleMethod)
                data.append('price', price)
                data.append('curType', currency)
                data.append('royalty', royalty)
                data.append('size', size)
                data.append('collect', collection)
                data.append('creatorAddr', walContext.wallet)
                data.append('ownerAddr', walContext.wallet)
                data.append('file', imgFile)
                data.append('ipfsHash', hash)

                try {
                    fetch(
                        // process.env.REACT_APP_API_BASE_URL,
                        "http://localhost:8000/nfts",
                        {
                            method: 'POST',
                            body: data
                        }
                    )
                        .then( res => {
                            if (res.status == 200)
                                return res.json()
                        })
                        .then(res => {
                                initializeForm()
                                setLoading(false)
                                messageContext.setMessage("Created successfully!")
                        })
                        .catch( err => {
                            setLoading(false)
                            messageContext.setMessage(err)
                        })
                } catch (error) {
                    setLoading(false)
                }
            })
    }
    const initializeForm = () => {
        setTitle("")
        setDesc("")
        setSaleMethod(0)
        setPrice(0)
        setRoyalty(0)
        setSize(0)
        setCollection(0)
        setImgFile(null)
    }

    return(
        <div style={{height:'100%', position:'relative'}} className="createNftCover">
            <div style={styles.createCover}>
                <div style={styles.preview}>
                    <p style={styles.title}>Preview Item</p>
                    {
                        imgFile == null ?
                        <img src={alterImg} alt="preview image" style={styles.previewImg}></img>
                        :
                        <img src={URL.createObjectURL(imgFile)} alt="preview image" style={styles.previewImg}></img>
                    }
                </div>
                <div style={styles.formCover}>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formInput}>
                            <p style={styles.title}>Upload File</p>
                            <input type="file" ref={inputFile} accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg" style={{display:"none"}} onChange={e => setImgFile(e.target.files[0])}/>
                            <div style={{display: "flex", alignItems:"center", justifyContent:"space-between"}}>
                                <p style={styles.greyTxt}>PNG, JPG, GIF, WEBP or MP4. Max 2000 MB</p>
                                <button className="normal" onClick={openFile}>Upload File</button>
                            </div>
                        </div>
                        <div style={styles.formInput}>
                            <p style={styles.title}>Select Method</p>
                            <div style={styles.methodsGroup}>
                                <button style={saleMethod === 0 ?styles.clickedBtn : styles.methodsBtn} onClick={changeSaleMethod} value={0}>
                                    <FaIcons.FaTag style={saleMethod == 0 ? {fill: "blue"} : {}}/> Fixed Price
                                </button>
                                <button style={saleMethod === 1 ?styles.clickedBtn : styles.methodsBtn} onClick={changeSaleMethod} value={1}>
                                    <FaIcons.FaRegClock style={saleMethod === 1 ? {fill: "blue"} : {}}/>Time Auctions
                                </button>
                                <button style={saleMethod === 2 ?styles.clickedBtn : styles.methodsBtn} onClick={changeSaleMethod} value={2}>
                                    <FaIcons.FaUserFriends style={saleMethod === 2 ? {fill: "blue"} : {}}/>Open For Bids
                                </button>
                            </div>
                        </div>
                        <div style={styles.formInput}>
                            <p style={styles.title}>Price</p>
                            <input type="number" placeholder="Enter price for one item (ETH)" style={styles.inputField} onChange={e => setPrice(+(e.target.value))} ></input>
                        </div>
                        <div style={styles.formInput}>
                            <p style={styles.title}>Currency</p>
                            <input type="number" placeholder="Currency" style={styles.inputField} onChange={e => setCurrency(+(e.target.value))} ></input>
                        </div>
                        <div style={styles.formInput}>
                            <p style={styles.title}>Title</p>
                            <input type="text" placeholder="Item Name" style={styles.inputField} onChange={e=>setTitle(e.target.value)} value={title}></input>
                        </div>
                        <div style={styles.formInput}>
                            <p style={styles.title}>Description</p>
                            <textarea rows={"10"} type="textarea" placeholder="e.g. “This is very limited item”" style={styles.inputField} onChange={e=>setDesc(e.target.value)} value={description}></textarea>
                        </div>
                        <div style={styles.otherCover}>
                            <div style={styles.otherItemCover}>
                                <p style={styles.title}>Royalty</p>
                                <input type="text" style={styles.inputField} onChange={e=>setRoyalty(+e.target.value)} placeholder="5%"></input>
                            </div>
                            <div style={styles.otherItemCover}>
                                <p style={styles.title}>Size</p>
                                <input type="text" style={styles.inputField} onChange={e=>setSize(+e.target.value)} placeholder="e.g. “size”"></input>
                            </div>
                            <div style={styles.otherItemCover}>
                                <p style={styles.title}>Collection</p>
                                <select style={styles.inputField} onChange={e=>setCollection(+e.target.value)}>
                                    <option style={styles.option} value="0">Art</option>
                                    <option style={styles.option} value="1">Artifacts & Relics</option>
                                    <option style={styles.option} value="2">Gaming</option>
                                    <option style={styles.option} value="3">Metaverse</option>
                                    <option style={styles.option} value="4">Photography</option>
                                </select>
                            </div>
                        </div>
                        <button className="normal" type="submit" style={styles.formInput}>Create item</button>
                    </form>
                </div>
            </div>
            {
                loading ? 
                    <div style={styles.loadingCover}>
                        <img src={loadingGif} style={styles.loadingGif}></img>
                    </div>
                :
                    ''
            }
        </div>
    )
}

export default Create