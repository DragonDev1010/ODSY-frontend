import Banner from "./banner/Banner"
import TopCollections from "./topCollections/TopCollections"
import Upcoming from "./upcoming/Upcoming"
import GoldMember from "./goldMember/GoldMember"
import LiveAuction from "./liveAuction/LiveAuction"

function Home() {
    return (
        <div className="home">
            <Banner/>
            <TopCollections/>
            <Upcoming/>
            <GoldMember/>
            <LiveAuction/>
        </div>
    )
}

export default Home