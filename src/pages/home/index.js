import Banner from "./banner"
import TopCollections from "./topCollections/TopCollections"
function Home() {
    return (
        <div className="home">
            <Banner/>
            <TopCollections/>
        </div>
    )
}

export default Home