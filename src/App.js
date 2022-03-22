import NavBar from "./components/NavBar";
import { WalletContext, WalletContextProps } from "./context/walletContext";
function App() {

	return (
		<WalletContext.Provider value={WalletContextProps()}>
			<NavBar/>
		</WalletContext.Provider>
	);
}
  
export default App;
  