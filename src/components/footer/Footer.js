import * as FaIcons from "react-icons/fa"
import logo from "../../assets/image/navbar/logo.png"

function Footer() {
    const styles = {
        footerCover: {
            display: "flex",
            color: "white"
        },
        columnCover: {
            width: "20%"
        },
        socialIcons: {
            display: "flex",
            gap: "10px"
        },
        title: {
            fontSize: "30px"
        }
    }
    return(
        <footer style={styles.footerCover}>
            <div style={styles.columnCover}>
                <img src={logo} alt="sd" style={{height: "60px"}}/>
                <br/>
                <p>
                Join us on a venture exploring the secrets of the universe, while preserving the sanctity of historical items from ancient antiquity to the furthest edge of the universe.  
                </p>
                <div style={styles.socialIcons}>
                    <FaIcons.FaFacebookF/>
                    <FaIcons.FaTwitter/>
                    <FaIcons.FaGoogle/>

                </div>
            </div>
            <div style={styles.columnCover}>
                <div style={styles.title}>My Account</div>
                <div style={styles.links}>
                    <a href="">Authors</a><br/>
                    <a href="">Collections</a><br/>
                    <a href="">Author Profile</a><br/>
                    <a href="">Author Profile</a><br/>
                </div>
            </div>
            <div style={styles.columnCover}>
                <div style={styles.title}>Resources</div>
                <div style={styles.links}>
                    <a href="">Help & Support</a><br/>
                    <a href="">Live Auctions</a><br/>
                    <a href="">Item Details</a><br/>
                    <a href="">Activity</a><br/>
                </div>
            </div>
            <div style={styles.columnCover}>
                <div style={styles.title}>Company</div>
                <div style={styles.links}>
                    <a href="">About Us</a><br/>
                    <a href="">About Us</a><br/>
                </div>
            </div>
            <div style={styles.columnCover}>
                <div style={styles.title}>Subscribe To Our Newsletter</div>
            </div>
        </footer>
    )
}

export default Footer