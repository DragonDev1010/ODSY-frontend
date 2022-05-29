import NavBar from "./components/NavBar";
import Footer from "./components/footer/Footer";
import { WalletContext, WalletContextProps } from "./context/walletContext";
import { MessageContext, MessageContextProps } from './context/messageContext'

function App() {
	return (
		<WalletContext.Provider value={WalletContextProps()}>
			<MessageContext.Provider value={MessageContextProps()}>
				<p>Hosting Branch</p>
				<NavBar/>
				<Footer/>
			</MessageContext.Provider>
		</WalletContext.Provider>
	);
}
  
export default App;
  