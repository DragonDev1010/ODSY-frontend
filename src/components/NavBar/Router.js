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
                    <span className="routerListItemLink">
                        Community
                        <FaIcons.FaCaretDown/> 
                    </span>
                    <div className="routerDropdownCover routerDropdownCommunity">
                        <p className="routerDropdownItem" >
                            <a href="https://twitter.com/odyssey_venture" target='_blank'>Twitter</a>
                        </p>
                        <p className="routerDropdownItem">
                            <a href="https://t.me/odyssey_venture" target={'_blank'}>Telegram</a>
                        </p>
                        <p className="routerDropdownItem">
                            <a href="https://www.instagram.com/odysseyventure/" target={'_blank'}>Instagram</a>
                        </p>
                    </div>
                </div>
            </li>
            <li className="routerListItem">
                <div className="routerActivity">
                    <span className="routerListItemLink">
                        Activity
                        <FaIcons.FaCaretDown/>   
                    </span>
                    <div className="routerDropdownCover routerDropdownActivity">
                        <Link to="/transactions">
                            <p className="routerDropdownItem">Transactions</p>
                        </Link>
                        <Link to="/transactions">
                            <p className="routerDropdownItem">Recent Bids</p>
                        </Link>
                        <Link to="/transactions">
                            <p className="routerDropdownItem">Latest Listings</p>
                        </Link>
                    </div>
                </div>
            </li>
            <li className="routerListItem">
                <Link to="/explorer" className="routerListItemLink">Explorer</Link>
            </li>
        </ul>
    )
}

export default Router