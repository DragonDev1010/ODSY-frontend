import NavBar from "./components/NavBar";
import Footer from "./components/footer/Footer";
import { WalletContext, WalletContextProps } from "./context/walletContext";
function App() {

	return (
		<WalletContext.Provider value={WalletContextProps()}>
			<NavBar/>
			<Footer/>
		</WalletContext.Provider>
	);
}
  
export default App;
  