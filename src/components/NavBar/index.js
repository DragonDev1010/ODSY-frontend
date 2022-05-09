import { useContext, useEffect, useState } from 'react';
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
import CreateCollection from '../../pages/create/CreateCollection';
import Signup from '../../pages/user/SignUp';
import Collections from '../../pages/collection/Collections';
import Auctions from '../../pages/explorer/Auction';
import {MessageContext} from '../../context/messageContext'
import { WalletContext } from '../../context/walletContext';

function NavBar () {
    const messageContext = useContext(MessageContext)
    const walContext = useContext(WalletContext)
    
    useEffect(() => {
		// Listen to network or accounts change on metamask
		if(window.ethereum) {
			window.ethereum.on('chainChanged', () => {
				// window.location.reload();
			})
			window.ethereum.on('accountsChanged', async () => {
                try {
                    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                    walContext.setWallet(accounts[0])
                } catch (e) {
                    messageContext.setMessage('Metamask is disconnected.')
                    walContext.setWallet(null)
                }
			})
		}
	})

    useEffect(async () => {
		if(performance.navigation.type == 1) {
            try {
                const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                walContext.setWallet(accounts[0])
            } catch (e) {
                messageContext.setMessage('Metamask is disconnected.')
                walContext.setWallet(null)
            }
		}
	})
    return (
        <BrowserRouter>
            <header className="navBar">
                <Logo/>
                <Router/>
                <SignIn/>
            </header>
            <p>{messageContext.message}</p>
            <Routes>
                <Route exact path="/home" element={<Home/>}></Route>
                <Route exact path="/create" element={<Create/>}></Route>
                <Route exact path="/wallet-connect" element={<WalletConnect/>}></Route>
                <Route exact path="/sign-up" element={<User/>}></Route>
                <Route exact path='/explorer' element={<Explorer/>}></Route>
                <Route exact path='/signin' element={<WalletConn/>}></Route>
                <Route exact path="/assets/:tokenId" element={<NftDetail/>} />
                <Route exact path="/update/:tokenId" element={<NftUpdate/>} />
                <Route exact path='/collection/create' element={<CreateCollection/>}></Route>
                <Route exact path='/signup' element={<Signup/>}></Route>
                <Route exact path='/collections' element={<Collections/>}></Route>
                <Route exact path='/auctions' element={<Auctions/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default NavBar