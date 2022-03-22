import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Router() {
    return(
        <>
            <BrowserRouter>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/explorer">Explorer</Link></li>
                    <li><Link to="/activity">Activity</Link></li>
                    <li><Link to="/community">Community</Link></li>
                    <li><Link to="/pages">Pages</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <Routes>
                    <Route path="/holder" exact>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router