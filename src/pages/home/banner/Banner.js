import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import getImageData from '../../../actions/getImageData'

function Banner() {
    const ids = [0,7,2,3,4,7]
    const width = window.innerWidth

    const [nfts, setNfts] = useState(null)
    
    const styles = {
        bannerCover: {display: 'flex', width: '100%', height: width/3},
        mobileBannerCover: {width: '100%', height: width/3},
        bannerCol: {width: 'calc(100%/3)', height: '100%', margin: '0 10px'},
        bannerHalfCol: {width: 'calc(100%/6)', height: '100%', margin: '0 10px'},
        bannerImg: {width: '100%', height: '100%', objectFit: 'cover'},
        bannerTopSmImg: {width: '100%', height: '50%', objectFit: 'cover', paddingBottom: '5px'},
        bannerBottomSmImg: {width: '100%', height: '50%', objectFit: 'cover', paddingTop: '5px'}
    }

    useEffect(() => {
        fetch(
            process.env.REACT_APP_API_BASE_URL + 'nfts',
            {
                method: 'GET'
            }
        )
            .then( res => res.json() )
            .then( data => {
                if(data.length > 0)
                    setNfts(data)
            })
    }, [])

    return (
        <section className="banner">
            {
                nfts !== null ?
                <>
                    <div className="desktop" style={{width: '100%'}}>
                        <div style={styles.bannerCover} >
                            <div style={styles.bannerCol}>
                                <Link to={'/assets/' + nfts[ids[0]].nft_id}><img src={getImageData(nfts[ids[0]].img.data.data)} style={styles.bannerImg}/></Link>
                            </div>
                            <div style={styles.bannerCol}>
                                <Link to={'/assets/' + nfts[ids[1]].nft_id}><img src={getImageData(nfts[ids[1]].img.data.data)} style={styles.bannerImg}/></Link>
                            </div>
                            <div style={styles.bannerHalfCol}>
                                <Link to={'/assets/' + nfts[ids[2]].nft_id}><img src={getImageData(nfts[ids[2]].img.data.data)} style={styles.bannerTopSmImg}/></Link>
                                <Link to={'/assets/' + nfts[ids[3]].nft_id}><img src={getImageData(nfts[ids[3]].img.data.data)} style={styles.bannerBottomSmImg}/></Link>
                            </div>
                            <div style={styles.bannerHalfCol}>
                                <Link to={'/assets/' + nfts[ids[4]].nft_id}><img src={getImageData(nfts[ids[4]].img.data.data)} style={styles.bannerTopSmImg}/></Link>
                                <Link to={'/assets/' + nfts[ids[5]].nft_id}><img src={getImageData(nfts[ids[5]].img.data.data)} style={styles.bannerBottomSmImg}/></Link>
                            </div>
                        </div>
                    </div>
                    <div className="mobile" style={{width: '100%'}}>
                        <div style = {styles.mobileBannerCover} className="mobile">
                            <Link to={'/assets/' + nfts[ids[0]].nft_id}><img src={getImageData(nfts[ids[0]].img.data.data)} style={styles.bannerImg}/></Link>
                        </div>
                    </div>
                </>
                :
                ""
            }
        </section>
    )
}

export default Banner