import NavBar from "./components/NavBar";
import Footer from "./components/footer/Footer";
import { WalletContext, WalletContextProps } from "./context/walletContext";
import { useEffect } from "react";
function App() {
	// clear all local storage when browser is closed
	localStorage.removeItem('connectedWalletAddress');
	localStorage.removeItem('userName');
	useEffect(() => {
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
			<NavBar/>
			<Footer/>
		</WalletContext.Provider>
	);
}
  
export default App;
  