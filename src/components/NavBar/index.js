import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Logo from "./Logo"
import SignIn from "./SignIn"
import Router from "./Router"
import WalletConnect from "../../pages/walletConnect";
import User from "../../pages/user";
import Home from "../../pages/home";
import Create from "../../pages/create/Create"
import Explorer from '../../pages/explorer/Explorer';
import WalletConn from '../../pages/sign/WalletConn';
import NftDetail from '../../pages/nftDetail/NftDetail';

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
                <Route path="/create" element={<Create/>}></Route>
                <Route path="/wallet-connect" element={<WalletConnect/>} exact></Route>
                <Route path="/sign-up" element={<User/>} exact></Route>
                <Route path='/explorer' element={<Explorer/>} exact></Route>
                <Route path='/signin' element={<WalletConn/>} exact></Route>
                <Route exact path="/assets/:tokenId" element={<NftDetail/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default NavBar