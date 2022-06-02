import et_wallet from "../../../assets/image/landingPage/et_wallet.png"
import et_picture from "../../../assets/image/landingPage/et_picture.png"
import et_pricetags from "../../../assets/image/landingPage/et_pricetags.png"
import et_vector from "../../../assets/image/landingPage/et_vector.png"

function Feature() {
    const styles = {
        sectionCover: {
            padding: '160px 10% 20px'
        },
        featureCover: {
            display: "flex"
        },
        itemCover: {
            width: "25%",
            padding: "20px"
        },
        featureTitle: {
            margin: "20px 0",
            fontSize: "28px"
        },
        imgWallet: {
            padding: '14px 10px',
            backgroundColor: '#655607',
            borderRadius: '16px'
        },
        imgPicture: {
            padding: '14px 10px',
            backgroundColor: ' #00A725',
            borderRadius: '16px'
        },
        imgPricetags: {
            padding: '14px 10px',
            backgroundColor: '#FF0000',
            borderRadius: '16px'
        },
        imgVector: {
            padding: '14px 10px',
            background: 'linear-gradient(216.56deg, #E250E5 5.32%, #4B50E6 94.32%)',
            borderRadius: '16px'
        },
    }

    return(
        <section style={styles.sectionCover}>
            <div className="desktop">
                <h1>Purchasing & Marketing Your NFTs with odyssey venture is simple!</h1>
                <div style={styles.featureCover}>
                    <div style={styles.itemCover}>
                        <img src={et_wallet} style={styles.imgWallet}></img>
                        <br></br>
                        <p style={styles.featureTitle}>connect your wallet</p>
                        <p style={styles.info}>
                        Before you begin, you must connect your wallet. Click the SIGN IN button at the header of the site, this enables you to chose a wallet of your choice. You will be prompted to connect upon your agreement within your wallet. Once you accept, your credentials will show and you can now either buy, bid or sell nfts. 
                        </p>
                    </div>
                    <div style={styles.itemCover}>
                        <img src={et_picture} style={styles.imgPicture}></img>
                        <br></br>
                        <p style={styles.featureTitle}>Purchase Nfts</p>
                        <p style={styles.info}>
                        Its very simple to purchase any NFT with Odyssey Venture. Once youve completed step 1 all you have to do is find a NFT you like and click the buy or bid button. This allows your to buy the NFT at the listed price or make an offer to the seller which then has to be accepted by the seller. Once the transaction is made the nft will show up in your wallet after the transaction time has elapsed. PLEASE NOTE: You must have enough cryptocurrency in your wallet for the purchase and transaction cost in the NFTS listed blockchain, whether that be ETH, BSC, or SOL.
                        </p>
                    </div>
                    <div style={styles.itemCover}>
                        <img src={et_pricetags} style={styles.imgPricetags}></img>
                        <br></br>
                        <p style={styles.featureTitle}>Sell  your NFTs</p>
                        <p style={styles.info}>
                        In order to sell your NFTS you will have to click the SELL button at the top of the site. This will show you the nfts you hold that are associated with any collection listed in the OV Marketplace. Select your NFT to sell and you will be brought to the collection page where you can list the NFT for sale. 

                        </p>
                    </div>
                    <div style={styles.itemCover}>
                        <img src={et_vector} style={styles.imgVector}></img>
                        <br></br>
                        <p style={styles.featureTitle}> create a collection or 1/1</p>
                        <p style={styles.info}>
                        In order to create a nft collecion or 1/1 you need to click on the create button located at the top of the site. Your 1/1 NFTs or Collection will have to be approved for listing on the OV marketplace.
                        If you are approved, your NFTs will be listed and will be available for buying and selling.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Feature