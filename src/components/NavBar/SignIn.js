import { Link } from "react-router-dom";

function SignIn() {
    return (
        <div className="signIn">
            <button><a to="/">Create</a></button>
            <button><a to="/wallet-connect">Sign In</a></button>
        </div>
    )
}

export default SignIn