import NavBar from "./components/NavBar";
import { useState } from "react";

function App() {
	const [wallet, setWallet] = useState(null)

	return (
		<div className="App">
			<NavBar/>
		</div>
	);
}
  
export default App;
  