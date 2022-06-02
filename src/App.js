import NavBar from "./components/NavBar";
import Footer from "./components/footer/Footer";
import { WalletContext, WalletContextProps } from "./context/walletContext";
import { MessageContext, MessageContextProps } from './context/messageContext'
import { useState } from "react";

function App() {
	const [menuBarClicked, setMenuBarClicked] = useState(false)
	return (
		<WalletContext.Provider value={WalletContextProps()}>
			<MessageContext.Provider value={MessageContextProps()}>
				<NavBar clicked={menuBarClicked} setClicked={setMenuBarClicked}/>
				<Footer clicked={menuBarClicked}/>
			</MessageContext.Provider>
		</WalletContext.Provider>
	);
}
  
export default App;
  