import { useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/footer/Footer";
import { WalletContext, WalletContextProps } from "./context/walletContext";
import { MessageContext, MessageContextProps } from './context/messageContext'

function App() {
	// clear all local storage when browser is closed
	localStorage.removeItem('connectedWalletAddress');
	localStorage.removeItem('userName');

	useEffect(() => {
		// Listen to network or accounts change on metamask
		if(window.ethereum) {
			window.ethereum.on('chainChanged', () => {
				window.location.reload();
			})

			window.ethereum.on('accountsChanged', () => {
				window.location.reload();
			})
		}
	})
	return (
		<WalletContext.Provider value={WalletContextProps()}>
			<MessageContext.Provider value={MessageContextProps()}>
				<NavBar/>
				<Footer/>
			</MessageContext.Provider>
		</WalletContext.Provider>
	);
}
  
export default App;
  