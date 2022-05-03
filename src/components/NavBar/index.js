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
import NftUpdate from '../../pages/nftUpdate/NftUpdate';
import {MessageContext} from '../../context/messageContext'
import { useContext, useEffect, useState } from 'react';

function NavBar () {
    const [message, setMessage] = useState(null)
    const messageContext = useContext(MessageContext)

    useEffect(() => {
        setMessage(messageContext.message)
    }, [messageContext])
    
    return (
        <BrowserRouter>
            <header className="navBar">
                <Logo/>
                <Router/>
                <SignIn/>
            </header>
            <p>{message}</p>
            <Routes>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/create" element={<Create/>}></Route>
                <Route path="/wallet-connect" element={<WalletConnect/>} exact></Route>
                <Route path="/sign-up" element={<User/>} exact></Route>
                <Route path='/explorer' element={<Explorer/>} exact></Route>
                <Route path='/signin' element={<WalletConn/>} exact></Route>
                <Route exact path="/assets/:tokenId" element={<NftDetail/>} />
                <Route exact path="/update/:tokenId" element={<NftUpdate/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default NavBar