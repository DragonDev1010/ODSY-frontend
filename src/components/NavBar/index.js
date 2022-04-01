import Logo from "./Logo"
import Router from "./Router"
import SignIn from "./SignIn"

function NavBar () {
    return(
        <div className="navBar">
            <Logo/>
            <Router/>
            <SignIn/>
        </div>
    )
}

export default NavBar