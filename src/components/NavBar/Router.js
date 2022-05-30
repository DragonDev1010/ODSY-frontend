import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa'

function Router() {
    return(
        <ul className="routerList">
            <li className="routerListItem">
                <Link to="/home" className="routerListItemLink">Home</Link>
            </li>
            <li className="routerListItem">
                <Link to="/exclusives" className="routerListItemLink">V.I.P.</Link>
            </li>
            <li className="routerListItem">
                <div className="routerCommunity">
                    <Link to="/community" className="routerListItemLink">
                        Community
                        <FaIcons.FaCaretDown/> 
                    </Link>
                    <div className="routerDropdownCover routerDropdownCommunity">
                        <Link to="">
                            <p className="routerDropdownItem">Twitter</p>
                        </Link>
                        <Link to="">
                            <p className="routerDropdownItem">Telegram</p>
                        </Link>
                        <Link to="">
                            <p className="routerDropdownItem">Instagram</p>
                        </Link>
                    </div>
                </div>
            </li>
            <li className="routerListItem">
                <div className="routerActivity">
                    <Link to="/activity" className="routerListItemLink">
                        Activity
                        <FaIcons.FaCaretDown/>   
                    </Link>
                    <div className="routerDropdownCover routerDropdownActivity">
                        <Link to="">
                            <p className="routerDropdownItem">Transactions</p>
                        </Link>
                        <Link to="">
                            <p className="routerDropdownItem">Recent Bids</p>
                        </Link>
                        <Link to="">
                            <p className="routerDropdownItem">Latest Listings</p>
                        </Link>
                    </div>
                </div>
            </li>
            <li className="routerListItem">
                <Link to="/explorer" className="routerListItemLink">Explore</Link>
            </li>
        </ul>
    )
}

export default Router