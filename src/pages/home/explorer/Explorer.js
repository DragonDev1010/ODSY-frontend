import { useState, useEffect } from "react"
import viewMore from '../../../assets/image/landingPage/viewMore.png'
import Filter from "./Filter"
import Nfts from "./Nfts"

function Explorer() {
    const styles = {
        viewMoreCover: {
            textAlign: "center",
            marginTop: "30px",
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
        }
    }

    const [nfts, setNfts] = useState([])
    const [filter, setFilter] = useState({})
    const getNfts = (filter) => {
        try {
            let params = new URLSearchParams(filter)
            let fetchURL = process.env.REACT_APP_API_BASE_URL+'nfts?' + params

            fetch(fetchURL)
                .then(res => res.json())
                .then(res => {
                    let temp = []
                    if(res.length > 0)
                        while(temp.length < 8)
                            temp.push(res[temp.length])
                        setNfts([...temp])
                })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getNfts(filter)
    }, [filter])

    return(
        <section className='explorer'>
            <div className = "title">
				<h2>Explorer</h2>
                <div style={{width: '100%'}} className='desktop'>
    				<Filter setFilter={setFilter}/>
                </div>
			</div>
            <Nfts nfts={nfts}/>
            <div style={styles.viewMoreCover}>
                <span style={{color: '#FFBD0C'}}>View More</span>
                <br/>
                <img src={viewMore}/>
            </div>
        </section>
    )
}

export default Explorer