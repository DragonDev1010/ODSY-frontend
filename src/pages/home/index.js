import Banner from "./banner/Banner"
import TopCollections from "./topCollections/TopCollections"
import Upcoming from "./upcoming/Upcoming"
import GoldMember from "./goldMember/GoldMember"
import LiveAuction from "./liveAuction/LiveAuction"
import Explorer from "./explorer/Explorer"

function Home() {
    return (
        <div className="home">
            <Banner/>
            <TopCollections/>
            <Upcoming/>
            <GoldMember/>
            <LiveAuction/>
            <Explorer/>
        </div>
    )
}

export default Home