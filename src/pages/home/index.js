import Banner from "./banner/Banner"
import TopCollections from "./topCollections/TopCollections"
import Upcoming from "./upcoming/Upcoming"
import GoldMember from "./goldMember/GoldMember"

function Home() {
    return (
        <div className="home">
            <Banner/>
            <TopCollections/>
            <Upcoming/>
            <GoldMember/>
        </div>
    )
}

export default Home