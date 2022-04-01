import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WalletConnect from "../../pages/walletConnect";
import User from "../../pages/user";
import * as FaIcons from 'react-icons/fa'

function Router() {
    return(
        <div className="router">
            <BrowserRouter>
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
                
                <Routes>
                    <Route path="/wallet-connect" element={<WalletConnect/>} exact>
                    </Route>
                    <Route path="/sign-up" element={<User/>} exact>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router