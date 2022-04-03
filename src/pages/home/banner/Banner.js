import img from "../../../assets/image/navbar/logo.png"
function Banner() {
    const styles = {
        cover: {
            padding: "10px"
        },
        bannerImg: {
            width: "100%"
        }
    }
    return(
        <section className="banner">
            <div className="col-md-4">
                <div style={styles.cover}>
                    <img src={img} style={styles.bannerImg} alt=""/>
                </div>
            </div>
            <div className="col-md-4">
                <div style={styles.cover}>
                    <img src={img} style={styles.bannerImg} alt=""/>
                </div>
            </div>
            <div className="col-md-4">
                <div style={{display:"flex"}}>
                    <img src={img} style={styles.bannerImg} alt=""/>
                    <img src={img} style={styles.bannerImg} alt=""/>
                </div>
                <div style={{display:"flex"}}>
                    <img src={img} style={styles.bannerImg} alt=""/>
                    <img src={img} style={styles.bannerImg} alt=""/>
                </div>
            </div>
        </section>
    )
}

export default Banner