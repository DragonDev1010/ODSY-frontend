import { useState, useEffect, useRef } from "react"
import * as FaIcons from "react-icons/fa"
import alterImg from "../../assets/image/navbar/logo.png"
function Create() {
    const styles = {
        createCover: {
            display: "flex",
            padding: "20px 30px"
        },
        preview: {
            width: "30%"
        },
        previewImg: {
            background: "grey",
            width:"70%",
            borderRadius: "20px"
        },
        formCover: {
            width: "70%"
        },
        uploadBtnCover: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 50px",
            border: "2px grey solid",
            borderRadius: "19px"
        },
        methodsGroup: {
            display: "flex",
            justifyContent: "space-between"
        },
        methodsBtn: {
            width: "30%",
            padding: "10px",
            color: "white",
            background: "black",
            borderRadius: "20px",
            border: "none",
        },
        clickedBtn: {
            width: "30%",
            padding: "10px",
            color: "blue",
            borderRadius: "20px",
            border: "none",
        },
        inputField: {
            width: "100%",
            background: "none",
            borderRadius: "18px",
            height: "50px",
            fontSize: "22px",
        },
        otherCover: {
            display: "flex",
            justifyContent: "space-between"
        },
        otherItemCover: {
            width: "30%"
        },
        option: {
            background: "#14141F",
            fontSize: "22px",
        }
    }
    const inputFile = useRef(null) 
    const [imgFile, setImgFile] = useState(null)
    const [saleMethod, setSaleMethod] = useState(0)
    const [price, setPrice] = useState(0)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [royalty, setRoyalty] = useState(0)
    const [size, setSize] = useState(0)
    const [collection, setCollection] = useState(0)
    const openFile = (e) => {
        e.preventDefault()
        inputFile.current.click();
    };
    const changeSaleMethod = (e) => {
        e.preventDefault()
        setSaleMethod(parseInt(e.target.value))
    }
    const handleSubmit = (e) => {
        const formData = new FormData();
        console.log("imgFile: ", imgFile)
        formData.append('file', imgFile)
        e.preventDefault()
        fetch(
            `https://api.pinata.cloud/pinning/pinFileToIPFS`,
            {
                method: 'POST',
                body: formData,
                headers: {
                    pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                    pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY
                } 
            }
        )
        
    }
    return(
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
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>Upload File</p>
                        <input type="file" ref={inputFile} accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg" style={{display:"none"}} onChange={e=>setImgFile(e.target.files[0])}/>
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
                        <input type="textarea" placeholder="e.g. “This is very limited item”" style={styles.inputField} onChange={e=>setDesc(e.target.value)} value={desc}></input>
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
    )
}

export default Create