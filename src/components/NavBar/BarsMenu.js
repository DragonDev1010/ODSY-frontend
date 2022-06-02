import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa'
import { useState, useContext, useEffect } from "react";
import { WalletContext } from "../../context/walletContext";

function BarsMenu (props) {
    const [showCommunity, setShowCommunity] = useState(false)
    const [showActivity, setShowActivity] = useState(false)
    const [walAddr, setWalAddr] = useState(null)
    const walletContext = useContext(WalletContext)
    
    useEffect(() => {
        if(walletContext.wallet !== null && walletContext.wallet !== undefined) {
            let abbre = walletContext.wallet.substr(0, 6) + ' . . . ' + walletContext.wallet.substr(-4)
            setWalAddr(abbre)
        }
    }, [walletContext])
    return(
        <div className='barMenuCover'>
            <div className="barMenuClose">
                <button onClick={() => props.setClicked(false)}>
                    <FaIcons.FaTimes size={30} fill={'#FFBD0C'}/>
                </button>
            </div>
            <ul className="mobileRouterList">
                <li>
                    <Link to="/signin" className="signInCover">
                        <div>
                        {
                            walletContext.wallet !== null && walletContext.wallet !== undefined?
                            <button onClick={() => {props.setClicked(!props.clicked)}} className='mobileSideMenuBtn'>{walAddr}</button>
                            :
                            <button onClick={() => {props.setClicked(!props.clicked)}} className='mobileSideMenuBtn'>Sign In</button>
                        }
                        </div>
                    </Link>
                </li>
                <li>
                    <button onClick={() => {props.setClicked(!props.clicked)}} className='mobileSideMenuBtn'>
                        <Link to="/home" className="">Home</Link>
                    </button>
                </li>
                <li>
                    <button onClick={() => {props.setClicked(!props.clicked)}} className='mobileSideMenuBtn'>
                        <Link to="/exclusives" className="">V.I.P.</Link>
                    </button>
                </li>
                <li>
                    <button onClick={() => {setShowCommunity(!showCommunity); setShowActivity(false)}} className="mobileSideMenuBtn">
                        Community <span style={{margin: '0 10px'}}></span>
                        <FaIcons.FaChevronDown size={20} fill={'#FFBD0C'}/>
                    </button>
                    {
                        showCommunity ?
                        <ul className="subDropdown">
                            <li>
                                <button onClick={() => {props.setClicked(!props.clicked)}} className='mobileSideMenuBtn'>
                                    <Link to="">Twitter</Link>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => {props.setClicked(!props.clicked)}} className='mobileSideMenuBtn'>
                                    <Link to="">Telegram</Link>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => {props.setClicked(!props.clicked)}} className='mobileSideMenuBtn'>
                                    <Link to="">Instagram</Link>
                                </button>
                            </li>
                        </ul>
                        :
                        <></>
                    }
                </li>
                <li>
                <button onClick={() => {setShowActivity(!showActivity); setShowCommunity(false)}} className="mobileSideMenuBtn">
                    Activities <span style={{margin: '0 10px'}}></span>
                    <FaIcons.FaChevronDown size={20} fill={'#FFBD0C'}/>
                </button>
                    {
                        showActivity ?
                        <ul className="subDropdown">
                            <li>
                                <button onClick={() => {props.setClicked(!props.clicked)}} className='mobileSideMenuBtn'>
                                    <Link to="">Transactions</Link>
                                </button>
                            </li>
                            <li>                            
                                <button onClick={() => {props.setClicked(!props.clicked)}} className='mobileSideMenuBtn'>
                                    <Link to="">Recent Bids</Link>
                                </button>
                            </li>
                            <li>                            
                                <button onClick={() => {props.setClicked(!props.clicked)}} className='mobileSideMenuBtn'>
                                    <Link to="">Latest Listings</Link>
                                </button>
                            </li>
                        </ul>
                        :
                        <></>
                    }
                </li>
                <li>
                    <button onClick={() => {props.setClicked(!props.clicked)}} className="mobileSideMenuBtn">
                        <Link to="/explorer" className="">Explore</Link>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default BarsMenu