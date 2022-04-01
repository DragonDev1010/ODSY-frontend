import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa'

function Router() {
    return(
        <ul className="routerList">
            <li className="routerListItem">
                <Link to="/home" className="routerListItemLink">Home</Link>
            </li>
            <li className="routerListItem">
                <Link to="/vip" className="routerListItemLink">V.I.P.</Link>
            </li>
            <li className="routerListItem">
                <Link to="/community" className="routerListItemLink">
                    Community
                    <FaIcons.FaCaretDown/> 
                </Link>
            </li>
            <li className="routerListItem">
                <Link to="/activity" className="routerListItemLink">
                    Activity
                    <FaIcons.FaCaretDown/>   
                </Link>
            </li>
            <li className="routerListItem">
                <Link to="/explorer" className="routerListItemLink">Explorer</Link>
            </li>
        </ul>
    )
}

export default Router