import previewImage from "../../assets/image/navbar/logo.png"

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
    return(
        <div style={styles.createCover}>
            <div style={styles.preview}>
                <p>Preview Item</p>
                <img src={previewImage} alt="preview image" style={styles.previewImg}></img>
            </div>
            <div style={styles.formCover}>
                <form>
                    <div>
                        <p>Upload File</p>
                        <input type="file" accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg" style={{display:"none"}}/>
                        <div >
                            <p>PNG, JPG, GIF, WEBP or MP4. Max 2000 MB</p>
                            <button className="normal">Upload File</button>
                        </div>
                    </div>
                    <div>
                        <p>Select Method</p>
                        <div style={styles.methodsGroup}>
                            <button style={styles.methodsBtn}>Fixed Price</button>
                            <button style={styles.methodsBtn}>Time Auctions</button>
                            <button style={styles.methodsBtn}>Open For Bids</button>
                        </div>
                    </div>
                    <div>
                        <p>Price</p>
                        <input type="text" placeholder="Enter price for one item (ETH)" style={styles.inputField}></input>
                    </div>
                    <div>
                        <p>Title</p>
                        <input type="text" placeholder="Item Name" style={styles.inputField}></input>
                    </div>
                    <div>
                        <p>Description</p>
                        <input type="textarea" placeholder="e.g. “This is very limited item”" style={styles.inputField}></input>
                    </div>
                    <div style={styles.otherCover}>
                        <div style={styles.otherItemCover}>
                            <p>Royalty</p>
                            <input type="text" style={styles.inputField}></input>
                        </div>
                        <div style={styles.otherItemCover}>
                            <p>Size</p>
                            <input type="text" style={styles.inputField}></input>
                        </div>
                        <div style={styles.otherItemCover}>
                            <p>Collection</p>
                            <select style={styles.inputField}>
                                <option style={styles.option}>Art</option>
                                <option style={styles.option}>Artifacts & Relics</option>
                                <option style={styles.option}>Gaming</option>
                                <option style={styles.option}>Metaverse</option>
                                <option style={styles.option}>Photography</option>
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