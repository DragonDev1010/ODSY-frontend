import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Logo from "./Logo"
import SignIn from "./SignIn"
import Router from "./Router"
import WalletConnect from "../../pages/walletConnect";
import User from "../../pages/user";
import Home from "../../pages/home";

function NavBar () {
    return (
        <BrowserRouter>
            <header className="navBar">
                <Logo/>
                <Router/>
                <SignIn/>
            </header>
            <Routes>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/wallet-connect" element={<WalletConnect/>} exact></Route>
                <Route path="/sign-up" element={<User/>} exact></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default NavBar