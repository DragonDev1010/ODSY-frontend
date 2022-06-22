import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Logo from "./Logo"
import SignIn from "./SignIn"
import Router from "./Router"
import BarsMenu from './BarsMenu'
import Home from "../../pages/home";
import Create from "../../pages/create/Create"
import Explorer from '../../pages/explorer/Explorer';
import WalletConn from '../../pages/sign/WalletConn';
import NftDetail from '../../pages/nftDetail/NftDetail';
import NftUpdate from '../../pages/nftUpdate/NftUpdate';
import CreateCollection from '../../pages/create/CreateCollection';
import Signup from '../../pages/user/SignUp';
import Collections from '../../pages/collection/Collections';
import CollectionDetail from '../../pages/collection/CollectionDetail'
import Auctions from '../../pages/explorer/Auction';
import Dashboard from '../../pages/dashboard/Dashboard';
import {MessageContext} from '../../context/messageContext'
import { WalletContext } from '../../context/walletContext';
import MetamaskConnect from '../../actions/metamaskConnect'
import Exclusives from '../../pages/exclusives/Exclusives';
import AboutUs from '../../pages/aboutUs/AboutUs';
import * as FaIcons from 'react-icons/fa'
import ApproveUsers from '../../pages/dashboard/ApproveUsers';
import Transactions from '../../pages/transactions/Transactions';
import RecentBids from '../../pages/recentBids/RecentBids';
import LatestListings from '../../pages/latestListings/LatestListings';
function NavBar (props) {
    const msgContext = useContext(MessageContext)
    const walContext = useContext(WalletContext)
    
    useEffect(() => {
		// Listen to network or accounts change on metamask
		if(window.ethereum) {
			window.ethereum.on('chainChanged', () => {
				// window.location.reload();
			})
			window.ethereum.on('accountsChanged', async () => {
                let connect = await MetamaskConnect()
                if(connect.address !== null) {
                    walContext.setWallet(connect.address) // set `WalletContext` state `wallet`
                } else {
                    msgContext.setMessage(connect.error)
                    walContext.setWallet(null)
                }
			})
		}
	})

    useEffect(async () => {
		if(performance.navigation.type == 1) {
            let connect = await MetamaskConnect()
            if(connect.address !== null) {
                walContext.setWallet(connect.address) // set `WalletContext` state `wallet`
            } else {
                msgContext.setMessage(connect.error)
                walContext.setWallet(null)
            }
		}
	})
    return (
        <BrowserRouter>
            <div className='desktop'>
                <header className="navBar">
                    <Logo/>
                    <Router/>
                    <SignIn/>
                </header>
            </div>
            <div className='mobile'>
                <header className="navBar">
                    <Logo/>
                    <button onClick={e => {props.setClicked(!props.clicked)}} className='normal'>
                        <FaIcons.FaBars size={30} />
                    </button>
                </header>
                {
                    props.clicked ?
                    <BarsMenu clicked={props.clicked} setClicked={props.setClicked}/>
                    :
                    <></>
                }
            </div>
            {
                props.clicked ?
                <></>
                :
                <>
                    <Routes>
                        <Route exact path="/" element={<Home/>}></Route>
                        <Route exact path="/create" element={<Create/>}></Route>
                        <Route exact path='/explorer' element={<Explorer/>}></Route>
                        <Route exact path='/exclusives' element={<Exclusives/>}></Route>
                        <Route exact path='/signin' element={<WalletConn/>}></Route>
                        <Route exact path="/assets/:tokenId" element={<NftDetail/>} />
                        <Route exact path="/update/:tokenId" element={<NftUpdate/>} />
                        <Route exact path='/collection/create' element={<CreateCollection/>}></Route>
                        <Route exact path='/signup' element={<Signup/>}></Route>
                        <Route exact path='/collections' element={<Collections/>}></Route>
                        <Route exact path='/collection/:collectId' element={<CollectionDetail/>}></Route>
                        <Route exact path='/auctions' element={<Auctions/>}></Route>
                        <Route exact path='/aboutus' element={<AboutUs/>}></Route>
                        <Route exact path='/dashboard' element={<Dashboard/>}></Route>
                        <Route exact path='/dashboard/approveUser' element={<ApproveUsers/>}></Route>
                        <Route exact path='transactions' element={<Transactions/>}></Route>
                        <Route exact path='recent-bids' element={<RecentBids/>}></Route>
                        <Route exact path='latest-listings' element={<LatestListings/>}></Route>
                        <Route path="*" element={<Navigate to="/" replace />}></Route>
                    </Routes>
                </>
            }
        </BrowserRouter>
    )
}

export default NavBar