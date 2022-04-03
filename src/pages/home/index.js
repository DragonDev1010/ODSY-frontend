import Banner from "./banner"
import TopCollections from "./topCollections/TopCollections"
import Upcoming from "./upcoming"

function Home() {
    return (
        <div className="home">
            <Banner/>
            <TopCollections/>
            <Upcoming/>
        </div>
    )
}

export default Home