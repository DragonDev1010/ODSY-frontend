import { useState, useRef } from "react"
import * as FaIcons from "react-icons/fa"
import alterImg from "../../assets/image/navbar/logo.png"
import { WalletContext } from "../../context/walletContext"
import loadingGif from '../../assets/image/createPage/loading.gif'
import styles from './styles'
function Create() {
    const inputFile = useRef(null) 
    const [title, setTitle] = useState("")
    const [description, setDesc] = useState("")
    const [saleMethod, setSaleMethod] = useState(0)
    const [price, setPrice] = useState(0)
    const [royalty, setRoyalty] = useState(0)
    const [size, setSize] = useState(0)
    const [collection, setCollection] = useState(0)
    const [imgFile, setImgFile] = useState(null)
    const [msg, setMsg] = useState(null)
    const [loading, setLoading] = useState(false)

    const openFile = (e) => {
        e.preventDefault()
        inputFile.current.click();
    };
    const changeSaleMethod = (e) => {
        e.preventDefault()
        setSaleMethod(parseInt(e.target.value))
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        var data = new FormData()
        console.log("img file: ", imgFile)
        data.append('title', title)
        data.append('description', description)
        data.append('saleMethod', saleMethod)
        data.append('price', price)
        data.append('royalty', royalty)
        data.append('size', size)
        data.append('collection', collection)
        data.append('file', imgFile)
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
                        setMsg("Created successfully!")
                })
                .catch( err => {
                    setLoading(false)
                    // setMsg(err)
                })
        } catch (error) {
            setLoading(false)
            // setMsg(error)
        }
    }
    return(
        <div style={{height:'100%', position:'relative'}}>
            <div style={styles.createCover}>
                <div style={styles.preview}>
                    <p>Preview Item</p>
                    {
                        imgFile == null ?
                        <img src={alterImg} alt="preview image" style={styles.previewImg}></img>
                        :
                        <img src={URL.createObjectURL(imgFile)} alt="preview image" style={styles.previewImg}></img>
                    }
                </div>
                <div style={styles.formCover}>
                    <p>{msg}</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <p>Upload File</p>
                            <input type="file" ref={inputFile} accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg" style={{display:"none"}} onChange={e => setImgFile(e.target.files[0])}/>
                            <div style={{display: "flex", alignItems:"center", justifyContent:"space-between"}}>
                                <p style={{marginTop: "1rem"}}>PNG, JPG, GIF, WEBP or MP4. Max 2000 MB</p>
                                <button className="normal" onClick={openFile}>Upload File</button>
                            </div>
                        </div>
                        <div>
                            <p>Select Method</p>
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
                        <div>
                            <p>Price</p>
                            <input type="text" placeholder="Enter price for one item (ETH)" style={styles.inputField} onChange={e => setPrice(+(e.target.value))} value={price}></input>
                        </div>
                        <div>
                            <p>Title</p>
                            <input type="text" placeholder="Item Name" style={styles.inputField} onChange={e=>setTitle(e.target.value)} value={title}></input>
                        </div>
                        <div>
                            <p>Description</p>
                            <input type="textarea" placeholder="e.g. “This is very limited item”" style={styles.inputField} onChange={e=>setDesc(e.target.value)} value={description}></input>
                        </div>
                        <div style={styles.otherCover}>
                            <div style={styles.otherItemCover}>
                                <p>Royalty</p>
                                <input type="text" style={styles.inputField} onChange={e=>setRoyalty(+e.target.value)} value={royalty}></input>
                            </div>
                            <div style={styles.otherItemCover}>
                                <p>Size</p>
                                <input type="text" style={styles.inputField} onChange={e=>setSize(+e.target.value)} value={size}></input>
                            </div>
                            <div style={styles.otherItemCover}>
                                <p>Collection</p>
                                <select style={styles.inputField} onChange={e=>setCollection(+e.target.value)}>
                                    <option style={styles.option} value="0">Art</option>
                                    <option style={styles.option} value="1">Artifacts & Relics</option>
                                    <option style={styles.option} value="2">Gaming</option>
                                    <option style={styles.option} value="3">Metaverse</option>
                                    <option style={styles.option} value="4">Photography</option>
                                </select>
                            </div>
                        </div>
                        <button className="normal" type="submit">Create item</button>
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