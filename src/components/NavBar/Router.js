import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WalletConnect from "../../pages/walletConnect";
import User from "../../pages/user";
function Router() {
    return(
        <>
            <BrowserRouter>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/explorer">Explorer</Link></li>
                    <li><Link to="/activity">Activity</Link></li>
                    <li><Link to="/community">Community</Link></li>
                    <li><Link to="/pages">Pages</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/sign-up">Sign Up</Link></li>
                </ul>
                <button><Link to="/wallet-connect">Wallet Connect</Link></button>
                <Routes>
                    <Route path="/wallet-connect" element={<WalletConnect/>} exact>
                    </Route>
                    <Route path="/sign-up" element={<User/>} exact>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router